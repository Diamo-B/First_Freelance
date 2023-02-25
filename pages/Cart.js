import styles from '../styles/Cart.module.css'
import Image from 'next/image';
import cookie from 'cookie'; // for parsing cookies
import { useRouter } from 'next/router';
import { useState } from 'react';
import OrderForm from '../components/order/OrderForm';
import SuccessPanel from '../components/order/SuccessPanel';
import OrderFailPanel from '../components/order/FailPanel';
import {prisma} from '../prisma/dbInstance';

export async function getServerSideProps(context)
{
    const { req } = context;
    const cookies = req.headers.cookie;
    let parsedCookies = cookie.parse(cookies);
    let CartNumber = parsedCookies.cart;
    let data = await prisma.cart.findMany({
        where:{
            Id: Number(CartNumber)
        },
        include:{
            Items:{
                include:{
                    Product:{
                        include:{
                            Thumbnails: true
                        }
                    }
                }
            }
            
        }
    });

    data = data.map((item) => {
        return {
          ...item,
          CreatedAt: item.CreatedAt.toISOString(),
        };
    });

    return {
        props:{
            data
        }
    }
}

const Cart = ({data}) => {
    let [orderForm,setOrderForm] = useState(null);
    let [orderSuccess,setOrderSuccess] = useState(null);
    let [orderFailed,setOrderFailed] = useState(null);

    const router = useRouter();
    let items = data[0].Items;
    
    let trimTitle = (str) => {
        if(str.length > 30)
        {
            str = str.substring(0,30);
            return str+'...';
        }
        else
        return str;
    }

    let deleteItem = async (itemId) => {
        fetch('/api/items/removeCartItem',{
            method: 'DELETE',
            headers:{
            'Content-type': 'application/json',
            },
            body: JSON.stringify({
                Id: itemId
            }),
        }).then(()=>{
            router.reload();
        })
    }

    let CalculateTotalPrice = () => {
        let total=0;
        items.map(item => {
            if (item.Product.DiscountRate)
                total += item.Quantity*(item.Product.Price-(item.Product.Price*item.Product.DiscountRate/100));
            else
                total += item.Quantity*item.Product.Price;
        });
        return total.toFixed(2);
    }

    let commanderDirectement = (values) => {
        let cartId = data[0].Id;
        let products_Ids_Quantity = [];
        data[0].Items.map((item) => {
            products_Ids_Quantity.push({prodId : item.Product.Id, prodQuantity: item.Quantity})
        });        
        let ClientFname = values.FirstName;
        let ClientLname = values.LastName;
        let phoneNumber = values.PhoneNum === "" ? null : values.PhoneNum;
        let wtspNumber = values.WtspNum === "" ? null : values.WtspNum;
        
        fetch("/api/orders/create",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                fname       : ClientFname,
                lname       : ClientLname,
                phone       : phoneNumber,
                wtspPhone   : wtspNumber,
                productIds    : products_Ids_Quantity
            })
        })
        .then(async (data) => {
            fetch("/api/items/RemoveAllCartItems",{
                method:"DELETE",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    CartId: cartId
                })
            })
            .then(()=>{
                setOrderForm(false);
                setOrderSuccess(true);
            })
            .catch((err) => {
                setOrderForm(false);
                setOrderFailed(true);
            })
        })
        .catch((err) => {
            setOrderForm(false);
            setOrderFailed(true);
        }) 
    }

    let total;
    let text = "Cart Id: "+data[0].Id;
    

    return ( 
        <div className={styles.container}>
            { 
              items.map( item => ( 
                    <div className={styles.item} key={item.Id}> 
                        <Image className={styles.img} src={item.Product.Thumbnails[0].Path} alt="product" width={100} height={100}/>
                        <div className={styles.details}>
                            <div className={styles.top}>
                                <h2>{trimTitle(item.Product.Title)}</h2>
                                <Image onClick={()=>{deleteItem(item.Id)}} src="/removeFromCart.svg" alt="Remove product from cart" width={16} height={18}/>
                            </div>
                            <div className={styles.bottom}>
                                <p className={styles.Unit}>{
                                    item.Product.DiscountRate?(item.Product.Price-(item.Product.Price*item.Product.DiscountRate/100)).toFixed(2):item.Product.Price.toFixed(2)
                                } DH par unité X <span className={styles.Qte}>{item.Quantity} Piéces</span></p>
                                <p className={styles.SubTotal}>
                                Sous-Total = 
                                <span> {
                                    item.Product.DiscountRate?(item.Quantity*(item.Product.Price-(item.Product.Price*item.Product.DiscountRate/100))).toFixed(2):(item.Quantity*item.Product.Price).toFixed(2)
                                } DH</span></p>
                            </div>
                        </div>
                    </div>
                ))
            } 
            <div className={styles.totalXsubmit}>
                <p className={styles.Total}>
                    Total  =  
                    <span className={styles.amount}> {total = CalculateTotalPrice()} DH</span>
                </p>
                <div className={styles.instructions}>
                    N.B: Veuillez appuyez sur le boutton ci-dessous et envoyer le message que vous allez trouver inséré dans votre chat box Whatsapp. <br/> <span>Cart Id: X</span> Merci pour votre confiance &#128522;
                </div>
                
                { total==0?
                    <>
                        <button disabled className={styles.buttonwtsp}>
                            <Image src="/wtspWhite.svg" alt="whatsapp logo" width={35} height={35}/>
                            Commander par whatsapp
                        </button>
                        <span className={styles.or}>Ou</span>
                        <button disabled className={styles.commanderDirect}>Commander directement Ici</button>
                    </>   
                :
                    <>
                    <a href={" https://wa.me/212618272611?text="+encodeURIComponent(text)}>
                        <button className={styles.buttonwtsp}>
                            <Image src="/wtspWhite.svg" alt="whatsapp logo" width={35} height={35}/>
                            Commander par whatsapp
                        </button>         
                    </a>
                    <span className={styles.or}>Ou</span>
                    <button className={styles.commanderDirect} onClick={()=>setOrderForm(true)}>Commander directement Ici</button>
                    </>
                }
            </div>
            {
                orderForm &&
                (
                    <OrderForm submitAction={commanderDirectement} setOrderForm={setOrderForm}/>
                )
                
            }
            {
                orderSuccess &&
                (
                    // TODO: create a success order panel
                    <SuccessPanel setOrderSuccess={setOrderSuccess}/>
                )
            }
            {
                orderFailed &&
                (
                    // TODO: create a success order panel
                    <OrderFailPanel setOrderFailed={setOrderFailed}/>
                )
            }   
        </div>

    );
}
 
export default Cart;

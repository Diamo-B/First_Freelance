import styles from '../styles/Cart.module.css'
import Image from 'next/image';
import Cookies from 'js-cookie';
import useSWR from 'swr';
import { useRouter } from 'next/router';



const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Cart = () => {
    const router = useRouter();
    const { data, error } = useSWR('/api/getCart/'+Cookies.get('cart'), fetcher);
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
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
        fetch('/api/removeCartItem',{
            method: 'DELETE',
            headers:{
            'Content-type': 'application/json',
            },
            body: JSON.stringify({
                Id: itemId
            }),
        });
        router.reload();
    }

    let CalculateTotalPrice = () => {
        let total=0;
        items.map(item => {
            if (item.Product.DiscountRate)
                total += item.Quantity*(item.Product.Price-(item.Product.Price*item.Product.DiscountRate/100));
            else
                total += item.Quantity*item.Product.Price;
        });
        return total;
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
                                <Image onClick={()=>deleteItem(item.Id)} src="/removeFromCart.svg" alt="Remove product from cart" width={16} height={18}/>
                            </div>
                            <div className={styles.bottom}>
                                <p className={styles.Unit}>{
                                    item.Product.DiscountRate?item.Product.Price-(item.Product.Price*item.Product.DiscountRate/100):item.Product.Price
                                } DH par unité X <span className={styles.Qte}>{item.Quantity} Piéces</span></p>
                                <p className={styles.SubTotal}>
                                Sous-Total = 
                                <span> {
                                    item.Product.DiscountRate?item.Quantity*(item.Product.Price-(item.Product.Price*item.Product.DiscountRate/100)):item.Quantity*item.Product.Price
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
                <a
                    href={" https://wa.me/212618272611?text="+encodeURIComponent(text)}
                >
                    { total==0?
                        <button disabled>
                            <Image src="/wtspWhite.svg" alt="whatsapp logo" width={35} height={35}/>
                            Commander par whatsapp
                        </button>    
                    :
                        <button>
                            <Image src="/wtspWhite.svg" alt="whatsapp logo" width={35} height={35}/>
                            Commander par whatsapp
                        </button> 
                            
                        }
                </a>
            </div>   
        </div>

    );
}
 
export default Cart;

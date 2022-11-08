import styles from '../../styles/productDetails.module.css';
import DetailsSwiper from '../../components/detailsSwiper/Swiper';
import QuantityChoice from '../../components/QuantityChooser';
import Cookies from 'js-cookie';
import QuantityNullPanel from '../../components/QuantityNullPanel';
import CartXProductPresence from '../../components/ProductPresentInCartPanel'

//Router
import { useRouter } from 'next/router';

//prisma
import {PrismaClient} from '@prisma/client';
import { useState } from 'react';


let prisma = new PrismaClient();

export async function getServerSideProps(context) {
    const prodid = Number(context.query.productId);

    const product = await prisma.product.findFirst(
        {
            where:{
                Id: prodid
            },
            include: {
                Category: true,Thumbnails: true
            }
        }
    );

    return {
        props:{
            data: product
        }
    }
}

const ProductDetails = ({data}) => {

    let router = useRouter();
    let [ProductPresentInCart, setProductPresentInCart] = useState(false);

    const checkProductPresenceInCart = async() => {
        const response = await fetch('/api/getCart/'+Number(Cookies.get('cart')),{
            method: 'GET',
            headers:{
                'Content-type': 'application/json',
            },
        });

        return await response.json();
    }

    const saveToDatabase = async (prodId,Qte) => {
    
        const res = await fetch('/api/addItem', {
            method: 'POST',
            headers:{
            'Content-type': 'application/json',
            },
            body: JSON.stringify({
            prodId,
            Qte,
            cartId: parseInt(Cookies.get('cart'))
            }),
        });
        router.push('/Cart');
    }
    
    
    let [Quantity, setQuantity] = useState(0);
    
    
    let RemoveQte = () => {
        if (Quantity > 0) {
            setQuantity(Quantity-1);
        }
    }
    
    
    let AddQte = () => {
        
        if (Quantity >= 0 && Quantity < totalStock) {
            setQuantity(Quantity+1);
        }
    }
    
    let calculateDiscount = () =>{
        return data.DiscountRate?data.Price-(data.Price*data.DiscountRate/100):null;
    }
    let totalStock = data.Stock;
    let Discounted = calculateDiscount();

    let [CanAddCart, setCanAddCart] = useState(true);
    return ( 
        <div className="body body-relative">    
            <DetailsSwiper images={data.Thumbnails} key={data.Id}/>
            <div className={styles.Details}>
                <h1>{data.Title}</h1>
                <p className={styles.category}>Category: {data.Category.Title}  |  <span onClick={()=>router.push('/Categories/'+data.Category.Title)}>Produits Similaires &gt;</span></p>
                {data.BrandName && <p className={styles.marque}>Marque: {data.BrandName}</p>}
            </div>
            <div className={styles.price}>
                { data.DiscountRate?
                    <>
                        <p className={styles.actual}>{Discounted} DH</p>
                        <p className={styles.oldPrice}>{data.Price} DH</p>
                        <div className={styles.reduction}>{data.DiscountRate}%</div>
                    </>
                    :
                    <p className={styles.actual}>{data.Price} DH</p>
                }
            </div>
            <QuantityChoice Quantity={Quantity} totalStock={totalStock} RemoveQte={RemoveQte} AddQte={AddQte}/>
            <div className={styles.Disponibility}>
                {
                    data.Stock>0? <p className={styles.in}>En Stock</p> : <p className={styles.out}>Rupture de Stock</p>
                }
            </div>
            <div className= {styles.Commander} style={(!CanAddCart || ProductPresentInCart)?{marginBottom: 0+'em'}:null}>
                <div className={styles.Tel}>
                    <a href="tel:+212607232880">
                        <img src="/tel.svg" alt="tel"/>
                    </a>
                </div>
                <p>Ou</p>
                <div className={styles.Panier}>
                    <p
                    onClick=
                    {
                        async ()=>{
                            if(Quantity>0){
                                let found = 0;
                                let check = await checkProductPresenceInCart(); 
                                console.log(check)
                                check[0].Items.map(prod => {
                                    if(prod.ProductId == data.Id)
                                    {
                                        setProductPresentInCart(true);
                                        found = 1;
                                    }
                                });
                                if (found == 0)
                                {
                                    await saveToDatabase (data.Id,Quantity);
                                }
                            }
                            else
                            {
                                setCanAddCart(false);
                            }
                        }
                    }
                    >Ajouter au panier</p>
                </div>
            </div>
            {!CanAddCart && <QuantityNullPanel  Quantity={Quantity} totalStock={totalStock} RemoveQte={RemoveQte} AddQte={AddQte} CartisNull={true} setCanAddCart={setCanAddCart} saveToDatabase={saveToDatabase} ProductPresentInCart={ProductPresentInCart} setProductPresentInCart={setProductPresentInCart}
            checkProductPresenceInCart={checkProductPresenceInCart} Id={data.Id}/>}

            {ProductPresentInCart && <CartXProductPresence setProductPresentInCart={setProductPresentInCart} setCanAddCart={setCanAddCart}/>}
        </div>
    );
}
 
export default ProductDetails;
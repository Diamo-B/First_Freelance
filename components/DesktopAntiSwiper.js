import styles from '../styles/SwiperSlide.module.css';
import { useRouter } from 'next/router';


const DesktopNoSwiper = ({products}) => {
    const router = useRouter();
    let trimTitle = (str) => {
        if(str.length > 28)
        {
            str = str.substring(0,28);
            return str+'...';
        }
        else
        return str;
    }
    
    let calculateDiscount = (data) =>{
        return data.DiscountRate?(data.Price-(data.Price*data.DiscountRate/100)).toFixed(2):null;
    }
    return ( 
        <div className={styles.grid}>
            {        
            products.map(product => {
                return(
                    <div className={styles.container} onClick={()=>{
                        router.push("/productDetails/"+encodeURIComponent(product.Id))
                    }} key={product.Id}
                    >
                        <div className={styles.product}>
                            <img className={styles.img} src={product.Thumbnails[0].Path} alt="product"/>
                            {product.DiscountRate?
                                <>
                                    <div className={styles.product_details}>
                                        <p>{product.Category.Title}</p>
                                        <div>{product.DiscountRate}%</div>
                                    </div>
                                    <h1 className={styles.productName}>{trimTitle(product.Title)}</h1>
                                    <div className={styles.prices}>
                                        <p className={styles.actual}>{calculateDiscount(product)} DH</p>
                                        <p className={styles.old}>{product.Price.toFixed(2)} DH</p>
                                    </div>
                                </>
                                :
                                <>
                                    <div className={styles.product_details}>
                                        <p className={styles.center}>{product.Category.Title}</p>
                                    </div>
                                    <h1 className={styles.productName}>{trimTitle(product.Title)}</h1>
                                    <p className={styles.Onlyprice}>{product.Price.toFixed(2)} DH</p>
                                </>
                            }
                        </div>
                    </div>
                )
            })
            }
        </div>
    );
}
 
export default DesktopNoSwiper;
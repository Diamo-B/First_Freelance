import styles from '../styles/SwiperSlide.module.css'

const MySwiperSlide = ({product}) => {
    let trimTitle = (str) => {
        if(str.length > 28)
        {
            str = str.substring(0,28);
            return str+'...';
        }
        else
        return str;
    }
    
    return ( 
        <div className={styles.product}>
        <img className={styles.img} src={product.image} alt="product" />
        
        <div className={styles.product_details}>
            <p>{product.category}</p>
            <div>20%</div>
        </div>
        <h1 className={styles.productName}>{trimTitle(product.title)}</h1>
        
        <div className={styles.prices}>
            <p className={styles.actual}>{product.price} DH</p>
            <p className={styles.old}>200 DH</p>
        </div>
        </div>
    );
}
 
export default MySwiperSlide;
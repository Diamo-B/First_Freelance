import styles from '../../styles/Category.module.css'
import Link from 'next/link';
import Image from 'next/image';
import useBetterMediaQuery from '/components/useBetterMediaQuery';

const ShowCase = ({products}) => {
    const isMobile = useBetterMediaQuery('(max-width: 500px)');

    let calculateDiscount = (data) =>{
      return data.DiscountRate?(data.Price-(data.Price*data.DiscountRate/100)).toFixed(2):null;
    }
  
  
    return(
    <>
      {
        !isMobile?
          <div className={styles.gridShowcase}>
            { 
              products.map((product)=>(
                <Link key={product.Id} href={`/productDetails/${encodeURIComponent(product.Id)}`}>
                  <div className={styles.card}>
                    <img className={styles.showcase} src={product.Thumbnails[0].Path} alt="" />
                    <div className={styles.details}>
                      <p className={styles.title}>{(product.Title.length > 10)?`${product.Title.substring(0,15)}...`:product.Title}</p>
                      {
                        product.DiscountRate?
                        <div className={styles.discountHolder}>
                          <p className={styles.originalPrice}>{product.Price} DH</p>
                          <p className={styles.Discount}>-{product.DiscountRate}%</p>
                        </div>
                        :
                        <div className={styles.gap}>
                        </div>
                      }
                      <p className={styles.price}>{product.DiscountRate? calculateDiscount(product):product.Price.toFixed(2)} DH</p>
                    </div>
                  </div>
                </Link>
              )) 
            }
          </div>
        :
        <div>
          { 
            <div className={styles.mobileGrid}>
              {
                products.map((product)=>(
                    <Link className={styles.mobileCard} key={product.Id} href={`/productDetails/${encodeURIComponent(product.Id)}`}>
                      <div>
                        <Image className={styles.mobileImages} src={product.Thumbnails[0].Path} alt='product image' width={143} height={144}/>
                        <div className={styles.mobileDetails}>
                          <p className={styles.title}>{(product.Title.length > 10)?`${product.Title.substring(0,15)}...`:product.Title}</p>
                          <p className={styles.price}>{product.DiscountRate? calculateDiscount(product):product.Price.toFixed(2)} DH</p>
                        </div>
                      </div>
                    </Link>
                ))
              }
            </div>
          } 
        </div> 
      }
    </>
    );
};
export default ShowCase;
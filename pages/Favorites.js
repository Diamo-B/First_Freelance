import styles from '../styles/Category.module.css'
import Link from 'next/link';
import { prisma } from '/prisma/dbInstance.ts';
import Image from 'next/image';

export async function getServerSideProps(){
    let products = await prisma.product.findMany({
        where:{
            Favorite: true
        },
        include:{
            Thumbnails: true
        }
    });
    
    return {
        props: {
          products,
        },
      }
}

const Favorites = ({products}) => {
    let calculateDiscount = (data) =>{
        return data.DiscountRate?(data.Price-(data.Price*data.DiscountRate/100)).toFixed(2):null;
    }
    return(
        <div className='body'>
            <div className={styles.products}>
            { products.map((product)=>(
                <div  key={product.Id}>
                    <Link href={`/productDetails/${encodeURIComponent(product.Id)}`}>
                    <div className={styles.product}>
                        <Image className={styles.productImg} src={product.Thumbnails[0].Path} alt='product image' width={143} height={144}/>
                        <p className={styles.title}>{(product.Title.length > 10)?`${product.Title.substring(0,15)}...`:product.Title}</p>
                        <p className={styles.price}>{product.DiscountRate? calculateDiscount(product):product.Price.toFixed(2)} DH</p>
                    </div>
                    </Link>
                </div>
                ))
            } 
            </div>
        </div>
    );
}
 
export default Favorites;
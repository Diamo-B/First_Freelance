import styles from '../../styles/Category.module.css'
import Link from 'next/link';

//prisma
import {PrismaClient} from '@prisma/client';
let prisma = new PrismaClient();

export async function getStaticPaths(){
  const categories = ["Electroniques","Cosmétiques","Cuisine","Divers","Favoris"];
  let paths  = categories.map((categoryName)=>{
    return{
      params:{
        category: categoryName
      }
    }
  });
  return{
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}){
  let categoryName = params.category;

  const products = await prisma.product.findMany({
    where:{
      Category:{
        Title:{
          contains: categoryName
        }
      }
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

const Category = ({products}) => {
  let calculateDiscount = (data) =>{
    return data.DiscountRate?data.Price-(data.Price*data.DiscountRate/100):null;
}
  return(
    <div className='body'>
      <div className={styles.products}>
        { products.map((product)=>(
            <div  key={product.Id}>
              <Link href={`/productDetails/${encodeURIComponent(product.Id)}`}>
                <div className={styles.product}>
                  <img className={styles.productImg} src={product.Thumbnails[0].Path} alt='product image' width={143} height={144}/>
                  <p className={styles.title}>{(product.Title.length > 10)?`${product.Title.substring(0,15)}...`:product.Title}</p>
                  <p className={styles.price}>{product.DiscountRate? calculateDiscount(product):product.Price} DH</p>
                </div>
              </Link>
            </div>
          ))
        } 
      </div>
    </div>
  );
}
 
export default Category; 


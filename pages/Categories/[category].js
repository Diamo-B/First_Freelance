import styles from '../../styles/Category.module.css'

export async function getServerSideProps(context) {
  let category =context.params.category;
    const res = await fetch('https://fakestoreapi.com/products/category/'+category.toString())
    const products = await res.json()
  
    return {
      props: {
        products,
      },
    }
}

const Category = ({products}) => {

  return(
    <div className='body'>
      <div className={styles.products}>
          {products.map((product)=>(
              <div className={styles.product} key={product.id}>
                  <img className={styles.productImg} src={product.image} alt='product image' width={143} height={144}/>
                  <p>{(product.title.length > 10)?`${product.title.substring(0,15)}...`:product.title}</p>
                  <p className={styles.price}>{product.price} DH</p>
              </div>
          ))}
      </div>
      </div>
  );
}
 
export default Category; 
 


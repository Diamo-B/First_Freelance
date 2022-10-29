import styles from '../styles/Home.module.css'
import MySwiper from '../components/Swiper'

export const getStaticProps = async () => {
  let res = await fetch("https://fakestoreapi.com/products?limit=4");
  let data = await res.json();
  return {
    props :{products: data}
  };
}

export default function Home({products}) {
  return (
      <div className="content">
        
        <div className={styles.header}>
          <h1>Favoris</h1>
          <h3>Voir Plus &gt;</h3>
        </div>
        <MySwiper products={products}/>
      </div>
  )
}

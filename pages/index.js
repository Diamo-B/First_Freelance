import styles from '../styles/Home.module.css'
import MySwiper from '../components/Swiper'
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { prisma } from '/prisma/dbInstance.ts';
import useBetterMediaQuery from '/components/useBetterMediaQuery';
import DesktopNoSwiper from '/components/DesktopAntiSwiper';

export const getServerSideProps = async () => {
  
    let products = await prisma.product.findMany({
      take: 8,
      where:{
        Favorite: true
      },
      include:{
        Thumbnails: true,
        Category: true
      }
    });
  
  return {
    props :{products}
  };
}

async function addCart(){
  let cookieCart = Cookies.get('cart');
  if(cookieCart==undefined)
  {
    const res = await fetch('/api/carts/addCart',
    {
      method: 'POST',
      headers: {
        'Content-Type': "application/json; charset=utf-8"
      }
    }
    );
    let cart = await res.json();
    Cookies.set('cart', cart.Id, {expires:365});
  } 
  else
  {
    const res = await fetch('/api/carts/getCart/'+parseInt(cookieCart),
    {
      method: 'GET',
      headers:{
        'Content-Type': "application/json; charset=utf-8"
      }
    });
    let carts = await res.json();
    if(carts[0]==undefined)
    {
      Cookies.remove('cart');
      addCart();
    }
  }
}

export default function Home({products}) {
 
  useEffect(()=>{
    addCart();
  },[]);
  const isMobile = useBetterMediaQuery('(max-width: 500px)');
return (  
      <div className={isMobile?"content":styles.pageCenter}>
        <div className={styles.header}>
          <h1>Favoris</h1>
          <Link href="/Favorites"><h3>Voir Plus &gt;</h3></Link>
        </div>
        {
          isMobile?
            products.length!==0 && <MySwiper products={products.slice(0, 5)}/> 
          :
            products.length!==0 && 
            <div style={{ marginBottom: '2em' }}>
              <DesktopNoSwiper products={products.slice(0, 4)}/> 
            </div>
        }
      </div>
  )
}
import styles from '../styles/Home.module.css'
import MySwiper from '../components/Swiper'
import Link from 'next/link';
import Cookies from 'js-cookie';

import { PrismaClient } from '@prisma/client';
import { useEffect } from 'react';
let prisma = new PrismaClient();

export const getStaticProps = async () => {
  let products = await prisma.product.findMany({
    take: 5,
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
  if(Cookies.get('cart')==undefined)
  {
    const res = await fetch('/api/addCart',
    {
      method: 'POST',
    }
    );
    let cart = await res.json();
    Cookies.set('cart', cart.Id, {expires:365});
  } 
}

export default function Home({products}) {
  useEffect(()=>{
    addCart();
  },[]);
return (  
      <div className="content">
        
        <div className={styles.header}>
          <h1>Favoris</h1>
          <Link href="/Favorites"><h3>Voir Plus &gt;</h3></Link>
        </div>
        { products.length!==0 && <MySwiper products={products}/> }
      </div>
  )
}
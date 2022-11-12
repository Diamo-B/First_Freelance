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
  let cookieCart = Cookies.get('cart');
  if(cookieCart==undefined)
  {
    const res = await fetch('/api/addCart',
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
    const res = await fetch('/api/getCart/'+parseInt(cookieCart),
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
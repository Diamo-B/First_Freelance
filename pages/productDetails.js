import styles from '../styles/productDetails.module.css';
import DetailsSwiper from '../components/detailsSwiper/Swiper';
import { useState } from 'react';
import Link from 'next/link';

const productDetails = () => {
    let images =[
        '/product.png',
        '/product.png',
        '/product.png'
    ]

    let [Dispo,setDispo]= useState(true);

    let x = () => {setDispo(!Dispo)}

    return ( 
        <div className="body">
            <DetailsSwiper images={images}/>
            <div className={styles.Details}>
                <h1>Utensils de cuisine 5 pieces</h1>
                <p className={styles.category}>Category: Cuisine  |  <span>Produits Similaires &gt;</span></p>
                <p className={styles.marque}>Marque: Lorem</p>
            </div> 
            <div className={styles.price}>
                <p className={styles.actual}>160 DH</p>
                <p className={styles.oldPrice}>200 DH</p>
                <div className={styles.reduction}>20%</div>
            </div> 
            <div className={styles.Disponibility}>
                {
                    Dispo? <p className={styles.in}>En Stock</p> : <p className={styles.out}>Rupture de Stock</p>
                }
            </div>
            <div className= {styles.Commander}>
                <div className={styles.Tel}>
                    <img src="/tel.svg" alt="tel" />
                </div>
                <p>Ou</p>
                <div className={styles.whatsapp}>
                    <p>Commander Via Whatsapp</p>
                </div>
            </div>
        </div>
    );
}
 
export default productDetails;
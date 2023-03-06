import Link from "next/link";
import Image from "next/image";
import styles from '../../../styles/Browser/navbar.module.css';
import ProductSearchBar from '../../productsSearchBar';
import { useState } from "react";

const BrowserNavGen = ({searchData}) => {
    let [showSearch, setShowSearch] = useState(false);
    return ( 
        <>
            <nav className={styles.navbar}>
                <div className={styles.right}>
                    <Link href="/"><Image className="navLogo" src="/mido7-logo.jpg" alt="logo" width={60} height={60}/></Link>
                    <div className={styles.categories}>
                        <Link href='/Categories/Cheveux'>Cheveux</Link>
                        <Link href='/Categories/Visage'>Visage</Link>
                        <Link href='/Categories/Parfums'>Parfums</Link>
                        <Link href='/Categories/Para'>Para</Link>
                    </div>
                </div>
                <div className={styles.left}>
                    {
                        showSearch?
                        <Image src="/close.svg" alt="close search" width={25} height={25} onClick={()=>{setShowSearch(!showSearch)}}/>
                        :
                        <Image src="/magnifier.svg" alt="search" width={25} height={25} onClick={()=>{setShowSearch(!showSearch)}}/>
                    }
                    
                    <Link href="/Cart"><Image src="/cart.svg" alt="cart" width={27.06} height={20.5}/></Link>
                    <Link href="/Admin"><span className={styles.adminButton}>Admin</span></Link>
                </div>
            </nav>
            {
                showSearch&&
                <ProductSearchBar searchData={searchData}/>
            }
        </>
    );
}
 
export default BrowserNavGen;

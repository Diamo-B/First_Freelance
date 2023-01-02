import Link from "next/link";
import Image from "next/image";
import styles from "/styles/browser/navbar.module.css";
import ProductSearchBar from '/components/productsSearchBar';
import { useState } from "react";

const BrowserNavGen = ({searchData}) => {
    let [showSearch, setShowSearch] = useState(false);
    return ( 
        <>
            <nav className={styles.navbar}>
                <div className={styles.right}>
                    <Link href="/"><Image className="navLogo" src="/VIP7-logo.svg" alt="logo" width={60} height={60}/></Link>
                    <div className={styles.categories}>
                        <Link href='/Categories/Electroniques'>Electroniques</Link>
                        <Link href='/Categories/Cosmétiques'>Cosmétiques</Link>
                        <Link href='/Categories/Cuisine'>Cuisine</Link>
                        <Link href='/Categories/Divers'>Divers</Link>
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
import Footer from "../Footer";
import DetailPageNav from '../navbars/Navbar3';
import { useState } from "react";
import Menu from "../Menu";
import Head from "next/head";

const FavoritesLayout = ({children}) => {
    const [isActive, setIsActive] = useState(false);

    return ( 
        <>
        <Head>
            <title>LoremIpsum.com</title>
        </Head> 
        <div className='body'>
            <Menu isActive={isActive} setIsActive={setIsActive}/>
            <DetailPageNav isActive={isActive} setIsActive={setIsActive}/>
            <main>
            {children}
            </main>
        </div>
        <Footer/>
        </>
    );
}
 
export default FavoritesLayout;
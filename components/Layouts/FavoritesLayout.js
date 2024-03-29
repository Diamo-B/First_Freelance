import Footer from "../Footer";
import BrowserNavGen from '../navbars/browser/Navbar';
import DetailPageNav from '../navbars/mobile/Navbar3';
import { useState } from "react";
import Menu from "../Menu";
import Head from "next/head";
import useBetterMediaQuery from "../useBetterMediaQuery";

const FavoritesLayout = ({children}) => {
    const [isActive, setIsActive] = useState(false);
    const isMobile = useBetterMediaQuery('(max-width: 500px)');
    return ( 
        <>
        <Head>
            <title>Mido7.ma</title>
        </Head> 
        <div className='body'>
            {
                isMobile?
                    <>
                        <Menu isActive={isActive} setIsActive={setIsActive}/>
                        <DetailPageNav isActive={isActive} setIsActive={setIsActive}/>
                    </>
                :    
                    <BrowserNavGen  searchData={true}/>
            }
            <main>
            {children}
            </main>
        </div>
        <Footer/>
        </>
    );
}
 
export default FavoritesLayout;

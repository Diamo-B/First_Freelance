import Footer from "../Footer";
import DetailPageNav from '../navbars/Navbar3';
import { useState } from "react";
import Menu from "../Menu";
import Head from "next/head";

const DetailsLayout = ({children}) => {
    const [isActive, setIsActive] = useState(false);
    
    return ( 
        <>
        <Head>
            <title>LoremIpsum.com</title>
            <meta httpEquiv='Content-Security-Policy' content="font-src https://fonts.gstatic.com https://fonts.googleapis.com data: https://*.fbcdn.net " />
        </Head> 
        <div className='body'>
            <Menu isActive={isActive} setIsActive={setIsActive}/>
            <DetailPageNav isActive={isActive} setIsActive={setIsActive}/>
            <main>
            {children}
            </main>
            <Footer/>
        </div>
        </>
    );
}
 
export default DetailsLayout;
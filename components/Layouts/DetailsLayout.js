import Footer from "../Footer";
import DetailPageNav from '../navbars/mobile/Navbar3';
import { useState,useEffect } from "react";
import Menu from "../Menu";
import Head from "next/head";
import useBetterMediaQuery from "../useBetterMediaQuery";
import BrowserNavGen from '../navbars/browser/Navbar'

const DetailsLayout = ({children}) => {
    const [isActive, setIsActive] = useState(false);
    let [searchData,setSearchData] = useState(null);
    const isMobile = useBetterMediaQuery('(max-width: 500px)');

    useEffect(() => {
        fetch("/api/products/getProducts/getAllProducts",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res) => res.json())
        .then((data) => {
        setSearchData(data)
        })
    }, []);
    
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
                    <DetailPageNav isActive={isActive} setIsActive={setIsActive} searchData={searchData}/>
                </>
                :
                <BrowserNavGen searchData={true}/>
            }
            <main>
            {children}
            </main>
        </div>
        <Footer/>
        </>
    );
}
 
export default DetailsLayout;

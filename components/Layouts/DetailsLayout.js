import Footer from "../Footer";
import DetailPageNav from '../navbars/Navbar3';
import { useState,useEffect } from "react";
import Menu from "../Menu";
import Head from "next/head";

const DetailsLayout = ({children}) => {
    const [isActive, setIsActive] = useState(false);
    let [searchData,setSearchData] = useState(null);

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
            <title>LoremIpsum.com</title>
        </Head> 
        <div className='body'>
            <Menu isActive={isActive} setIsActive={setIsActive}/>
            <DetailPageNav isActive={isActive} setIsActive={setIsActive} searchData={searchData}/>
            <main>
            {children}
            </main>
        </div>
        <Footer/>
        </>
    );
}
 
export default DetailsLayout;
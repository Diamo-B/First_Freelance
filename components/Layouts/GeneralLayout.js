import Navbar from "/components/navbars/mobile/Navbar";
import BrowserNavGen from "/components/navbars/browser/Navbar";
import Footer from '/components/Footer';
import { useState, useEffect } from "react";
import Menu from "/components/Menu";
import Head from "next/head";
import useBetterMediaQuery from "/components/useBetterMediaQuery";

const Layout = ({children}) => {
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
        <title>LoremIpsum.com</title>
      </Head> 
      <div className="body">
        {
          isMobile?
          <>
            <Menu isActive={isActive} setIsActive={setIsActive}/>
            <Navbar isActive={isActive} setIsActive={setIsActive} searchData={searchData}/>
          </>
          :
          <>
            <BrowserNavGen searchData={searchData}/>
          </>

        }
        <main>
          {children}
        </main>
      </div>
      <Footer/>
    </>
  );
}
 
export default Layout;
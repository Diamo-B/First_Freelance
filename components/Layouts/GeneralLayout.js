import Navbar from "../navbars/Navbar";
import Footer from '../Footer';
import { useState, useEffect } from "react";
import Menu from "../Menu";
import Head from "next/head";

const Layout = ({children}) => {
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
      <div className="body">
        <Menu isActive={isActive} setIsActive={setIsActive}/>
        <Navbar isActive={isActive} setIsActive={setIsActive} searchData={searchData}/>
        <main>
          {children}
        </main>
      </div>
      <Footer/>
    </>
  );
}
 
export default Layout;
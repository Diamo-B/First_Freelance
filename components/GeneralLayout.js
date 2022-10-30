import Navbar from "./Navbar";
import Footer from './Footer';
import { useEffect, useState } from "react";
import Menu from "./Menu";
import Head from "next/head";


const Layout = ({children}) => {

    const [isActive, setIsActive] = useState(false);

    return ( 

        <>
      <Head>
        <title>LoremIpsum.com</title>
      </Head> 
        <div className="body">
            <Menu isActive={isActive} setIsActive={setIsActive}/>
            <Navbar isActive={isActive} setIsActive={setIsActive}/>
            <main>
                {children}
            </main>
            َ<Footer/>
        </div>
        </>
    );
}
 
export default Layout;
import Head from "next/head";
import AdminNav from '/components/navbars/mobile/AdminNav';
import { useState } from "react";
import Menu from '/components/Menu'
import Footer from '/components/Footer'
import useBetterMediaQuery from "/components/useBetterMediaQuery";
import BrowserNavGen from '/components/navbars/browser/Navbar';

const AdminLayout = ({children}) => {
    const [isActive, setIsActive] = useState(false);
    const isMobile = useBetterMediaQuery('(max-width: 500px)');

    let isAdmin = true;
    return (
        <> 
            <Head>
                <title>LoremIpsum.com | Administration</title>
            </Head>
            {
                isMobile?
                <>
                    <Menu isActive={isActive} isAdmin={isAdmin} setIsActive={setIsActive}/>
                    <AdminNav isActive={isActive} isAdmin={isAdmin} setIsActive={setIsActive}/>
                </>
                :
                    <BrowserNavGen searchData={true}/>
            }
            <main>
                {children}
            </main>
            <Footer/>
        </>
    );
}

export default AdminLayout;
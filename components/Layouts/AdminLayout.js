import Head from "next/head";
import AdminNav from '../navbars/mobile/AdminNav';
import { useState } from "react";
import Menu from '../Menu'
import Footer from '../Footer'
import useBetterMediaQuery from "../useBetterMediaQuery";
import BrowserNavGen from '../navbars/browser/Navbar';

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
import Head from "next/head";
import AdminNav from '../navbars/AdminNav'
import { useState } from "react";
import Menu from '../Menu'
import Footer from '../Footer'

const AdminLayout = ({children}) => {
    const [isActive, setIsActive] = useState(false);
    let isAdmin = true;
    return (
        <> 
        <Head>
            <title>LoremIpsum.com | Administration</title>
        </Head>
        <Menu isActive={isActive} isAdmin={isAdmin} setIsActive={setIsActive}/>
        <AdminNav isActive={isActive} isAdmin={isAdmin} setIsActive={setIsActive}/>
        <main>
            {children}
        </main>
        <Footer/>
        </>
    );
}
 
export default AdminLayout;
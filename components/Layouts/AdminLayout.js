import Head from "next/head";
import AdminNav from '../navbars/AdminNav'
const AdminLayout = ({children}) => {
    return (
        <> 
        <Head>
            <title>LoremIpsum.com | Administration</title>
        </Head>

        <AdminNav/>
        <main>
            {children}
        </main>
        </>
    );
}
 
export default AdminLayout;
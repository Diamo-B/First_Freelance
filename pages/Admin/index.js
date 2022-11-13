import {useSession} from 'next-auth/react';
import styles from "../../styles/Admin/index.module.css";
import Link from 'next/link';

const AdminHome = () => {
    const {data:session} = useSession({required: true});

    if(!session)
    {
        return( // this is rendered to fix the split second before redirection where the admin page is shown while the session is missing
            <></>
        )
    }
    return ( 
        <>
            <h3 className={styles.title}>Administration</h3>
            
            <div className={styles.box}>
                <div className={styles.container}>
                    <h2>Produits</h2>
                    <p>Choisissez ce que vous voulez faire:</p>
                    <div className={styles.buttons}>
                        <Link href="/Admin/forms/products/Add"><button>Ajouter un produit</button></Link>
                        <Link href="/Admin/forms/products/Update"><button>Modifier un produit</button></Link>
                        <Link href="/Admin/forms/products/Remove"><button>Supprimer un produit</button></Link>
                    </div>
                </div>
                <div className={styles.container}>
                    <h2>Category</h2>
                    <p>Choisissez ce que vous voulez faire:</p>
                    <div className={styles.buttons}>
                        <Link href="/Admin/forms/categories/Add"><button>Ajouter une category</button></Link>
                        <Link href="/Admin/forms/categories/Update"><button>Modifier une category</button></Link>
                        <Link href="/Admin/forms/categories/Remove"><button>Supprimer une category</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AdminHome;
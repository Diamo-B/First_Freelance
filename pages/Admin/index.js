import {useSession} from 'next-auth/react';
import styles from "../../styles/Admin/index.module.css";
import Link from 'next/link';
import {signOut} from 'next-auth/react';
import useBetterMediaQuery from '../../components/useBetterMediaQuery';


const AdminHome = () => {
    const {data:session} = useSession({required: true});
    const isMobile = useBetterMediaQuery('(max-width: 500px)');
    if(!session)
    {
        return( // this is rendered to fix the split second before redirection where the admin page is shown while the session is missing
            <></>
        )
    }
    return ( 
        <>
        {
            isMobile?
                <>
                <h3 className={styles.title}>Administration</h3>
                <div className={styles.box}>
                    <div className={styles.container} style={{ alignSelf: 'center' }}>
                        <h2>Produits</h2>
                        <p>Choisissez ce que vous voulez faire:</p>
                        <div className={styles.buttons}>
                            <Link href="/Admin/forms/products/Add"><button>Ajouter un produit</button></Link>
                            <Link href="/Admin/forms/products/Update"><button>Modifier un produit</button></Link>
                            <Link href="/Admin/forms/products/Remove"><button>Supprimer un produit</button></Link>
                        </div>
                    </div>

                    <div className={styles.container}>
                        <h2>Paniers</h2>
                        <div className={styles.buttons}>
                            <Link href="/Admin/forms/cart/check"><button>Consulter le contenu d&apos;un panier</button></Link>
                        </div>
                    </div>

                    <div className={styles.container}>
                        <h2>Commandes</h2>
                        <div className={styles.buttons}>
                            <Link href="/Admin/forms/orders/check"><button>Consulter une commande</button></Link>
                        </div>
                    </div>
                </div>
                </>
            :
            <>
                <h3 className={styles.title}>Administration</h3>
                <div className={styles.flex1}>

                    <div className={styles.container}>
                        <h2>Paniers</h2>
                        <div className={styles.buttons}>
                            <Link href="/Admin/forms/cart/check"><button>Consulter le contenu d&apos;un panier</button></Link>
                        </div>
                    </div>

                    <div className={styles.TopDesktopContainer}>
                        <h2>Produits</h2>
                        <p>Choisissez ce que vous voulez faire:</p>
                        <div className={styles.buttons}>
                            <Link href="/Admin/forms/products/Add"><button>Ajouter un produit</button></Link>
                            <Link href="/Admin/forms/products/Update"><button>Modifier un produit</button></Link>
                            <Link href="/Admin/forms/products/Remove"><button>Supprimer un produit</button></Link>
                        </div>
                    </div>

                    <div className={styles.container}>
                        <h2>Commandes</h2>
                        <div className={styles.buttons}>
                            <Link href="/Admin/forms/orders/check"><button>Consulter une commande</button></Link>
                        </div>
                    </div>

                </div>

                <div className={styles.signoutPanel}>
                    <button className={styles.logoutBtn} onClick={()=>signOut({ callbackUrl: process.env.DOMAIN })}>SignOut</button>
                </div>
                
            </>
        }
        </>
    );
}
export default AdminHome;
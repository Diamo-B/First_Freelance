import styles from '../styles/productDetails.module.css'
import Link from 'next/link';

const CartXProductPresence = () => {

    return ( 
        <div className={styles.Nullpanel}>
            <div className={styles.popUp}>
                <span className={styles.ExistingProduct}>Le Produit que vous voulez ajouter est déja présent dans votre panier!</span>
                <div className={styles.Panier} style={{marginBottom:1+"em"}}>
                    <Link href="/Cart">Consulter votre panier</Link>
                </div>
                <div className={styles.Panier}>
                    <Link href="/">Retourner vers la page d&apos;acceuil</Link>
                </div>
            </div>
        </div>
     );
}
 
export default CartXProductPresence;
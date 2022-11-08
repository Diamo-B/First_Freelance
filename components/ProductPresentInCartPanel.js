import styles from '../styles/productDetails.module.css'
import Link from 'next/link';

const CartXProductPresence = ({setProductPresentInCart,setCanAddCart}) => {
    return ( 
        <div className={styles.Nullpanel}>
            <div className={styles.popUp}>
                <span className={styles.ExistingProduct}>Le Produit que vous voulez ajouter est déja présent dans votre panier!</span>
                <div className={styles.Panier} style={{marginBottom:1+"em"}}>
                    <p
                        onClick={
                            ()=>{setProductPresentInCart(false);setCanAddCart(true)}
                        }
                    >Retourner vers la page du produit</p>
                </div>
                <div className={styles.Panier}>
                    <Link href="/">Retourner vers la page d&apos;acceuil</Link>
                </div>
            </div>
        </div>
     );
}
 
export default CartXProductPresence;
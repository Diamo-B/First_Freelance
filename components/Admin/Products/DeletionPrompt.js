import styles from '/styles/Admin/Products/add.module.css'
import {useRouter} from 'next/router';

const DeletionPrompt = ({product,setPromptData}) => {
    let router = useRouter();
    return ( 
        <div className={styles.Nullpanel}>
            <div className={styles.popUp}>
                <p className={styles.successText}>Le produit {product} est supprimé avec succés</p>
                <button className={styles.submit} 
                    onClick={()=>{
                        setPromptData(false);
                        router.reload();
                    }}
                >OK</button>           
            </div>
        </div>
    );
}
 
export default DeletionPrompt;
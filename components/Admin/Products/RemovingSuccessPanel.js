import styles from '/styles/Admin/Products/add.module.css'
import {useRouter} from 'next/router';

const RemoveSucess = ({isDeleted,deleted}) => {
    let router = useRouter();
    return ( 
        <div className={styles.Nullpanel}>
            <div className={styles.popUp}>
                <p className={styles.successText}>Le produit &quot;{deleted.Title}&quot; supprimé avec succés</p>
                <button className={styles.submit} 
                    onClick={()=>{
                        isDeleted(false);
                        router.reload();
                    }}
                >OK</button>           
            </div>
        </div>
    );
}
 
export default RemoveSucess;
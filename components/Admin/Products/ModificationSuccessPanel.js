import { useRouter } from 'next/router';
import styles from '/styles/Admin/Products/add.module.css'


const ModificationSuccessPanel = ({isModified,setIsModified}) => {
    let router = useRouter();
    return ( 
        <div className={styles.Nullpanel}>
            <div className={styles.popUp}>
                <p className={styles.successText}>Le produit avec l&apos;Id &quot;{isModified}&quot; est modifié avec succés</p>
                <button className={styles.submit} 
                    onClick={()=>{
                        setIsModified(null);
                        router.reload();
                    }}
                >OK</button>           
            </div>
        </div>
    );
}
 
export default ModificationSuccessPanel;
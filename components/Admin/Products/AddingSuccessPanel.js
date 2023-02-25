import styles from '../../../styles/Admin/Products/add.module.css'
import {useRouter} from 'next/router'; 

const AddSuccess = ({setIsAdded}) => {
    let router = useRouter();
    return ( 
        <div className={styles.Nullpanel}>
            <div className={styles.popUp}>
                <p className={styles.successText}>Produit ajouté avec succés</p>
                <button className={styles.btn} 
                    onClick={()=>{
                        setIsAdded(false);
                        router.push('/Admin');
                    }}
                >OK</button>           
            </div>
        </div>
    );
}
 
export default AddSuccess;
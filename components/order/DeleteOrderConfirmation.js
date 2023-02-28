import styles from "../../styles/OrderForm.module.css";
import {useRouter} from 'next/router';

const DeleteOrderConfirmation = ({orderId,setDeletionPanel}) => {
    let router = useRouter();
    let RemoveOrder = () => {
        fetch("/api/orders/delete",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                Id: orderId
            })
        }).then(()=>{
            router.push("/Admin/forms/orders/check");
        })
    }
    
    return ( 
    <div className={styles.container}>
        <div className={styles.Form}>
                <p className={styles.success}>
                    Voulez vous vraiment supprimer la commande?
                </p>
                <button className={styles.submit} onClick={()=>{RemoveOrder()}}>Oui</button>
                <button className={styles.submit} onClick={()=>{setDeletionPanel(false)}}>Non</button>
            </div>
    </div>
    );
}
 
export default DeleteOrderConfirmation;
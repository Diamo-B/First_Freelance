import styles from '../../styles/OrderForm.module.css';

const OrderSuccessPanel = ({setOrderSuccess}) => {
    return ( 
        <div className={styles.container}>
            <div className={styles.Form}>
                <p className={styles.success}>
                    La commande a été passée avec succès.
                </p>
                <button className={styles.submit} onClick={()=>{setOrderSuccess(false)}}>OK</button>
            </div>
        </div>
    );
}
 
export default OrderSuccessPanel;
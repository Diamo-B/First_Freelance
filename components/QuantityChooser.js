import styles from '../styles/productDetails.module.css';
import Image from 'next/image';

const QuantityChoice = ({Quantity,totalStock,RemoveQte,AddQte,CartisNull}) => {
    return ( 
        <div className={styles.Qte} style={CartisNull?{maxWidth: 80+'%' , marginBottom: 2+'em'}:null}>
        <Image onClick={RemoveQte} src="/mince.svg" alt="mince qte" width={15} height={8}/>
        <p className={Quantity<totalStock && Quantity>0?`${styles.actual} ${styles.QteValue}`:`${styles.maxActual} ${styles.QteValue}`}>{Quantity}</p>
        <Image onClick={AddQte} src="/plus.svg" alt="plus qte" width={15} height={13}/>
    </div>
    );
}
 
export default QuantityChoice;
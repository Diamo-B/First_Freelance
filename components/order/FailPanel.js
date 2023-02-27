import styles from "../../styles/OrderForm.module.css";

const OrderFailPanel = ({ setOrderFailed }) => {
  return (
    <div className={styles.container}>
        <div className={styles.Form}>
            <p className={styles.failure}>
                Erreur dans le passage de la commande. Veuillez réssayer🙏🏻. <br /> Si le
                problème persiste, veuillez contacter l&apos;administrateur via whatsapp ou
                téléphone sur:
            </p>
            <span className={styles.phoneNumber}>0684265164</span>
            <button className={styles.submit} onClick={() => {setOrderFailed(false)}}>OK</button>
        </div>
    </div>
  );
};

export default OrderFailPanel;

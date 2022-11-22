import styles from '/styles/Admin/Categories/add.module.css'

const DuplicateCat = ({setDuplicateCategory}) => {
    return ( 
        <div className={styles.Nullpanel}>
            <img className={styles.close} onClick={()=>setDuplicateCategory(false)} src="/close.svg" alt="close button" />           
            <div className={styles.popUp}>
                <p>Veuillez s&apos;il vous-plaît changer le libellé de la catégorie!! Une autre catégorie posséde le même libellé</p>
            </div>
        </div>
    );
}
 
export default DuplicateCat;
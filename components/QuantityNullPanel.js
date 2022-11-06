import { useState } from 'react';
import styles from '../styles/productDetails.module.css'
import QuantityChoice from './QuantityChooser'

const QuantityNullPanel = ({Quantity,totalStock,RemoveQte,AddQte,CartisNull,saveToDatabase,ProductPresentInCart,setProductPresentInCart,checkProductPresenceInCart,Id}) => {
    let [quantityErrorMessage, setQuantityErrorMessage] = useState(false);
    return (
        <div className={styles.Nullpanel}>
            <div className={styles.popUp}>
                <p>Veuillez s'il vous-plaît ajouter une Quantité avant d'ajouter ce produit dans le panier</p>
                <QuantityChoice Quantity={Quantity} totalStock={totalStock} RemoveQte={RemoveQte} AddQte={AddQte} CartisNull={CartisNull}/>
                <div className={styles.Panier} style={{marginBottom: 1+'em'}}>
                    <p
                    onClick=
                    {
                        async ()=>{
                            if(Quantity>0){
                                setQuantityErrorMessage(false);
                                if(!ProductPresentInCart)
                                {   
                                    let found = 0;
                                    let check = await checkProductPresenceInCart(); 
                                    check[0].Items.map(prod => {
                                        if(prod.ProductId == Id)
                                        {
                                            setProductPresentInCart(true);
                                            found = 1;
                                        }
                                    });
                                    if (found == 0)
                                    {
                                        await saveToDatabase (Id,Quantity);
                                    }
                                }
                            }
                            else
                                setQuantityErrorMessage(true);
                        }
                    }
                    >Add To Cart</p>
                </div>
                {
                   quantityErrorMessage && <p style={{color: 'red',marginBottom: 0}}>La Quantité doit étre supérieur à 0</p>
                }
            </div>
        </div>
   );
}
 
export default QuantityNullPanel;
import styles from '/styles/Admin/orders/views.module.css';
import {useSession} from 'next-auth/react';
import DeleteOrderConfirmation from '/components/order/DeleteOrderConfirmation';
import { useState } from 'react';
import { prisma } from '/prisma/dbInstance.ts';

export async function getServerSideProps(context)
{
    let Id = context.params.id;
    let orderData = await prisma.order.findFirst({
        orderBy: {
            CreatedAt: 'desc',
        },
        where:{
            Id: Number(Id)
        },
        include:{
            OrderProducts: {
                include:{
                    Product:{
                        select:{
                            Title: true,
                            Price: true,
                            DiscountRate: true
                        }
                    }
                },
            },
        }
    })
    orderData.CreatedAt = orderData.CreatedAt.toISOString();
    return{
        props:{
            orderData
        }
    }
}

const ViewOrder = ({orderData}) => {
    let [deletionPanel, setDeletionPanel] = useState(false);
    const {data:session} = useSession({required: true});
    if(!session)
    {
        return( // this is rendered to fix the split second before redirection where the admin page is shown while the session is missing
            <></>
        )
    }

    let orderProducts = orderData.OrderProducts;
    let TotalPrice = 0;

    let CalculateSubPrices = (ProdObj)=>{
        let productSubPrice;
        if(ProdObj.Product.DiscountRate != null)
        {
            let productNewPrice = ProdObj.Product.Price - (ProdObj.Product.Price*ProdObj.Product.DiscountRate/100);
            productSubPrice = productNewPrice*ProdObj.Quantity;
        }
        else
        {
            productSubPrice = ProdObj.Quantity*ProdObj.Product.Price;
        }
        TotalPrice += productSubPrice;
        return productSubPrice.toFixed(2);
    }

    let removeOrder = () => {
        setDeletionPanel(true)
    }

    return ( 
        <>
            <div className={styles.card}>
                <h1 className={styles.Title}>Commande N°{orderData.Id}</h1>
                <p className={styles.Prompt}>Nom du Client: <span className={styles.Data}>{orderData.ClientLastName}</span></p>
                <p className={styles.Prompt}>Prénom du Client: <span className={styles.Data}>{orderData.ClientFirstName}</span></p>
                {
                orderData.ClientPhoneNumber?
                    <>
                        <p className={styles.Prompt}>Téléphone(Appels):</p>
                        <p className={styles.Data}>{orderData.ClientPhoneNumber}</p>
                    </>
                :
                    ""
                }

                {
                orderData.ClientWhatsappNumber?
                    <>
                        <p className={styles.Prompt}>Téléphone(Whatsapp): </p>
                        <p className={styles.Data}>{orderData.ClientWhatsappNumber}</p>
                    </>
                :
                    ""
                }
            </div>
            {
                orderProducts &&
                <div className={[styles.text_center,styles.font1].join(' ')}>
                    <h1 className={styles.Title}>Produits commandés</h1>
                    {
                        orderProducts.map((prod,index)=>(
                            <div key={prod.Id}>
                                <div className={styles.flexProds}>
                                    <div className={styles.left}>
                                        <p>Titre</p>
                                        <p>Prix Unitaire</p>
                                        <p>Réduction</p>
                                        <p>Quantité</p>
                                        <p>Sous-Total</p>
                                    </div>
                                    <div className={styles.center}>
                                        <p className={styles.Data}>{prod.Product.Title}</p>
                                        <p className={styles.Data}>{prod.Product.Price} DH</p>
                                        <p className={styles.Data}>{prod.Product.DiscountRate?prod.Product.DiscountRate+" %":"------"}</p>
                                        <p className={styles.Data}>{prod.Quantity}</p>
                                        <p className={[styles.Data, styles.subTotal].join(' ')}>{CalculateSubPrices(prod)} DH</p>
                                    </div>
                                </div>
                                {
                                index !== orderProducts.length - 1?
                                    <hr/>
                                    :
                                    <span></span>       
                                }
                            </div>
                        )) 
                    }
                </div>
            }
            <p className={styles.TotalText}>Total de la Commande:</p>
            <p className={styles.Total}>{TotalPrice.toFixed(2)} DH</p>

            <div className={styles.resolved}>
                <button onClick={()=>removeOrder(orderData.Id)}>
                    Commande Résolue
                </button>
            </div>
            {
                deletionPanel &&
                <DeleteOrderConfirmation orderId={orderData.Id} setDeletionPanel={setDeletionPanel}/>
            }
        </>
    );
}
 
export default ViewOrder;
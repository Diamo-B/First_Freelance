import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import styles from '/styles/Admin/orders/views.module.css'

const ViewOrder = () => {
    const router = useRouter();
    const orderId = router.query;
    
    let [orderData,setOrderData] = useState({});

    useEffect(()=>{
        fetch('/api/orders/getById',{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                id: orderId.Id
            })
        })
        .then(async(data)=>{
            setOrderData(await data.json());
        })    
        .catch((err)=>{
            console.log(err);
        })
    },[])

    let orderProducts = orderData.OrderProducts;
    return ( 
        <>
            <h1>Commande N°{orderData.Id}</h1>
            <div className={styles.card}>
                <p>Nom du Client: {orderData.ClientLastName}</p>
                <p>Prénom du Client: {orderData.ClientFirstName}</p>
                {
                orderData.ClientPhoneNumber?
                    <p>Numéro de téléphone du Client (Appels): {orderData.ClientPhoneNumber}</p>
                :
                    ""
                }

                {
                orderData.ClientWhatsappNumber?
                    <p>Numéro de téléphone du Client (Whatsapp): {orderData.ClientWhatsappNumber}</p>
                :
                    ""
                }
                {
                    orderProducts &&
                    <>
                        <h3>Produits commandés</h3>
                        {
                            orderProducts.map((prod)=>(
                                <div key={prod.Id}>
                                    <p>Titre: {prod.Title}</p>
                                    <p>Quantité: </p> {/* //TODO:  Add the Quantity from the Item table for each product */}
                                </div>
                            )) 
                        }
                    </>
                }

            </div>
            {
                console.log(orderData)
            }
        </>
    );
}
 
export default ViewOrder;
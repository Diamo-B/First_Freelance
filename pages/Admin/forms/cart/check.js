import styles from '/styles/Admin/Carts/get.module.css'
import { useState } from 'react';

export async function getServerSideProps()
{
    let res = await fetch("http://localhost:3000/api/getCart/allCarts",{
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        }
    });
    let data = await res.json();
    return {
        props:{data}
    }
}

const CheckCart = ({data}) => {
    let [cartId,setCartId]=useState(null);
    let [canShowData, setCanShowData] = useState(null);
    let [notFound, setNotFound] = useState(null);
    let [emptyCart, setEmptyCart] = useState(null);
    let [arrayIndex,setArrayIndex] = useState(null);
    let total=0;

    let handleCartId = (data) => {
        data.map((cart,index)=>{
            if(cart.Id == cartId)
            {
                if (cart.Items.length == 0)
                {
                    setEmptyCart(cart.Id)
                    setCanShowData(null);
                    setArrayIndex(null);
                    setNotFound(null);
                }
                else
                {
                    setCanShowData(true);
                    setArrayIndex(index);
                    setNotFound(null);
                    setEmptyCart(null);
                }
            }
            else
            {
                setCanShowData(null);
                setNotFound(true);
                setEmptyCart(null);
            }
        })
        
    }

    let Trim = (str) => {
        return str.length>20?str.slice(0,20):str
    }
 
    return (
        <> 
        <div className={styles.container}>
            <div className={styles.input}>
                <label htmlFor="cartId">Entrer l'ID du panier</label>
                <input type="number" id="cartId" onChange={(event)=>{
                    if(event.target.value)
                        setCartId(event.target.value)
                    else
                    {
                        setCanShowData(null);
                        setNotFound(null);
                        setEmptyCart(null);
                    }
                }}/>
                <button className={styles.button} onClick={()=>handleCartId(data)}>Rechercher</button>
            </div>
            {
                notFound &&
                (
                    <p className={styles.error}>Le panier que vous recherchez est introuvable !! </p>
                )
            }
            {
                emptyCart && 
                (
                    <p className={styles.error}>Le panier avec l'ID {emptyCart} est vide !! </p>
                )
            }
        </div>
        {
            canShowData &&
            (
                <>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className='text-center'>Produit</th>
                                    <th scope="col" className='text-center'>Qte</th>
                                    <th scope="col" className='text-center'>Sous-Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data[arrayIndex].Items.map((item) => (
                                        <tr key={item.Id}>
                                            <td className={styles.hide}>{
                                                total += (item.Product.DiscountRate?
                                                (item.Product.Price-(item.Product.Price*item.Product.DiscountRate)/100):
                                                item.Product.Price)*item.Quantity.toFixed(2)
                                            }</td>
                                            <td className='text-center'>{Trim(item.Product.Title)}</td>
                                            <td className='text-center'>{item.Quantity}</td>
                                            <td className='text-center'>{
                                                item.Product.DiscountRate?
                                                    (item.Product.Price-(item.Product.Price*item.Product.DiscountRate)/100)*item.Quantity.toFixed(2)
                                                :
                                                    item.Product.Price*item.Quantity.toFixed(2) 
                                            }</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table> 
                    </div>

                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className='text-center'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={[styles.total,"text-center"].join(' ')}>{Number(total).toFixed(2)} DH</td>
                                </tr>
                            </tbody>
                        </table> 
                    </div>
                </>
            )
        }
        </>
    );
}
 
export default CheckCart;
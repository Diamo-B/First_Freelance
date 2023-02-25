import styles from "../../../../styles/Admin/Carts/get.module.css";
import { useState } from "react";
import { useSession } from "next-auth/react";

export async function getServerSideProps() {
  let res = await fetch(process.env.DOMAIN+"/api/carts/getCart/allCarts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await res.json();
  return {
    props: { data },
  }; 
}

const CheckCart = ({ data }) => {
  let [results,setResults] = useState(null);
  let [toFind, setToFind] = useState(null);
  let [notFound,setNotFound] = useState(false);
  let [empty,setEmpty] = useState(false);

  const { data: session } = useSession({ required: true });
  if (!session) {
    return (
      // this is rendered to fix the split second before redirection where the admin page is shown while the session is missing
      <></>
    );
  }

  let changeValue = (event) => {
    setToFind(event.target.value);
  }

    let findCartData = () => {
        let cart = data.find(item=>item.Id==toFind);
        if(cart == undefined)
        {
          setNotFound(true);
          setEmpty(false);
          setResults(null);
        }
        else if(cart.Items.length == 0)
        {
          setEmpty(true);
          setNotFound(false);
          setResults(null);           
        }
        else
        {
          setResults(cart.Items);
          setNotFound(false);
          setEmpty(false);   
        }
    }

    let calculateTotal = (results) => {
      let total = 0;
      results.map(item => {
        total +=
        item.Product.DiscountRate?
          (item.Product.Price-(item.Product.Price*item.Product.DiscountRate)/100)*item.Quantity
        :
          item.Product.Price*item.Quantity;
      })
      return total.toFixed(2);
    }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.input}>
          <label htmlFor="cartId">Entrer l&apos;ID du panier</label>
          <input type="number" id="cartId" onChange={(event)=>{changeValue(event)}} />
          <button className={styles.button} onClick={findCartData}>Rechercher</button>
        </div>
      </div>

    {
        results?
        <>
            <div className="table-responsive">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">
                    Produit
                    </th>
                    <th scope="col">
                    Qte
                    </th>
                    <th scope="col">
                    Sous-Total
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    results.map((item)=>{
                        return(
                            <tr key={item.Id}>
                                <td>{item.Product.Title.length>20?item.Product.Title.slice(0,20)+'...':item.Product.Title}</td>
                                <td>{item.Quantity}</td>
                                <td>{
                                    item.Product.DiscountRate?
                                      ((item.Product.Price-(item.Product.Price*item.Product.DiscountRate)/100)*item.Quantity).toFixed(2)
                                    :
                                      (item.Product.Price*item.Quantity).toFixed(2)
                                } DH</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            </div>

            <div className={styles.totalPanel}>
              <p>Total</p>
              <p className={styles.total}>{calculateTotal(results)}DH</p>
            </div>
            {/* <div className="table-responsive">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col" className="text-center">
                    Total
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className={[styles.total, "text-center"].join(" ")}>{calculateTotal(results)}DH</td>
                </tr>
                </tbody>
            </table>
            </div> */}
        </>
        :
        <></>
    }

    {
        notFound?
        <p className={styles.error}>Le panier que vous recherchez est introuvable</p>
        :
        ""
    }

    {
        empty?
        <p className={styles.error}>Le panier que vous recherchez est vide</p>
        :
        ""
    }
    </>
    );
};

export default CheckCart;

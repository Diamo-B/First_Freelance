import { useState } from 'react'
import { prisma } from '/prisma/dbInstance.ts';
import RemoveSucess from '/components/Admin/Products/RemovingSuccessPanel';
import {useSession} from 'next-auth/react';
import styles from '/styles/Admin/Products/remove.module.css'
import Image from 'next/image';

export async function getServerSideProps(context)
{
    const catTitle = String(context.query.category);


    let catProducts = await prisma.product.findMany({
        where:{
            Category:{
                Title: catTitle
            }
        }
    });

    return {
        props:{
            catTitle, catProducts
        }
    }
}


let RemoveCatItems = ({catTitle, catProducts}) => {
    let [deleted,isDeleted] = useState(false);
    const {data:session} = useSession({required: true});

    if(!session)
    {
        return( // this is rendered to fix the split second before redirection where the admin page is shown while the session is missing
            <></>
        )
    }

    let deleteProduct = async (id) => {
        let data = await fetch('/api/products/deleteProduct',{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                Id: id
            })
        })
        let deletedproduct = await data.json();
        isDeleted(deletedproduct);
    }
    
    return(
        <>
            {
                deleted?
                <RemoveSucess isDeleted={isDeleted} deleted={deleted}/>
                :
                ""
            }
            {
                catProducts.length > 0?
                    <>
                        <div className={styles.pageTitle_holder}>
                            <h3 className={styles.pageTitle}>{catTitle}</h3>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" className='text-center'>Titre</th>
                                        <th scope="col" className='text-center'>Stock</th>
                                        <th scope="col" className='text-center'>Del</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        catProducts.map((product) => (
                                            <tr key={product.Id}>
                                                <td className='text-center'>{product.Title}</td>
                                                <td className='text-center'>{product.Stock}</td>
                                                <td className={styles.flex_container}><Image src="/removeFromCart.svg" alt='remove item' width={15} height={30} onClick={()=>deleteProduct(product.Id)} /></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table> 
                        </div>
                    </>
                :
                    <p className={styles.error}>Pas de produits disponibles dans la category {catTitle}</p>
            } 
            
        </>
    );
}

export default RemoveCatItems;
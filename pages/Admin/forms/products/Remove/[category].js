import { useState } from 'react'
import {PrismaClient} from '@prisma/client';
import RemoveSucess from '/components/Admin/Products/RemovingSuccessPanle';
import {useSession} from 'next-auth/react';

let prisma = new PrismaClient();

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
    let deletedproduct;
    let [deleted,isDeleted] = useState(false);
 
    const {data:session} = useSession({required: true});

    if(!session)
    {
        return( // this is rendered to fix the split second before redirection where the admin page is shown while the session is missing
            <></>
        )
    }

    let deleteProduct = async (id) => {
        let data = await fetch('http://localhost:3000/api/products/deleteProduct',{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                Id: id
            })
        })
        deletedproduct = await data.json();
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
            <h1>{catTitle}</h1>
            <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        </div>
                    </th>
                    <th scope="col">Titre</th>
                    <th scope="col">Stock Actuel</th>
                    <th scope="col">Del</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        catProducts.map((product) => (
                            <tr key={product.Id}>
                                <th scope="row">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    </div>
                                </th>
                                <td>{product.Title}</td>
                                <td>{product.Stock}</td>
                                <td className='text-center'><img src="/removeFromCart.svg" onClick={()=>deleteProduct(product.Id)}/></td>
                            </tr>
                        ))
                    }
                </tbody>
                </table> 
            </div>
        </>
    );
}

export default RemoveCatItems;
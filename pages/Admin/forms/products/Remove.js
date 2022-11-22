import {useSession} from 'next-auth/react';
import {PrismaClient} from "@prisma/client";
import Image from 'next/image';
import styles from "/styles/Admin/Products/remove.module.css";

export async function getServerSideProps()
{
    let prisma = new PrismaClient();
    let products = await prisma.product.findMany();
    return{
        props:{
            products
        }
    } 
}

const RemoveProduct = ({products}) => {
    const {data:session} = useSession({required: true});
    console.log(products);
    if(!session)
    {
        return( // this is rendered to fix the split second before redirection where the admin page is shown while the session is missing
            <></>
        )
    }
    return ( 
        <>
            <h2>Supprimer un product</h2>

            <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        </div>
                    </th>
                    <th scope="col">Lorem</th>
                    <th scope="col">Ipsum</th>
                    <th scope="col">Dolor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        </div>
                    </th>
                    <td>Sit</td>
                    <td>Amet</td>
                    <td>Consectetur</td>
                    </tr>
                    <tr>
                    <th scope="row">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        </div>
                    </th>
                    <td>Adipisicing</td>
                    <td>Elit</td>
                    <td>Sint</td>
                    </tr>
                    <tr>
                    <th scope="row">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        </div>
                    </th>
                    <td>Hic</td>
                    <td>Fugiat</td>
                    <td>Temporibus</td>
                    </tr>
                </tbody>
                </table>
            </div>
           
        </>
    );
}
 
export default RemoveProduct;
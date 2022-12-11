import {useSession} from 'next-auth/react';
import styles from '/styles/Admin/Products/update.module.css';
import { prisma } from '/prisma/dbInstance.ts';
import Link from 'next/link';

export async function getServerSideProps()
{
    let orders = await prisma.order.findMany({
        orderBy: {
            CreatedAt: 'desc',
        },
        select:{
            Id:true,
            ClientFirstName: true,
            ClientLastName: true
        }
    })

    return {
        props:{
            orders: JSON.parse(JSON.stringify(orders))
        }
    }
}

const CheckOrder = ({orders}) => {
    console.log(orders);
    const {data:session} = useSession({required: true});
    if(!session)
    {
        return( // this is rendered to fix the split second before redirection where the admin page is shown while the session is missing
            <></>
        )
    }

    return ( 
        <>
        {
            orders.length > 0?
                <>
                    <div className={styles.pageTitle_holder}>
                        <h3 className={styles.pageTitle}>Commandes</h3>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className='text-center' scope="col">Client</th>
                                    <th className='text-center' scope="col">Commande</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((order) => (
                                        <tr key={order.Id}>
                                            <td className='text-center'>{order.ClientFirstName+" "+order.ClientLastName}</td>
                                            <td className={styles.consultText}>
                                                <Link
                                                    href={{
                                                        pathname: '/Admin/forms/orders/view',
                                                        query: {Id: order.Id}
                                                    }}
                                                >
                                                    Consulter
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table> 
                    </div>
                </>
            :
                <p className={styles.error}>Pas de Commandes disponibles à ce moment !!</p>
        } 
        </>
    );
}
 
export default CheckOrder;
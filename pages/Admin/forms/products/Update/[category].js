import {useSession} from 'next-auth/react';
import styles from '../../../../../styles/Admin/Products/update.module.css';
import {useRouter} from "next/router";
import Image from 'next/image';
import { prisma } from '../../../../../prisma/dbInstance.ts';

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

const UpdateCategoryProducts = ({catTitle, catProducts}) => {

    let router = useRouter();
    let RouteToEditPage = (product) => {
       router.push({
        pathname: router.pathname.replace('[category]','')+'product/'+product.Id,
        })
    }
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
                catProducts.length > 0?
                    <>
                        <div className={styles.pageTitle_holder}>
                            <h3 className={styles.pageTitle}>{catTitle}</h3>
                        </div>
                        <div className={styles.table_responsive}>
                            <table className={styles.table}>
                                <thead className={styles.thead}>
                                    <tr className={styles.tr}>
                                        <th className={styles.th} scope="col">Titre</th>
                                        <th className={styles.th} scope="col">Stock</th>
                                        <th className={styles.th} scope="col">Modifier</th>
                                    </tr>
                                </thead>
                                <tbody className={styles.tbody}>
                                    {
                                        catProducts.map((product) => (
                                            <tr key={product.Id} className={styles.tr}>
                                                <td className={styles.td}>{product.Title}</td>
                                                <td className={styles.td}>{product.Stock}</td>
                                                <td className={styles.flex_container}><Image src="/edit.svg" alt="modifier" width={20} height={40} onClick={()=>RouteToEditPage(product)} /></td>
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
 
export default UpdateCategoryProducts;
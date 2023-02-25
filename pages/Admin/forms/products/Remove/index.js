import {useSession} from 'next-auth/react';
import { prisma } from '../../../../../prisma/dbInstance.ts';
import styles from "../../../../../styles/Admin/Products/remove.module.css";
import { useRouter } from 'next/router';
import SearchBar from '../../../../../components/searchBar';

export async function getServerSideProps()
{
    let products = await prisma.product.findMany();
    let categories = await prisma.category.findMany();
    return{
        props:{
            products,categories
        }
    } 
}

const RemoveProduct = ({products,categories}) => {
    let router = useRouter();
    const {data:session} = useSession({required: true});
    
    if(!session)
    {
        return( // this is rendered to fix the split second before redirection where the admin page is shown while the session is missing
            <></>
        )
    }

    return ( 
        <>
            <div className={styles.pageTitle_holder}>
                <h3 className={styles.pageTitle}>Supprimer produits</h3>
            </div>
            <p className={styles.title}>Séléctionner une catégorie</p>
            {   categories?
                <div className={styles.catBox}>
                    {categories.map(cat => (    
                        <button key={cat.Id} className={[styles.center,styles.submit].join(' ')}
                            onClick={()=>router.push(router.pathname+"/"+encodeURIComponent(cat.Title))}
                        >{cat.Title}</button>                    
                    )) }
                </div>
                :
                ""
            }
            <p className={[styles.semi_title, styles.title].join(' ')}>Ou</p>
            <SearchBar products={products}/>
        </>
    );
}
 
export default RemoveProduct;
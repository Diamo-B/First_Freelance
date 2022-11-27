import {useSession} from 'next-auth/react';
import {PrismaClient} from "@prisma/client";
import styles from "/styles/Admin/Products/remove.module.css";
import { useRouter } from 'next/router';
import Link from "next/link";
import SearchBar from '/components/searchBar';

export async function getServerSideProps()
{
    let prisma = new PrismaClient();
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
            <p className={styles.title}>Séléctionner une catégorie</p>
            {   categories?
                <div className={styles.catBox}>
                    {categories.map(cat => (
                        
                        <Link className={styles.center} key={cat.Id} href={router.pathname+"/"+encodeURIComponent(cat.Title)}>
                            <button className={styles.submit}>{cat.Title}</button>
                        </Link>
                    
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
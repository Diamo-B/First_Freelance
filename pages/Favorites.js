import ShowCase from '../components/showcase/ProductsShowcase';
import { prisma } from '../prisma/dbInstance.ts';

export async function getServerSideProps(){
    let products = await prisma.product.findMany({
        where:{
            Favorite: true
        },
        include:{
            Thumbnails: true
        }
    });
    
    return {
        props: {
          products,
        },
      }
}

const Favorites = ({products}) => {
   return(
        <ShowCase products={products} />
   );
}
 
export default Favorites;
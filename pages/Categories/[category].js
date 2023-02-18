import ShowCase from "../../components/showcase/ProductsShowcase.js";
//prisma
import { prisma } from '/prisma/dbInstance.ts';

export async function getServerSideProps(context) {

  const catname = context.params.category;

  let products = await prisma.product.findMany({
      where:{
        Category:{
          Title:{
            contains: catname
          }
        }
      },
      include:{
        Thumbnails: true
      }
  })

  return {
    props: {
      products,
      catname
    },
  }
}

const Category = ({products}) => {
  return (
    <ShowCase products={products}/>
  );
}
export default Category; 


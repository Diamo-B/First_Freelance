import CatPageNav from '../navbars/Navbar2'
import Footer from "../Footer";
import {useRouter} from 'next/router';
import Head from 'next/head';

const CategoryLayout = ({children}) => {
  let router =new useRouter();

  return (
    <>
    <Head>
      <title>LoremIpsum.com | {router.query.category}</title>      
    </Head> 
    <div className='body'> 
        <CatPageNav category={router.query.category}/>
        <main>
          {children}
        </main>
        <Footer/>
    </div>
    </>
  );
};

export default CategoryLayout;
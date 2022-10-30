import CatPageNav from './Navbar2'
import Footer from "./Footer";
import Head from 'next/head';
import {useRouter} from 'next/router';

const CategoryLayout = ({children}) => {
  let router =new useRouter();

  return (
    <>
    <Head>
      <title>LoremIpsum.com | {router.query.category}</title>
    </Head> 
    <div>
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

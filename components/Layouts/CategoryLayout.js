import CatPageNav from '../navbars/Navbar2'
import Footer from "../Footer";
import {useRouter} from 'next/router';
import { useState,useEffect } from 'react';
import Head from 'next/head';
import useBetterMediaQuery from "/components/useBetterMediaQuery";
import CategoryNav from '/components/navbars/browser/categoryNav'

const CategoryLayout = ({children}) => {
  let router =new useRouter();
  let [searchData,setSearchData] = useState(null);
  const isMobile = useBetterMediaQuery('(max-width: 500px)');

  useEffect(() => {
    fetch("/api/products/getProducts/getAllProducts",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => {
      setSearchData(data)
    })
  }, []);

  return (
    <>
    <Head>
      <title>LoremIpsum.com | {router.query.category}</title>      
    </Head> 
    <div className='body'> 
        {
          isMobile?
            <CatPageNav category={router.query.category} searchData={searchData}/>
          :
          <>
            <CategoryNav category={router.query.category} searchData={searchData}/>
          </>
        }
        <main>
          {children}
        </main>
    </div>
    <Footer/>
    </>
  );
};

export default CategoryLayout;

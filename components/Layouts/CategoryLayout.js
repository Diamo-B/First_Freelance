import CatPageNav from '../navbars/Navbar2'
import Footer from "../Footer";
import {useRouter} from 'next/router';
import { useState,useEffect } from 'react';
import Head from 'next/head';

const CategoryLayout = ({children}) => {
  let router =new useRouter();
  let [searchData,setSearchData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/products/getAllProducts",{
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
        <CatPageNav category={router.query.category} searchData={searchData}/>
        <main>
          {children}
        </main>
        <Footer/>
    </div>
    </>
  );
};

export default CategoryLayout;

import Image from "next/image";
import Link from "next/link";
import Styles from '../../../styles/Admin/Products/remove.module.css'
import ProductSearchBar from "../../productsSearchBar";

const CatPageNav = ({category,searchData}) => {
  return (
    <nav className={Styles.relative}>
      <Link href="/"><Image className="goBack" src="/goBack.svg" alt="back" width={37} height={38}/></Link>
      <div className="top">
        <Link href="/"><Image className="navLogo" src="/mido7-logo.jpg" alt="logo" width={60} height={60} /></Link>
      </div>
      <ProductSearchBar searchData={searchData}/>
      {category && 
      <div className="categories-box">
        <div className="categories nav2">
          <a>{category}</a>
        </div>
      </div>
      }
    </nav>
  );
};

export default CatPageNav;

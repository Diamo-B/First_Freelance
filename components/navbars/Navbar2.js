import Image from "next/image";
import Link from "next/link";


const CatPageNav = ({category}) => {
  return (
    <nav>
    <Link href="/"><Image className="goBack" src="/goBack.svg" alt="back" width={37} height={38}/></Link>
      <div className="top">
        <Link href="/"><Image className="navLogo" src="/logo.svg" alt="logo" width={60} height={60} /></Link>
      </div>
      <div className="search">
        <input type="text" placeholder="Rechercher un produit" />
      </div>
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

import Image from "next/image";
import Link from "next/link";
import Styles from '/styles/Admin/Products/remove.module.css'
import ProductSearchBar from "/components/productsSearchBar";

const Navbar = ({setIsActive, isActive,searchData}) => {
    const changeMenuState = () => {
        setIsActive(!isActive);
    }
    return ( 
        <nav className={Styles.relative}>
            <div className="top">
                <Image className="menuIcon" onClick={changeMenuState} src="/menuicon.svg" alt="menu" width={25} height={18.94}/>
                <Link href="/"><Image className="navLogo" src="/VIP7-logo.svg" alt="logo" width={60} height={60}/></Link>
                <Link href="/Cart"><Image src="/cart.svg" alt="cart" width={27.06} height={20.5}/></Link>
            </div>
            <ProductSearchBar searchData={searchData}/>
            <div className="categories-box">
                <div className="categories">
                    <Link href='/Categories/Electroniques'>Electroniques</Link>
                    <Link href='/Categories/Cosmétiques'>Cosmétiques</Link>
                    <Link href='/Categories/Cuisine'>Cuisine</Link>
                    <Link href='/Categories/Divers'>Divers</Link>
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;
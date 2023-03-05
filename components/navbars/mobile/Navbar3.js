import Image from "next/image";
import Link from "next/link";
import Styles from '../../../styles/Admin/Products/remove.module.css'
import ProductSearchBar from "../../productsSearchBar";


const DetailPageNav = ({setIsActive, isActive, searchData}) => {
    const changeMenuState = () => {
        setIsActive(!isActive);
    }
    
    return ( 
        <nav className={Styles.relative}>
            <div className="top">
                <Image className="menuIcon" onClick={changeMenuState} src="/menuicon.svg" alt="menu" width={25} height={18.94}/>
                <Link href="/"><Image className="navLogo" src="/mido7-logo.jpg" alt="logo" width={60} height={60}/></Link>
                <Link href="/Cart"><Image src="/cart.svg" alt="cart" width={27.06} height={20.5}/></Link>
            </div>
            <ProductSearchBar searchData={searchData}/>
        </nav>
    );
};

export default DetailPageNav;

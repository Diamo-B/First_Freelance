import Image from "next/image";
import Link from "next/link";

const DetailPageNav = ({setIsActive, isActive}) => {
    const changeMenuState = () => {
        setIsActive(!isActive);
    }


    return ( 
        <nav>
            <div className="top">
                <Image onClick={changeMenuState} src="/menuicon.svg" alt="menu" width={25} height={18.94}/>
                <Link href="/"><Image src="/logo.svg" alt="logo" width={60} height={60}/></Link>
                <Image src="/cart.svg" alt="cart" width={27.06} height={20.5}/>
            </div>
            <div className="search">
                <input type="text" placeholder="Rechercher un produit"/>
            </div>
        </nav>
    );
};

export default DetailPageNav;

import Image from "next/image";
import Link from "next/link";


const Navbar = ({setIsActive, isActive}) => {
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
            <div className="categories-box">
                <div className="categories">
                    <Link href='/Categories/Nouriture'>Nouriture</Link>
                    <Link href='/Categories/Cosmétiques'>Cosmétiques</Link>
                    <Link href='/Categories/Cuisine'>Cuisine</Link>
                    <Link href='/Categories/Divers'>Divers</Link>
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;
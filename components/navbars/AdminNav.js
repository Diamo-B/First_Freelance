import Image from "next/image";
import Link from "next/link";

const AdminNav = ({setIsActive, isActive}) => {
    const changeMenuState = () => {
        setIsActive(!isActive);
    }
    
    return ( 
        <nav>
            <div className="top">
                <Image onClick={changeMenuState} src="/menuicon.svg" alt="menu" width={25} height={18.94}/>
                <Link href="/"><Image className="navLogo" src="/logo.svg" alt="logo" width={60} height={60}/></Link>
                <Link href="/Cart"><Image src="/cart.svg" alt="cart" width={27.06} height={20.5}/></Link>
            </div>
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
 
export default AdminNav;
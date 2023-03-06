import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/Admin/index.module.css"

const AdminNav = ({setIsActive, isActive}) => {
    const changeMenuState = () => {
        setIsActive(!isActive);
    }
    
    return ( 
        <nav className={styles.noMb}>
            <div className="top">
                <Image className="menuIcon" onClick={changeMenuState} src="/menuicon.svg" alt="menu" width={25} height={18.94}/>
                <Link href="/"><Image className="navLogo" src="/mido7-logo.jpg" alt="logo" width={60} height={60}/></Link>
                <Link href="/Cart"><Image src="/cart.svg" alt="cart" width={27.06} height={20.5}/></Link>
            </div>
            <div className="categories-box">
                <div className="categories">
                    <Link href='/Categories/Cheveux'>Cheveux</Link>
                    <Link href='/Categories/Visage'>Visage</Link>
                    <Link href='/Categories/Parfums'>Parfums</Link>
                    <Link href='/Categories/Para'>Para</Link>
                </div>
            </div>
        </nav>
    );
}
 
export default AdminNav;
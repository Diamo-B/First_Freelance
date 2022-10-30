import Link from "next/link"; 
const Menu = ({isActive, setIsActive}) => {
    return ( 
        <div className={isActive? "Menu-active" : "Menu-hidden"}> {/* The menu panel */}
            <img className="closeButton" onClick={()=>setIsActive(false)} src="/close.svg" alt="close button" />
            <div className="categories menuCats">
                <Link href='/Categories/Nouriture'>Nouriture</Link>
                <Link href='/Categories/Cosmétiques'>Cosmétiques</Link>
                <Link href='/Categories/Cuisine'>Cuisine</Link>
                <Link href='/Categories/Divers'>Divers</Link>
            </div>
        </div>
    );
}
 
export default Menu;
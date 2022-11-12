import Link from "next/link"; 
/* import { useRouter } from "next/router"; */
const Menu = ({isActive, setIsActive}) => {
   /*  const router = useRouter(); */
    return ( 
        <div className={isActive? "Menu-active" : "Menu-hidden"}> {/* The menu panel */}
            <img className="closeButton" onClick={()=>setIsActive(false)} src="/close.svg" alt="close button" />
            <div className="categories menuCats">
                <Link className="cat" href='/Categories/Electroniques'>Electroniques</Link>
                <Link className="cat" href='/Categories/Cosmétiques'>Cosmétiques</Link>
                <Link className="cat" href='/Categories/Cuisine'>Cuisine</Link>
                <Link className="cat" href='/Categories/Divers'>Divers</Link>
                {/* <button onClick={()=>router.push('/api/auth/signin')}>Administration panel</button> */}
            </div>
        </div>
    );
}
 
export default Menu;
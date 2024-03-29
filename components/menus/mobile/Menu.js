import Link from "next/link"; 
import { useRouter } from "next/router";
import {signOut} from 'next-auth/react';
import Image from 'next/image';

const Menu = ({isActive, setIsActive, isAdmin}) => {
   const router = useRouter();
    return ( 
        <div className={isActive? "Menu-active" : "Menu-hidden"}> {/* The menu panel */}
            <Image className="closeButton" onClick={()=>setIsActive(false)} src="/close.svg" alt="close button" width={15} height={30}/>
            <div className="categories menuCats">
                <Link href='/Categories/Electroniques'>Electroniques</Link>
                <Link href='/Categories/Cosmétiques'>Cosmétiques</Link>
                <Link href='/Categories/Cuisine'>Cuisine</Link>
                <Link href='/Categories/Para'>Para</Link>
                {
                    isAdmin?
                    <div className="AdminAccessPart">
                        <button className="AdminAccessButton" onClick={()=>router.push('/api/auth/signin')}>Admin</button>
                        <button className="AdminAccessButton" onClick={()=>signOut({ callbackUrl: 'http://localhost:3000' })}>SignOut</button>
                    </div>
                    :
                    <button className="AdminAccessButton" onClick={()=>router.push('/api/auth/signin')}>Admin</button>
                }
            </div>
        </div>
    );
}
 
export default Menu;
import Footer from "./Footer";
import DetailPageNav from './Navbar3';
import { useState } from "react";
import Menu from "./Menu";

const DetailsLayout = ({children}) => {
    const [isActive, setIsActive] = useState(false);

    return ( 
        <div>
            <Menu isActive={isActive} setIsActive={setIsActive}/>
            <DetailPageNav isActive={isActive} setIsActive={setIsActive}/>
            <main>
            {children}
            </main>
            <Footer/>
        </div>
    );
}
 
export default DetailsLayout;
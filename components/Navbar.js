import Image from "next/image";

const Navbar = () => {
    return ( 
        <nav>
            <div className="top">
                <Image src="/menuicon.svg" alt="menu" width={25} height={18.94}/>
                <Image src="/logo.svg" alt="logo" width={60} height={60}/>
                <Image src="/cart.svg" alt="cart" width={27.06} height={20.5}/>
            </div>
            <div className="search">
                <input type="text" placeholder="Rechercher un produit"/>
            </div>
            <div className="categories-box">
                <div className="categories">
                    <a>Nouriture</a>
                    <a>Cosmétiques</a>
                    <a>Cuisine</a>
                    <a>Divers</a>
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;
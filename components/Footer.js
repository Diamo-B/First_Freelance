import Image from "next/image";
import Link from "next/link";
import useBetterMediaQuery from "/components/useBetterMediaQuery";

const Footer = () => {
    const isMobile = useBetterMediaQuery('(max-width: 500px)');
    return ( 
        <footer>
            <div className="DesktopFooter">
                <div className="Footerlogo">
                    <Image src="/logo.svg" alt="logo" width={38.8} height={40}/>
                    <p>LoremIpsum.com</p>
                </div>
                {
                    ! isMobile &&
                    <div className="categories">
                        <Link href='/Categories/Electroniques'>Electroniques</Link>
                        <Link href='/Categories/Cosmétiques'>Cosmétiques</Link>
                        <Link href='/Categories/Cuisine'>Cuisine</Link>
                        <Link href='/Categories/Divers'>Divers</Link>
                    </div>
                } 
                <div className="Sm-wrapper">
                    <p className="text">
                    Veuillez suivez nos pages sur les platformes du social media pour toutes sortes d&apos;actualités
                    </p>
                    <div className="social-media">
                        <a href=""><Image src="/facebook.svg" width={25} height={25} alt="facebook"/></a>
                        <a href=""><Image src="/instagram.svg" width={25} height={25} alt="instagram"/></a>
                        <a href=""><Image src="/whatsapp.svg" width={25} height={25} alt="whatsapp"/></a>
                        <a href=""><Image src="/tiktok.svg" width={25} height={25} alt="tiktok"/></a>
                    </div>
                </div>
            </div>
            <p className="Copyright">Copyright 2022 .All rights Reserved</p>
        </footer>
    );
}
 
export default Footer;
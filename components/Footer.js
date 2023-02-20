import Image from "next/image";
import Link from "next/link";
import useBetterMediaQuery from "/components/useBetterMediaQuery";

const Footer = () => {
    const isMobile = useBetterMediaQuery('(max-width: 500px)');
    return ( 
        <footer>
            <div className="DesktopFooter">
                <div className="Footerlogo">
                    <Image src="/VIP7-logo.svg" alt="logo" width={100} height={100}/>
                </div>
                {
                    ! isMobile &&
                    <div className="categories">
                        <Link href='/Categories/Cheveux'>Cheveux</Link>
                        <Link href='/Categories/Visage'>Visage</Link>
                        <Link href='/Categories/Parfums'>Parfums</Link>
                        <Link href='/Categories/Divers'>Divers</Link>
                    </div>
                } 
                <div className="social-media">
                    <a href=""><Image src="/facebook.svg" width={25} height={25} alt="facebook"/></a>
                    <a href=""><Image src="/instagram.svg" width={25} height={25} alt="instagram"/></a>
                    <a href=""><Image src="/whatsapp.svg" width={25} height={25} alt="whatsapp"/></a>
                    <a href=""><Image src="/tiktok.svg" width={25} height={25} alt="tiktok"/></a>
                </div>

            </div>
            <div className="telFooter">
                <Image src="/telFooter.svg" alt="Phone Icon" width={20} height={20}/>
                <span>0606060660</span>
            </div>
        </footer>
    );
}
 
export default Footer;
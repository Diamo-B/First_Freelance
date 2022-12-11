import Image from "next/image";

const Footer = () => {
    return ( 
        <footer>
            <div className="Footerlogo">
                <Image src="/logo.svg" alt="logo" width={38.8} height={40}/>
                <p>LoremIpsum.com</p>
            </div>
            <p className="text">
            Veuillez suivez nos pages sur les platformes du social media pour toutes sortes d&apos;actualités en cliquant sur une des boutons ci-dessous
            </p>
            <div className="social-media">
                <a href=""><Image src="/facebook.svg" width={25} height={25} alt="facebook"/></a>
                <a href=""><Image src="/instagram.svg" width={25} height={25} alt="instagram"/></a>
                <a href=""><Image src="/whatsapp.svg" width={25} height={25} alt="whatsapp"/></a>
                <a href=""><Image src="/tiktok.svg" width={25} height={25} alt="tiktok"/></a>
            </div>
            <p className="Copyright">
            Copyright 2022 .All rights Reserved
            </p>
        </footer>
    );
}
 
export default Footer;
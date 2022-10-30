import Image from "next/image";

const Footer = () => {
    return ( 
        <footer className="body">
            <div className="Footerlogo">
                <Image src="/logo.svg" alt="logo" width={38.8} height={40}/>
                <p>LoremIpsum.com</p>
            </div>
            <p className="text">
            Veuillez suivez nos pages sur les platformes du social media pour toutes sortes d'actualités en cliquant sur une des boutons ci-dessous
            </p>
            <div className="social-media">
                <a href=""><img src='/facebook.svg'/></a>
                <a href=""><img src="/instagram.svg"/></a>
                <a href=""><img src="/whatsapp.svg"/></a>
                <a href=""><img src="/tiktok.svg"/></a>
            </div>
            <p className="Copyright">
            Copyright 2022 .All rights Reserved
            </p>
        </footer>
    );
}
 
export default Footer;
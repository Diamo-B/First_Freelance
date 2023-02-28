import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
    let router = useRouter();
    useEffect(()=>{
        setTimeout(()=>{
            router.push('/');
        },3000)
    })
    return ( 
        <div className="content error">
            <h1>Erreur 404</h1>
            <h3>La page que vous souhaitez accéder n&apos;est pas disponible</h3>
            <p>Vous allez être redirigé vers la page d&apos;acceuil dans 3s...</p>
        </div>
    );
}
 
export default NotFound;
import Head from "next/head";
import styles from "../../styles/Admin/login.module.css";
import { useState } from "react";
import {signIn,useSession} from "next-auth/react";
import { useRouter } from "next/router";


const AdminLogin = () => {
    const {data:session} = useSession();
    const router = useRouter();
    if(session)
    {
        router.push('/Admin');
    }
    const [authState, setAuthState] = useState({
        username: '',
        password: ''
    })
    const handleFieldChange = (e) => {
        setAuthState(old => ({ ...old, [e.target.id]: e.target.value }))
    }

    const [error,setError] = useState(null);

    const handleAuth = async () => {
        signIn('credentials', {
            ...authState,
            redirect: false
        }).then(({ ok, error }) => {
            if (ok) {
                setError(null);
                window.location.replace('/Admin');
            } else {
                setError("nom d'utilisateur ou mot de passe incorrectes");
            }
        })
    }
    return ( 
        <>
            <Head>
                <title>Mido7.ma | Admin | Login</title>
            </Head>

                <div className={[styles.flex_column,styles.container].join(' ')}>
                    {
                        error?<p className={styles.LoginError}>{error}</p>:<span></span>
                    }
                    <label htmlFor="Login" className={styles.labels}>Login</label>

                    <input type="text" onChange={handleFieldChange} value={authState.username}  id='username' className={styles.Login} required />


                    <label htmlFor="pass" className={styles.labels}>Password</label>

                    <input type="Password" required onChange={handleFieldChange} value={authState.password} id='password' className={styles.pass} />

                    <button onClick={handleAuth} className={styles.connect}>Connect</button>
                </div>
            
        </>
    );
}
 
export default AdminLogin;

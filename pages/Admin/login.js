import Head from "next/head";
import styles from "../../styles/Admin/login.module.css";
import { signIn, signOut, useSession } from "next-auth/react";



const adminLogin = () => {
    const { data: session } = useSession();

    console.log("session", session);
    return ( 
        <>
            <Head>
                <title>LoremIpsum.com | Admin | Login</title>
            </Head>
            {session ? 
                <button onClick={() => signOut()}>Log out</button>
            :
                <div className={[styles.flex_column,styles.container].join(' ')}>
                    <label htmlFor="Login" className={styles.labels}>Login</label>
                    <input type="text" id="Login" name="Login" className={styles.Login} required />
                    <label htmlFor="pass" className={styles.labels}>Password</label>
                    <input type="Password" required id="pass" name="pass" className={styles.pass} />
                    <button className={styles.connect} onClick={() => {
                        let username = document.getElementById('Login').value;
                        let password = document.getElementById('pass').value;
                        signIn("credentials", { username: username, password: password })
                    }}>Connect</button>
                </div>
            }
        </>
    );
}
 
export default adminLogin;
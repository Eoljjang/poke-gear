import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from "axios"
import styles from '../styles/views/Login.module.css'
import colours from '../styles/Colours.module.css'
const dbUrl = import.meta.env.VITE_DB_URL; // Takes the db_url depending on if you're on dev or production.

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");

    // This function queries the databse and checks if the user exists before logging in.
    const handleLogin = async(e) => {
        e.preventDefault();
        const postData = {
            email: email,
            password: password
        }

        await axios.post(dbUrl+'/login', postData)
        .then(response => {
            console.log(response)
            //console.log(`User ${email} and PW ${password}`)
            const userEmail = response.data.userEmail;
            navigate(`/app?userEmail=${userEmail}`)
        })
        .catch(e => {
            // Check if e.response exists
            if (e.response) {
                console.error(e.response.data.message);  // Specific error message from the server
                setErrorMsg(e.response.data.message);
            } else {
                console.error("Error: ", e.message); // Fallback for other errors (e.g., network issues)
                setErrorMsg("An error occurred. Please try again.");
            }
            setEmail(""); // Reset email and password fields
            setPassword("");
        })

    }

    const btnSignupClick = (e) => {
        e.preventDefault();
        navigate("/signup")
    }
    return(
        <div className={styles["login-page"]}>
            <div className={styles.header}>
                <div className={styles['header-text']}>Welcome to Poke-Gear!</div>
                <div className={styles["subheader-text"]}>Lets get you signed in</div>
            </div>
            <div className={`${styles["login-form-container"]} ${colours["light-blue"]}`}>
                <form className={styles["login-form"]} action="" method="POST" onSubmit={handleLogin}>
                    <div className={styles["input-container"]}>
                        <label htmlFor="email">Email:</label>
                        <input type="text" value={email} placeholder="Enter Email" name="email" onChange={(e) => setEmail(e.target.value)}required/>
                    </div>

                    <div className={styles["input-container"]}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" value={password} placeholder="Enter Password" name="password" onChange={(e) => setPassword(e.target.value)}required/>
                    </div>

                    {errorMsg &&(
                        <div className={styles["error-msg"]}>{errorMsg}</div> // display error msg if any when trying to log in.
                    )}
                    <button type="submit" id={styles["login-btn"]}>Login</button>
                </form>
            </div>

            <div className={styles["signup-container"]}>
                <h3>No Account?</h3>
                <button id={`${styles["navigate-signup-btn"]}`} className={colours["light-blue"]} onClick={btnSignupClick}>Signup</button>
                <a target="_blank"href="https://github.com/Eoljjang/poke-gear">SOURCE CODE</a>
                <a  target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScFrNA2vyXdRFx8MY1VdoDZtaKC2A6DeRRzlND4tPj17URP0w/viewform?usp=sharing">FEEDBACK FORM</a>
            </div>


        </div>
    )
}

export default Login

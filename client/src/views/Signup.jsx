import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import styles from "../styles/views/Signup.module.css"
const dbUrl = import.meta.env.VITE_DB_URL; // Takes the db_url depending on if you're on dev or production.

function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const postCreateUser = async() => {
        const postData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        }

        await axios.post(dbUrl+"/signup", postData)
        .then(response => {
            navigate("/"); /* Which defaults back to /login. We can't expicitly send user to /login on render since it blocks url jumps.*/
            console.log(response.data.message);

        })
        .catch(e => {
            // Check if e.response exists before accessing it
            if (e.response) {
                console.error(e.response.data.message);  // Specific error message from the server
                setErrorMsg(e.response.data.message);  // Display error to the user
            } else {
                console.error("Error: ", e.message);  // General error message for network or other issues
                setErrorMsg("An error occurred. Please try again.");
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postCreateUser()

    }

    const handleReturn = (e) => { // cancel signup and go back to the login.
        e.preventDefault()
        navigate("/login")
    }

    return(
        <div className={styles["signup-page"]}>
            <form className={styles["signup-form"]} action="" method="post" onSubmit={handleSubmit}>
                <div className={styles["input-container"]}>
                    <label htmlFor="firstname">First Name:</label>
                    <input type="text" id="firstname" name="firstname"onChange={(e) => setFirstName(e.target.value)} required/>
                </div>

                <div className={styles["input-container"]}>
                    <label htmlFor="lastname">Last Name:</label>
                    <input type="text" id="lastname" name="lastname" onChange={(e) => setLastName(e.target.value)} required/>
                </div>

                <div className={styles["input-container"]}>
                    <label htmlFor="password">Set Password:</label>
                    <input type="text" id="password" name = "password" onChange= {(e) => setPassword(e.target.value)} required/>
                </div>

                <div className={styles["input-container"]}>
                    <label htmlFor="email">Set Email:</label>
                    <input type="text" id="email" name = "email" onChange= {(e) => setEmail(e.target.value)} required/>
                </div>

                <div className={styles["btn-container"]}>
                    <button className={styles["btn-return"]} onClick={handleReturn}>return to login</button>
                    <button className={styles["btn-submit"]} type="submit">Complete Signup</button>
                </div>

                {errorMsg &&(
                    <div className={styles["error-msg"]}>{errorMsg}</div>
                )}
            </form>


        </div>
    )
}

export default Signup

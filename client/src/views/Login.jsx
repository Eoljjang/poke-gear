import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from "axios"
import '../styles/views/Login.css'
//const backendURL = process.env.BACKEND_URL || "https://poke-gear.onrender.com/";

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

        await axios.post("http://localhost:4000/login", postData)
        .then(response => {
            console.log(response)
            console.log(`User ${email} and PW ${password}`)
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
        <div className="login-page">
            <div className="header">
                <div className="header-text">Welcome to Poke-Gear!</div>
                <div className="subheader-text">Lets get you signed in</div>
            </div>
            <div className="login-form-container">
                <h3>Login:</h3>
                <form className="login-form" action="" method="POST" onSubmit={handleLogin}>
                    <div className="input-container">
                        <label htmlFor="email">Email:</label>
                        <input type="text" value={email} placeholder="Enter Email" name="email" onChange={(e) => setEmail(e.target.value)}required/>
                    </div>

                    <div className="input-container">
                        <label htmlFor="password">Password:</label>
                        <input type="text" value={password} placeholder="Enter Password" name="password" onChange={(e) => setPassword(e.target.value)}required/>
                    </div>

                    {errorMsg &&(
                        <div className="error-msg">{errorMsg}</div> // display error msg if any when trying to log in.
                    )}
                    <button type="submit">Login</button>
                </form>
            </div>

            <div className="signup-container">
                <h3>No Account?</h3>
                <button onClick={btnSignupClick}>Signup</button>
            </div>

        </div>
    )
}

export default Login

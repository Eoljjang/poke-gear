import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from "axios"
import '../styles/views/Login.css'


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // This function queries the databse and checks if the user exists before logging in.
    const handleLogin = async(e) => {
        e.preventDefault();
        const postData = {
            email: email,
            password: password
        }

        await axios.post("http://localhost:4000/login", postData)
        .then(response => {
            console.log(`User ${email} and PW ${password}`)
            navigate('/app')
        })
        .catch(e => {
            console.error(e)
        })

    }

    const btnSignupClick = (e) => {
        e.preventDefault();
        navigate("/signup")
    }
    return(
        <div className="login-page">

            <div className="login-form">
                <h3>Login:</h3>
                <form action="" method="POST" onSubmit={handleLogin}>
                    <label htmlFor="email">email</label>
                    <input type="text" placeholder="Enter Email" name="email" onChange={(e) => setEmail(e.target.value)}required/>

                    <label htmlFor="password">Password</label>
                    <input type="text" placeholder="Enter Password" name="password" onChange={(e) => setPassword(e.target.value)}required/>

                    <button type="submit">Login</button>
                </form>

                <h3>No Account?</h3>
                <button onClick={btnSignupClick}>Signup</button>
            </div>
        </div>
    )
}

export default Login

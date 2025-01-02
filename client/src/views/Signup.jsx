import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "../styles/views/Signup.css"
//const backendURL = process.env.BACKEND_URL || "https://poke-gear.onrender.com/";
function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const postCreateUser = async() => {
        const postData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        }

        await axios.post("http://localhost:4000/signup", postData)
        .then(console.log('success!'))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postCreateUser()
        navigate("/login")
    }

    const handleReturn = (e) => { // cancel signup and go back to the login.
        e.preventDefault()
        navigate("/login")
    }

    return(
        <div className="signup-page">
            <form className="signup-form" action="" method="post" onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="firstname">First Name:</label>
                    <input type="text" id="firstname" name="firstname"onChange={(e) => setFirstName(e.target.value)} required/>
                </div>

                <div className="input-container">
                    <label htmlFor="lastname">Last Name:</label>
                    <input type="text" id="lastname" name="lastname" onChange={(e) => setLastName(e.target.value)} required/>
                </div>

                <div className="input-container">
                    <label htmlFor="password">Set Password:</label>
                    <input type="text" id="password" name = "password" onChange= {(e) => setPassword(e.target.value)} required/>
                </div>

                <div className="input-container">
                    <label htmlFor="email">Set Email:</label>
                    <input type="text" id="email" name = "email" onChange= {(e) => setEmail(e.target.value)} required/>
                </div>

                <div className="btn-container">
                    <button className="btn-return" onClick={handleReturn}>return to login</button>
                    <button className="btn-submit" type="submit">Complete Signup</button>
                </div>
            </form>


        </div>
    )
}

export default Signup

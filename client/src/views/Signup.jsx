import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "../styles/views/Signup.css"
const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000/";
function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const postCreateUser = async () => {
        const postData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        };

        try {
            const response = await axios.post(`${backendURL}signup`, postData);
            console.log('Success:', response.data);
            navigate("/login");
        } catch (e) {
            if (e.response) {
                // The request was made, and the server responded with a status code outside 2xx
                console.error(e.response.data.message);
                setErrorMsg(e.response.data.message);
            } else if (e.request) {
                // The request was made, but no response was received
                console.error("No response received from the server.");
                setErrorMsg("Unable to reach the server. Please try again later.");
            } else {
                // Something happened while setting up the request
                console.error("Error setting up the request:", e.message);
                setErrorMsg("An unexpected error occurred. Please try again.");
            }
        }
    };

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

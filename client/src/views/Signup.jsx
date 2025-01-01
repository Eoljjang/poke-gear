import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
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

    return(
        <>
            <form action="" method="post" onSubmit={handleSubmit}>
                <label htmlFor="firstname">First Name:</label>
                <input type="text" id="firstname" name="firstname"onChange={(e) => setFirstName(e.target.value)} required/>

                <label htmlFor="lastname">Last Name:</label>
                <input type="text" id="lastname" name="lastname" onChange={(e) => setLastName(e.target.value)} required/>

                <label htmlFor="password">Set Password:</label>
                <input type="text" id="password" name = "password" onChange= {(e) => setPassword(e.target.value)} required/>

                <label htmlFor="email">Set Email:</label>
                <input type="text" id="email" name = "email" onChange= {(e) => setEmail(e.target.value)} required/>

                <button type="submit">Complete Signup</button>
            </form>
        </>
    )
}

export default Signup

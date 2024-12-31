import { useNavigate } from 'react-router-dom'
import '../styles/views/Login.css'


function Login() {
    const navigate = useNavigate();

    // This function queries the databse and checks if the user exists before logging in.
    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/app');
    }
    return(
        <div className="login-page">

            <div className="login-form">
                <form action="" method="get" onSubmit={handleLogin}>
                    <label htmlFor="uname">Username</label>
                    <input type="text" placeholder="Enter Username" name="uname" required/>

                    <label htmlFor="upass">Password</label>
                    <input type="text" placeholder="Enter Password" name="upass" required/>

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>




    )
}

export default Login

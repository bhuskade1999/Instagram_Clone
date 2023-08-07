import React, { useState, useEffect } from "react"
import "./Login.css"
import logo from "../../Assets/logo.png"
import { Link } from "react-router-dom"
import { Typography, Button } from "@mui/material"
import { loginUser } from "../../Actions/User"
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux"

const Login = () => {

    const alert = useAlert()

    const { error, loading } = useSelector((state) => state.user)
    const { message } = useSelector((state) => state.likes)


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({ type: "clearErrors" })
        }
        if (message) {
            alert.success(message)
            dispatch({ type: "clearMessage" })
        }
    }, [alert, error, message, dispatch])




    return (
        <div className="signIn">
            <div>
                <form className="login-form" onSubmit={loginHandler}>
                    <div>
                        <img className='signInLogo' src={logo} alt="signinLogo" />
                    </div>

                    <div>
                        <input type='email' name='email' id='email' placeholder='email' value={email} required onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <input type='password' name='password' id='password' placeholder='password' value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {/* <div>
                            <input type='submit'  disabled={loading} value="Sign In" id='login-btn' />
                    </div>
                    */}

                    <Button disabled={loading} type="submit" className="submit-btn"> Sign Up </Button>

                    <Link to="/register">
                        <Typography variant='h6'> new User? </Typography>
                    </Link>

                    <Link to="/forgot/password">
                        <Typography variant='h6' > Forgot Password </Typography>
                    </Link>

                </form>

            </div>

        </div>
    )
}

export default Login
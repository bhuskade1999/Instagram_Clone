import React, { useEffect, useState } from "react"
import { Typography, Button } from "@mui/material"
import "./Register.css"
import { Avatar } from "@mui/material"
import { Link } from "react-router-dom"
import { registerUser } from "../../Actions/User"
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert";

import logo from "../../Assets/logo.png"


const Register = () => {

  const [avatar, setAvatar] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const alert = useAlert()

  const { loading, error } = useSelector((state) => state.user)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file)

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result)
      }
    }

  }


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(registerUser(name, email, password, avatar))
  }


  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch({ type: "clearErrors" })
    }
  }, [dispatch, error, alert])




  return (
    <div className='signUp'>

      <form className="registerForms" onSubmit={submitHandler}>
        <img className='signUpLogo' src={logo} alt="signupLogo" />

        <Avatar src={avatar} alt="User" sx={{ height: "10vmax", width: "10vmax" }} />

        <input type="file" accept="images/**" onChange={handleImageChange} required />

        <input type="text" className="registerInput" placeholder="Enter name" value={name} required
          onChange={(e) => setName(e.target.value)} />

        <input type="email" className="registerInput" placeholder="Enter email" value={email} required
          onChange={(e) => setEmail(e.target.value)} />

        <input type="password" className="registerInput" placeholder="Enter Password" value={password}
          required onChange={(e) => setPassword(e.target.value)} />

        <Button disabled={loading} type="submit" className="submit-btn"> Sign Up </Button>

        <Link to="/">
             <Typography variant="h6"> Already Signed Up ? Login Now </Typography>
        </Link>

      </form>

    </div>
  )
}

export default Register
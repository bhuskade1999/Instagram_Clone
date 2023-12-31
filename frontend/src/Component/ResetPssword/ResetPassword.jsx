 import React, { useState ,useEffect } from "react"
 import "./ResetPassword.css"
 import {Typography,Button} from "@mui/material"
 import{useDispatch,useSelector} from "react-redux"
 import { useAlert } from "react-alert";
import { resetPassword } from "../../Actions/User";
import { Link, useParams } from "react-router-dom";

const ResetPassword = ()=>{
const [newPassword,setNewPassword] = useState("")
const dispatch = useDispatch()
const alert = useAlert()
const params = useParams()
const {error,loading,message} = useSelector((state)=> state.likes)


    const submitHandler = (e) =>{
        e.preventDefault()
         dispatch(resetPassword(params.token,newPassword))

    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch({type:"clearErrors"})
        }
        if(message){
          alert.success(message)
          dispatch({type:"clearMessage"})
      }
    },[alert,error,message,dispatch])


    return(
        <div className = "resetPassword">
             <form className = "resetPasswordForm" onSubmit = {submitHandler}>
            <Typography variant = "h3" style={{padding:"2vmax"}}>Reset Password</Typography>

              <input type ="password" className ="resetPasswordInputs" placeholder="Enter NewPassword"
                   value ={newPassword} required onChange={(e)=>setNewPassword(e.target.value)}/>

             <Button disabled ={loading} type ="submit"> Reset Passoword </Button>

             <Link to="/">
                     <Typography variant='h6'>Login</Typography>
             </Link>

             <Link to="/forgot/password">
                    <Typography variant='h6'>Request Another Token!</Typography>
             </Link>

      </form>
        </div>
    )
}

export default ResetPassword
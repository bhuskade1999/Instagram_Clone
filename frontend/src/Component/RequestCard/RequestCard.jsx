import React from "react"
import "./RequestCard.css"
import { useDispatch } from "react-redux"
import { Link,useParams } from "react-router-dom"
import { Button, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { acceptsUserRequest, rejectsUserRequest,getUserProfile,loadUser } from "../../Actions/User"


const RequestCard = ({userId, name, avatar }) => {

    const dispatch = useDispatch()
    const params = useParams()

    const AcceptHandler = async () => {
        await dispatch(acceptsUserRequest(userId))
        await dispatch(getUserProfile(params.id))
        await dispatch(loadUser())
    }

    const RejectHandler = async () => {
        await dispatch(rejectsUserRequest(userId))
        await dispatch(getUserProfile(params.id))
        await dispatch(loadUser())
    }

    return (

        <div className="RequestUser">
                <Link to={`/user/${userId}`}>
                    <img src={avatar} alt={name} />
                    <Typography variant="h6" style={{ minwidth: "6vmax" }}> {name} </Typography>
                </Link>

                <Button style={{ backgroundColor: "blue",padding:"0px" }} onClick={AcceptHandler} >
                    <CheckIcon/>
                </Button >

                <Button id="re-btn" style={{ backgroundColor: "red",padding:"0px" }} onClick={RejectHandler}>
                    <CloseIcon/>
                </Button >
         
        </div>

    )

};


export default RequestCard
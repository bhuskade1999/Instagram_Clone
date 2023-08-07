import React from 'react';
import { Button, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "./Status.css"
import { DeleteOutline } from "@mui/icons-material";
import { loadUser } from "../../Actions/User"
import { deleteStory } from "../../Actions/Post"





const Status = ({
    storyId,
    caption,
    storyImage,
    ownerImage,
    ownerName,
    ownerId,
    isDelete
}) => {

    const dispatch = useDispatch()

    const { loading } = useSelector((state) => state.likes)



    const deleteStoryHandler = async () => {
        await dispatch(deleteStory(storyId))
        dispatch(loadUser())
    }



    return (
        <div className="status">
            <div className="statusHeader">
                <img src={ownerImage} alt="" />
                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700} style={{ color: "white" }}>{ownerName}</Typography>
                </Link>

            </div>

            {/* ------------- Post Images/Videos --------------------- */}

            {
                storyImage.endsWith(".mp4") ?
                    (
                        <video controls>
                            <source src={storyImage} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) :
                    (
                        <img src={storyImage} alt="status" />
                    )
            }


            <div className="StatusDetails">
                <div className="user-caption" style={{display:'flex'}}>
                        <Link to={`/user/${ownerId}`}>
                            <Typography fontWeight={700}>{ownerName}</Typography>
                        </Link>

                        <Typography
                            fontWeight={100}
                            color="white"
                            style={{ alignSelf: "center", color: "white" }}>{caption}
                        </Typography>

                </div>

                {
                  isDelete ? 
                    <div className="delete-btn">
                    <Button onClick={deleteStoryHandler} disabled={loading}> <DeleteOutline style={{  color: loading ? null : "red" }}  /> </Button>
                    </div>: null
                }

            </div>

        </div>
    )
}

export default Status;
import React, { useState,useEffect } from 'react';
import { Button, Dialog, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "./Status.css"
import { DeleteOutline } from "@mui/icons-material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { loadUser, storyViews } from "../../Actions/User"
import { deleteStory } from "../../Actions/Post"
import User from "../User/User"
import handleVideoEnd from "../HomeT/HomeT"

const DIALOG_DURATION = 10000; // 10 seconds in milliseconds

const Status = ({
    storyId,
    caption,
    views = [],
    storyImage,
    ownerImage,
    ownerName,
    ownerId,
    isDelete,
    isAccount
}) => {

    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.likes)
    const [viewedUser, setviewedUser] = useState((false))


    const deleteStoryHandler = async () => {
        await dispatch(deleteStory(storyId))
        dispatch(loadUser())
    }

    const viewStoryHandler = async () => {
        await dispatch(storyViews(storyId))
        dispatch(loadUser())
    }


    const [videoProgress, setVideoProgress] = useState(0);
    const [timerProgress, setTimerProgress] = useState(0);

  useEffect(() => {
    let timer;

      timer = setInterval(() => {
        setTimerProgress((prevProgress) => prevProgress + (100 / (DIALOG_DURATION / 1000)));
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
      }, DIALOG_DURATION);
    

    return () => {
      clearInterval(timer);
    };
  });




  
    
  
    const updateProgress = (event) => {
      const video = event.target;
      const progress = (video.currentTime / video.duration) * 100;
      setVideoProgress(progress);
    };
  
    return (
        <div className="status" onClick={viewStoryHandler}>
            {
                storyImage.endsWith(".mp4") ? <div className="timer">
                    <div className="timer-fill" style={{ width: `${videoProgress}%` }}></div>
                </div> :   <div className="timer">
                    <div className="timer-fill" style={{ width: `${timerProgress}%` }}></div>
                </div>
            }


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
                        <video  id="videoPlayer" controls onTimeUpdate={updateProgress}>
                            <source src={storyImage} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) :
                    (
                        <img src={storyImage}   alt="status"/>
                    )
            }


            <div className="StatusDetails">

                <div className="story-btn">
                    {
                        isAccount ?
                            <div className="delete-btn">
                                <Button onClick={() => setviewedUser(!viewedUser)}> <VisibilityOutlinedIcon /> </Button>
                            </div> : null
                    }
                    {
                        isDelete ?
                            <div className="delete-btn">
                                <Button onClick={deleteStoryHandler} disabled={loading}> <DeleteOutline style={{ color: loading ? null : "red" }} /> </Button>
                            </div> : null
                    }

                </div>


                <div className="user-caption" style={{ display: 'flex' }}>
                    <Link to={`/user/${ownerId}`}>
                        <Typography fontWeight={700}>{ownerName}</Typography>
                    </Link>

                    <Typography
                        fontWeight={100}
                        color="white"
                        style={{ alignSelf: "center", color: "white" }}>{caption}
                    </Typography>

                </div>

            </div>


            <Dialog open={viewedUser} onClose={() => setviewedUser(!viewedUser)}>
                <div className="DialogBox">
                    <Typography variant="h4"> Viewed By</Typography>
                    {
                        views.map((view) => (
                            <User
                                key={view._id}
                                userId={view._id}
                                name={view.name}
                                avatar={view.avatar.url}
                            />
                        ))
                    }
                </div>
            </Dialog>

        </div>
    )
}

export default Status;
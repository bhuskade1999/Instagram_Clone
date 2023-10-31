import React, { useState, useEffect } from 'react'
import "./ProfileCard.css"
import { Typography, Dialog, Button, Avatar } from "@mui/material"
import { Link } from "react-router-dom"
import { FiSettings } from "react-icons/fi"
import { deleteMyProfile, getMyPosts, logoutUser, loadUser } from "../../Actions/User"
import { useDispatch, useSelector } from "react-redux"
import User from "../User/User"
import RequestCard from "../RequestCard/RequestCard"
import { useNavigate } from "react-router-dom";
import { followAndUnfollowUser, getUserPosts, getUserProfile, acceptsUserRequest, rejectsUserRequest } from "../../Actions/User"
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { MdOutlinePostAdd } from "react-icons/md"

const UserProfileCard = ({
    me,
    paramsId,
    userId,
    userName,
    userImage,
    postLength,
    requests = [],
    followersLength,
    folowingLength,
    followings = [],
    followers = [],
    isAccount = false
}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [followersToggle, setFollowersToggle] = useState(false)

    const [followingToggle, setFollowingToggle] = useState(false)


    const [following, setFollowing] = useState(false)

    const [requested, setRequest] = useState(false)
    const [userRequest, setuserRequest] = useState(false)
    const [myProfile, setMyProfile] = useState(false)

    const followHandler = async () => {
        await setRequest(!requested)
        await dispatch(followAndUnfollowUser(userId))
        await dispatch(loadUser())
        await dispatch(getUserProfile(paramsId))
        //window.location.reload();
    }


    const AcceptHandler = async (e) => {
        e.preventDefault();
        await dispatch(acceptsUserRequest(paramsId))
        dispatch(getUserProfile(paramsId))
        //  dispatch(loadUser())
         //window.location.reload();

    }

    const RejectHandler = async () => {
        await dispatch(rejectsUserRequest(paramsId))
        await dispatch(getUserProfile(paramsId))
        await dispatch(loadUser())

        //window.location.reload();

    }
 





    useEffect(() => {

        if (followers) {
            for (let items of followers) {
                if (items._id === me._id) {
                    setFollowing(true)
                    break;
                } else {
                    setFollowing(false)
                }
            }

        }

        if (requests) {
            for (let items of requests) {
                if (items._id === me._id) {
                    setRequest(true)
                    break;
                } else {
                    setRequest(false)
                }
            }
        }

        if (me) {
            for (let items of me.requests) {
                if (items._id === paramsId) {
                    setuserRequest(true)
                    break;
                } else {
                    setuserRequest(false)
                }
            }
        }

        if (me._id === paramsId) {
            setMyProfile(true)
            navigate("/account")
        }


    }, [])




    return (
        <div className="center-side">
            <div className="profile-details">

                <Avatar src={userImage}
                    sx={{
                        height: "10vmax", width: "10vmax",
                        marginTop: "30px", border: "3px solid white"
                    }} alt={userName}
                />

                <div className="content">

                    <div className="user-name" style={{ display: "flex" }}>
                        <Typography style={{ fontSize: "27px", fontFamily: "revert" }}> {userName} </Typography>
                        {/* {isAccount ? <Button onClick={() => setSettingToggle(!settingToggle)}><FiSettings /></Button> : null} */}
                    </div>

                    <div className="details">
                        <div>
                            <Typography variant="h5">Posts</Typography>
                            <Typography variant="h5"  >{postLength}</Typography>
                        </div>


                        <div>
                            <button onClick={() => setFollowingToggle(!followingToggle)} style={{ backgroundColor: "#67a3dc" }}>
                                <Typography variant="h5"> Following </Typography>
                            </button>
                            <Typography variant="h5"  >{folowingLength}</Typography>
                        </div>


                        <div>
                            <button onClick={() => setFollowersToggle(!followersToggle)} style={{ backgroundColor: "#67a3dc", }}>
                                <Typography variant="h5" >Followers</Typography>
                            </button>
                            <Typography variant="h5" > {followersLength} </Typography>
                        </div>


                    </div>

                    {
                        isAccount ? null : (
                            <Button
                                variant="contained"
                                style={{ background: following || requested ? "red" : "" }}
                                onClick={followHandler}
                            >
                                {following ? "Unfollow" : requested ? "Pending" : "Follow"}

                            </Button>
                        )
                    }


                    <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)} >
                        <div className="DialogBox">
                            <Typography variant="h4"> Followers </Typography>
                            {
                                followers && followers.length > 0 ? (followers.map((follow) => (
                                    <User
                                        key={follow._id}
                                        userId={follow._id}
                                        name={follow.name}
                                        avatar={follow.avatar.url}
                                    />
                                ))) : (<Typography style={{ margin: "2vmax" }}>You have No Followers</Typography>)
                            }

                        </div>

                    </Dialog>


                    <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
                        <div className="DialogBox">
                            <Typography variant="h4"> Followings </Typography>
                            {
                                followings && followings.length > 0 ? (followings.map((follows) => (
                                    <User
                                        key={follows._id}
                                        userId={follows._id}
                                        name={follows.name}
                                        avatar={follows.avatar.url}
                                    />
                                ))) : (<Typography style={{ marin: "2vmax" }}>You Have Not following anyone</Typography>)
                            }

                        </div>

                    </Dialog>

                </div>

            </div>




            {userRequest ?
                 
                        <div className="user-requests">

                            <Typography variant='h5'><PersonAddOutlinedIcon /> <span style={{ color: "rgb(23, 201, 225)", fontSize: "1.3rem" }}> {userName} </span>  want to follow you </Typography>

                            <div>
                                <Button style={{ backgroundColor: "blue" }} onClick={AcceptHandler} >
                                    <Typography variant="contained">Accept</Typography>
                                </Button >

                                <Button id="btn1" style={{ backgroundColor: "red" }} onClick={RejectHandler}>
                                    <Typography variant="contained">Reject</Typography>
                                </Button >
                            </div>

                        </div>
            :
            <div className="posts-tag">
                <MdOutlinePostAdd />
                <Typography variant="h5"> Posts</Typography>
            </div>

                    }


        </div>
    )
}

export default UserProfileCard
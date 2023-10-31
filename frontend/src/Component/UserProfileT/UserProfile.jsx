import React, { useState, useEffect } from 'react'
import "./UserProfile.css"
import { Typography, Dialog, Button, Avatar } from "@mui/material"
import { MdOutlinePostAdd } from "react-icons/md"
import { followAndUnfollowUser, getUserPosts, getUserProfile, loadUser, acceptsUserRequest, rejectsUserRequest } from "../../Actions/User"
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert";
import Post from "../Post/Post";
import User from "../User/User"
import Loader from "../Loader/Loader"
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import {createChat} from "../../Actions/Chat"
 

const UserProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const params = useParams()
    

    const { user, loading: userLoading, error: userError, } = useSelector((state) => state.userProfile);
    const { user: me,loading } = useSelector((state) => state.user)
    const { error, posts } = useSelector((state) => state.userPosts)
    const { error: followError, message, loading: followLoading } = useSelector((state) => state.likes);

    const [followersToggle, setFollowersToggle] = useState(false)
    const [followingToggle, setFollowingToggle] = useState(false)
    const [following, setFollowing] = useState(false)

    const [requested, setRequest] = useState(false)
    const [userRequest, setuserRequest] = useState(false)
    const [myProfile, setMyProfile] = useState(false)


    const followHandler = async () => {
        await setRequest(!requested)
        await dispatch(followAndUnfollowUser(user._id))
        dispatch(loadUser())
        dispatch(getUserProfile(params.id))
        //window.location.reload();
    }



    const chatHnadler = async()=>{
        const data = {
            senderId :me._id,
            receiverId:params.id
        }

        await dispatch(createChat(data))
        //alert.success("Chat Created Successfully")
        navigate("/chat")

        
    }

    const AcceptHandler = async () => {
          await dispatch(acceptsUserRequest(params.id))
          window.location.reload();
    }


    const RejectHandler = async () => {
           dispatch(rejectsUserRequest(params.id))
           window.location.reload();
    }


    useEffect(() => {
        dispatch(loadUser())
        dispatch(getUserProfile(params.id))
        dispatch(getUserPosts(params.id))
    }, [me._id, params.id, dispatch])


    useEffect(() => {
        if (user) {
            for (let items of user.followers) {
                if (items._id === me._id) {
                    setFollowing(true)
                    break;
                } else {
                    setFollowing(false)
                }
            }
        }


        if (user) {
            for (let items of user.requests) {
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
                if (items._id === params.id) {
                    setuserRequest(true)
                    break;
                } else {
                    setuserRequest(false)
                }
            }
        }

        if (me._id === params.id) {
            setMyProfile(true)
            navigate("/account")
        }

    }, [me, user, me._id, params.id, me.requests, navigate])


  


    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({ type: "clearErrors" })
        }
        if (followError) {
            alert.error(followError)
            dispatch({ type: "clearErrors" })
        }
        if (userError) {
            alert.error(userError)
            dispatch({ type: "clearErrors" })
        }
        if (message) {
            alert.success(message)
            dispatch({ type: "clearMessage" })
        }
    }, [alert, error, message, followError, userError, dispatch])

    return (
    //  loading || userLoading === true ? <Loader /> : (

        <div className="account-item">
            <div className="center-side">

                {
                    user && (

                        <div className="profile-details">

                            <Avatar src={user.avatar.url}
                                sx={{
                                    height: "10vmax", width: "10vmax",
                                    marginTop: "30px", border: "3px solid white"
                                }} alt={user.name}
                            />

                            <div className="content">

                                <div className="user-name" style={{ display: "flex" }}>
                                    <Typography style={{ fontSize: "27px", fontFamily: "revert" }}> {user.name} </Typography>

                                </div>

                                <div className="details">
                                    <div>
                                        <Typography variant="h5">Posts</Typography>
                                        <Typography variant="h5"  >{user.posts.length}</Typography>
                                    </div>


                                    <div>
                                        <button onClick={() => setFollowingToggle(!followingToggle)} style={{ backgroundColor: "blue", padding: "5px 5px", fontSize: "1rem", fontWeight: "700" }}>
                                            <Typography variant="contained" style={{ color: "white" }}> Following </Typography>
                                        </button>
                                        <Typography variant="h5"  >{user.following.length}</Typography>
                                    </div>


                                    <div>
                                        <button onClick={() => setFollowersToggle(!followersToggle)} style={{ backgroundColor: "blue", padding: "5px 5px", fontSize: "1rem", fontWeight: "700" }}>
                                            <Typography variant="contained" style={{ color: "white" }} >Followers</Typography>
                                        </button>
                                        <Typography variant="h5" > {user.followers.length} </Typography>
                                    </div>

                                </div>

                                {
                                    myProfile ? null : (
                                       <>
                                       
                                       <Button
                                            variant="contained"
                                            style={{ background: following || requested ? "red" : "" }}
                                            onClick={followHandler}
                                            disabled={followLoading}
                                        >
                                            {following ? "Unfollow" : requested ? "Pending" : "Follow"}

                                        </Button> 

                                        <Button variant="contained"
                                        style={{marginLeft:"20px"}}
                                        onClick={chatHnadler}                          
                                        >
                                             Message</Button>
                                       
                                       
                                       </>

                                        
                                    )
                                }

                            </div>

                        </div>

                    )

                }



                <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
                    <div className="DialogBox">
                        <Typography variant="h4"> Followers </Typography>
                        {
                            user && user.followers.length > 0 ? (user.followers.map((follow) => (
                                <User
                                    key={follow._id}
                                    userId={follow._id}
                                    name={follow.name}
                                    avatar={follow.avatar.url}
                                />
                            ))) : (<Typography style={{ margin: "2vmax" }}>You Have No Followers</Typography>)
                        }

                    </div>

                </Dialog>


                <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
                    <div className="DialogBox">
                        <Typography variant="h4"> Followings </Typography>
                        {
                            user && user.following.length > 0 ? (user.following.map((follows) => (
                                <User
                                    key={follows._id}
                                    userId={follows._Id}
                                    name={follows.name}
                                    avatar={follows.avatar.url}
                                />
                            ))) : (<Typography style={{ marin: "2vmax" }}>You Have Not following anyone</Typography>)
                        }

                    </div>

                </Dialog>


                {userRequest ?
                    <div className="user-requests">
                        {user && <Typography variant='h5'><PersonAddOutlinedIcon /> <span style={{ color: "rgb(23, 201, 225)", fontSize: "1.3rem" }}> {user.name} </span>  want to follow you </Typography>}

                        <div>
                            <Button style={{ backgroundColor: "blue" }} onClick={AcceptHandler} >
                                <Typography variant="contained">Accept</Typography>
                            </Button >

                            <Button id="btn1" style={{ backgroundColor: "red" }} onClick={RejectHandler}>
                                <Typography variant="contained">Reject</Typography>
                            </Button >
                        </div>


                    </div> :
                    <div className="posts-tag">
                        <MdOutlinePostAdd />
                        <Typography variant="h5"> Posts</Typography>
                    </div>

                }


                <div className="my-posts">
                    {following ?
                        posts && posts.length > 0 ? posts.map(post => (
                            <Post
                                key={post._id}
                                ownerName={post.owner.name}
                                postId={post._id}
                                caption={post.caption}
                                postImage={post.image.url}
                                likes={post.likes}
                                comments={post.comments}
                                ownerImage={post.owner.avatar.url}
                                ownerId={post.owner._id}
                            />
                        )) : <div className="no-post-msg">
                            <CameraAltOutlinedIcon />
                            <Typography variant="h5">No Shared Posts</Typography>
                        </div> : <Typography variant="h5" style={{ marginTop: "50px" }}>Please Follow User To View Posts</Typography>
                    }
                </div>

            </div>


        </div>


    )
}

export default UserProfile
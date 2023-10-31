import React, { useState, useEffect } from 'react'
// import "./SavedPost.css"
import { Typography, Dialog, Button, Avatar } from "@mui/material"
import { Link } from "react-router-dom"
import { FiSettings } from "react-icons/fi"
import { AiFillDelete, AiOutlineLogout, AiOutlineUsergroupAdd } from "react-icons/ai"
import { RiLockPasswordFill } from "react-icons/ri"
import { FaUserEdit } from "react-icons/fa"
import { MdOutlinePostAdd } from "react-icons/md"
import { deleteMyProfile, getMyPosts, logoutUser, loadUser, getMySavedPosts } from "../../Actions/User"
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert";
import Post from "../Post/Post";
import User from "../User/User"
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import RequestCard from "../RequestCard/RequestCard"
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';



const SavedPost = () => {
    // const [tab, setTab] = useState(window.location.pathname)
    const [settingToggle, setSettingToggle] = useState(false)

    const dispatch = useDispatch()

    const [tab, setTab] = useState(window.location.pathname)

    const alert = useAlert()

    const { user } = useSelector((state) => state.user)

    const { error, savedPost } = useSelector((state) => state.myPosts)

    const { error: likeError, message, loading: deleteLoading } = useSelector((state) => state.likes);

    const [followersToggle, setFollowersToggle] = useState(false)

    const [followingToggle, setFollowingToggle] = useState(false)

    const [requestToggle, setRequestToggle] = useState(false)


    const logoutHandler = async () => {
        if (window.confirm("Do you really want to Logout this session ?")) {
            await dispatch(logoutUser())
            alert.success("logged out Successfully")
        }
    }

    const deleteProfileHandler = async () => {
        if (window.confirm("Do you really want to delete your account ?")) {
            await dispatch(deleteMyProfile())
            dispatch(logoutUser())
        }
    }

    useEffect(() => {
        dispatch(getMySavedPosts())
        dispatch(loadUser())
    }, [dispatch])




    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({ type: "clearErrors" })
        }
        if (likeError) {
            alert.error(likeError)
            dispatch({ type: "clearErrors" })
        }
        if (message) {
            alert.success(message)
            dispatch({ type: "clearMessage" })
        }
    }, [alert, error, message, likeError, dispatch])



    // return userLoading === true ? <Loader /> : (
    return (
        <div className="account-item">
            <div className="center-side">
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
                            <Button onClick={() => setSettingToggle(!settingToggle)}><FiSettings /></Button>
                        </div>

                        <div className="details">
                            <div>
                                <Typography variant="h5">Posts</Typography>
                                <Typography variant="h5"  >{user.posts.length}</Typography>
                            </div>


                            <div>
                                <button onClick={() => setFollowingToggle(!followingToggle)} style={{ backgroundColor: "#67a3dc" }}>
                                    <Typography variant="h5"> Following </Typography>
                                </button>
                                <Typography variant="h5"  >{user.following.length}</Typography>
                            </div>


                            <div>
                                <button onClick={() => setFollowersToggle(!followersToggle)} style={{ backgroundColor: "#67a3dc", }}>
                                    <Typography variant="h5" >Followers</Typography>
                                </button>
                                <Typography variant="h5" > {user.followers.length} </Typography>
                            </div>


                            <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)} >
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
                                        ))) : (<Typography style={{ margin: "2vmax" }}>You have No Followers</Typography>)
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
                                                userId={follows._id}
                                                name={follows.name}
                                                avatar={follows.avatar.url}
                                            />
                                        ))) : (<Typography style={{ marin: "2vmax" }}>You Have Not following anyone</Typography>)
                                    }

                                </div>

                            </Dialog>


                            <Dialog open={requestToggle} onClose={() => setRequestToggle(!requestToggle)}>
                                <div className="DialogBox">
                                    <Typography variant="h4"> Requests </Typography>
                                    {
                                        user && user.requests.length > 0 ? (user.requests.map((request) => (
                                            <RequestCard
                                                key={request._id}
                                                userId={request._id}
                                                name={request.name}
                                                avatar={request.avatar.url}
                                            />
                                        ))) : (<Typography style={{ marin: "2vmax" }}>You Have Not Any Requests</Typography>)
                                    }
                                </div>
                            </Dialog>

                        </div>

                    </div>

                </div>

                <div className="posts-tags">

                    <Link to="/account" onClick={() => setTab("/saved")} >
                    {
                          tab === "/account" ?
                            <Typography variant="h5" style={{ textDecoration: "underline" }} >  <MdOutlinePostAdd /> Posts </Typography> 
                            : <Typography variant="h5">  <MdOutlinePostAdd /> Posts </Typography>
                        }
                    </Link>

                    
                    <Link to="/saved" onClick={() => setTab("/saved")} >
                        {tab === "/saved" ?
                            <Typography variant="h5" style={{ textDecoration: "underline",fontWeight:"700" }} > < BookmarkBorderOutlinedIcon /> Saved </Typography> 
                            : <Typography variant="h5"> <BookmarkBorderOutlinedIcon/>  Saved </Typography>
                        }
                    </Link>

                </div>

                <div className="my-posts">
                    {
                        savedPost && savedPost.length > 0 ? savedPost.map(post => (
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
                                isAccount={post.owner._id === user._id ?true :false}
                                isDelete={post.owner._id === user._id ?true :false}
                            />
                        )) :
                            <div className="no-post-msg">
                                <CameraAltRoundedIcon />
                                <Typography variant="h5">You Have Not Saved Any Posts</Typography>
                            </div>
                    }
                </div>

            </div>

            <Dialog open={settingToggle} onClose={() => setSettingToggle(!settingToggle)}
                style={{
                    width: "500px", height: "500px",
                    position: "fixed", top: "0%", left: "68%"
                }} >
                <div className="DialogBox2">
                    <Typography variant="h4">Settings</Typography> <br></br>
                    <div className="box-content">
                        <FaUserEdit />
                        <Link to="/update/profile" style={{ fontSize: "24px", fontFamily: "revert" }}> <span> Edit Profile</span>  </Link>
                    </div>

                    <div className="box-content">
                        <RiLockPasswordFill />
                        <Link to="/update/password" style={{ fontSize: "24px", fontFamily: "revert" }}> <span>Change Password</span></Link>
                    </div>

                    <div className="box-content">
                        <AiOutlineUsergroupAdd />
                        {
                            user && user.requests.length > 0 ? <Button onClick={() => setRequestToggle(!requestToggle)} >  <span
                            // style={{ color: "red", fontSize: "1.7rem" ,marginLeft:"5px" }}
                            >Requests</span> <span style={{ color: "red", fontSize: "1.7rem", marginLeft: "5px" }}> *</span></Button>
                                : <Button onClick={() => setRequestToggle(!requestToggle)}> <span>Requests</span> </Button>
                        }
                    </div>

                    <div className="box-content">
                        <AiOutlineLogout />
                        <Button onClick={logoutHandler}><span>Logout</span></Button>
                    </div>

                    <div className="box-content">
                        <AiFillDelete />
                        <Button disabled={deleteLoading} onClick={deleteProfileHandler}
                            style={{ color: "red" }}
                        >  <span>Delete Account</span>
                        </Button>

                    </div>

                </div>

            </Dialog>

        </div>
    )
}

export default SavedPost
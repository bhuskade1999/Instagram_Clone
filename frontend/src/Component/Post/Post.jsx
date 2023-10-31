import { Button, Dialog, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { likePost, addCommentOnPost, updatePost, deletePost } from "../../Actions/Post"
import { getFollowingPosts, getMyPosts, getMySavedPosts,loadUser ,saveAndUnSavePost} from "../../Actions/User"


import User from "../User/User"
import "./Post.css"
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
} from "@mui/icons-material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
 import CommentCard from "../CommentCard/CommentCard";



const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false,
}) => {

    const [savedPost, setSavedPost] = useState(false)

    const [liked, setLikes] = useState(false)
    const [likesUser, setLikeUser] = useState((false))

    const [commentValue, setCommentValue] = useState("")
    const [commentToggle, setCommentToggle] = useState(false)

    const [captionValue, setCaptionValue] = useState(caption)
    const [captionToggle, setCaptionToggle] = useState(false)

    const dispatch = useDispatch()

    const { user, loading } = useSelector((state) => state.user)


    const haddleLike = async () => {
        setLikes(!liked);
        await dispatch(likePost(postId))
        console.log(user)

        if (isAccount) {
            dispatch(getMyPosts())
        } else {
            dispatch(getFollowingPosts());
        }

    };


    const haddlesavePost = async () => {
        setSavedPost(!savedPost);
        await dispatch(saveAndUnSavePost(postId))
        dispatch(getMySavedPosts())
        dispatch(loadUser())
    };



    const updateCaptionHandler = async (e) => {
        e.preventDefault();
        await dispatch(updatePost(captionValue, postId))
        dispatch(getMyPosts())

    }


    const deletePostHandler = async (e) => {
        e.preventDefault();
        await dispatch(deletePost(postId))
        dispatch(loadUser())
        dispatch(getMyPosts())
    }



    const addComentHandler = async (e) => {
        e.preventDefault()
        await dispatch(addCommentOnPost(postId, commentValue))
        if (isAccount) {
            dispatch(getMyPosts())
        } else {
            dispatch(getFollowingPosts());
        }
    }



    useEffect(() => {
        likes.forEach((items) => {
            if (items._id === user._id) {
                setLikes(true)
            }
        });

        user.savedPost.forEach((items) => {
            if (items._id === postId) {
                setSavedPost(true)
            }
        });



    }, [likes, user._id, user.savedPost, postId])




    return (
        <div className="post">
            <div className="postHeader">
                <img src={ownerImage} alt="" />
                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700}> {ownerName} </Typography>
                </Link>

                <div className="header-btn">
                    {isAccount ? <Button onClick={() => setCaptionToggle(!captionToggle)}> <MoreVert /> </Button> : null}
                </div>

            </div>

            {/* ------------- Post Images/Videos --------------------- */}

            {
                postImage.endsWith(".mp4") ?
                    (
                        <video controls>
                            <source src={postImage} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) :
                    (
                        <img src={postImage} alt="post" />
                    )
            }

            <div className="postFooter">
                <Button onClick={haddleLike}>
                    {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
                </Button>

                <Button onClick={() => setCommentToggle(!commentToggle)}>
                    <ChatBubbleOutline />
                </Button>

                {isDelete ? <Button onClick={deletePostHandler} disabled={loading}> <DeleteOutline disabled={loading} /> </Button> : null}

                <div className="save-btn">
                    <Button onClick={haddlesavePost}>
                        {savedPost ? <BookmarkIcon style={{ color: "white" }} /> : <BookmarkBorderOutlinedIcon />}
                    </Button>
                </div>

            </div>



            <div className="liked-btn">
                <button
                    onClick={() => setLikeUser(!likesUser)}
                    disabled={likes.length === 0 ? true : false}>
                    <Typography style={{ cursor: "pointer" }}> {likes.length} Likes</Typography>
                </button>
            </div>


            <div className="postDetails">

                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700}>{ownerName}</Typography>
                </Link>

                <Typography
                    fontWeight={100}
                    color="white"
                    style={{ alignSelf: "center", color: "white" }}>{caption}
                </Typography>

            </div>


            <Dialog open={likesUser} onClose={() => setLikeUser(!likesUser)}>
                <div className="DialogBox">
                    <Typography variant="h4"> Liked By</Typography>
                    {
                        likes.map((like) => (
                            <User
                                key={like._id}
                                userId={like._id}
                                name={like.name}
                                avatar={like.avatar.url}
                            />
                        ))
                    }
                </div>
            </Dialog>

            <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)}>
                <div className="DialogBox">
                    <Typography variant="h4">Comments</Typography>
                    <form className="commentForm" onSubmit={addComentHandler}>
                        <input type="text" value={commentValue} onChange={(e) => setCommentValue(e.target.value)}
                            placeholder="Add a comment..." required />
                        <Button type="submit" variant="contained"> Add </Button>

                    </form>

                    {
                        comments.length > 0 ? comments.map((item) => (
                            <CommentCard userId={item.user._id}
                                name={item.user.name}
                                avatar={item.user.avatar.url}
                                comment={item.comment}
                                commentId={item._id}
                                key={item._id}
                                postId={postId}
                                isAccount={isAccount} />
                        )) : (<Typography> No Comments Yet</Typography>)
                    }
                </div>

            </Dialog>


            <Dialog open={captionToggle} onClose={() => setCaptionToggle(!captionToggle)}>
                <div className="DialogBox">
                    <Typography variant="h4">Update Caption</Typography>
                    <form className="commentForm" onSubmit={updateCaptionHandler}>
                        <input type="text" value={captionValue} onChange={(e) => setCaptionValue(e.target.value)}
                            placeholder="capion here here.." required />
                        <Button type="submit" variant="contained"> Update </Button>

                    </form>

                </div>

            </Dialog>

        </div>
    )
}

export default Post;
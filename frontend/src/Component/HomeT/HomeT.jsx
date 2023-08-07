import React, { useState, useEffect, useRef } from 'react'
import "./HomeT.css"
import { Button } from "@mui/material"
import { Typography, Dialog } from "@mui/material"
import { Link } from "react-router-dom"
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import User from "../User/User"
import Post from '../Post/Post'
import Status from '../Status/Status'
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers, getFollowingPosts, getFollowingstory } from "../../Actions/User"
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader"
import { AddOutlined } from "@mui/icons-material";




const HomeT = () => {

    const [isScrolling, setIsScrolling] = useState(false);

    const enableScroll = () => {
        setIsScrolling(true);
    };

    const disableScroll = () => {
        setIsScrolling(false);
    };

    const handleScroll = (event) => {
        if (isScrolling) {
            const container = event.currentTarget;
            const delta = event.deltaY;
            container.scrollTop += delta;
            event.preventDefault();
        }
    };



    const [selectedStory, setSelectedStory] = useState(null);
    const openModal = (post) => setSelectedStory(post);
    const closeModal = () => setSelectedStory(null);

    const containerRef = useRef(null);
    const [scrollX, setScrollX] = useState(0);

    const [myStoryToggle, setmyStoryToggle] = useState(false);

    const [tab, setTab] = useState(window.location.pathname)

    const handleScrollLeft = () => {
        setScrollX((prevScrollX) => prevScrollX - 100); // Adjust the scroll amount as needed
    };

    const handleScrollRight = () => {
        setScrollX((prevScrollX) => prevScrollX + 100); // Adjust the scroll amount as needed
    };


    const dispatch = useDispatch()

    const alert = useAlert()


    const { loading, posts, story, error } = useSelector((state) => state.postOfFollowing)

    const { users, loading: usersLoading } = useSelector((state) => state.allUsers)

    const { user: me } = useSelector((state) => state.user)

    const { error: likeError, message } = useSelector((state) => state.likes)

    useEffect(() => {
        dispatch(getFollowingPosts());
        dispatch(getFollowingstory());
        dispatch(getAllUsers())
    }, [dispatch]);


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
    // Update the container's scroll positions when scrollX or scrollY changes
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = scrollX;
        }
    }, [scrollX]);




    // return loading === true || usersLoading === true ? <Loader /> :(
    return (
        <div className="home-item">

            {/* ==================Left-side =================== */}
            <div className="home-left"
                onMouseEnter={enableScroll}
                onMouseLeave={disableScroll}
                onWheel={handleScroll}
            >

                <div className="story">

                    {/* --------Left Scroll Button--------- */}
                    <div className="story-button">
                        <Button onClick={handleScrollLeft}> <FiChevronLeft /> </Button>
                    </div>

                    <div className="own-story">

                        {
                            me.story && me.story.length > 0 ? me.story.map((post) => (
                                <div>
                                    <button className="round-button" key={post.id} onClick={() => setmyStoryToggle(!myStoryToggle)}>
                                        <div className="circle-image">
                                            <img src={me.avatar.url} alt={me.name.split(" ")[0]} />
                                        </div>
                                    </button>
                                    <p style={{ fontSize: "15px", color: "white", marginTop: "5px" }}> Your Story </p>
                                </div>

                            )) :
                                <div className="story-box-own">
                                    <div className="circle">
                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="blank" />
                                        <div className="plus-icon">
                                            <Link to="newStory" onClick={() => setTab("/newStory")} >
                                                <AddOutlined />
                                            </Link>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: "15px", color: "white", marginTop: "5px" }}> Your Story </p>
                                </div>
                        }

                        {
                            me.story && me.story.length > 0 ?
                                <Dialog open={myStoryToggle} onClose={() => setmyStoryToggle(!myStoryToggle)}
                                    style={{
                                        width: "500px",
                                        position: "fixed", top: "0%", left: "25%"
                                    }} >
                                    <Status
                                        key={me.story[0]._id}
                                        storyId={me.story[0]._id}
                                        caption={me.story[0].caption}
                                        ownerName={me.name}
                                        storyImage={me.story[0].image.url}
                                        ownerImage={me.avatar.url}
                                        ownerId={me._id}
                                        isDelete={true}
                                    />
                                </Dialog> : null

                        }


                    </div>

                    <div className="story-section" ref={containerRef}>
                        {
                            story && story.length > 0 ? story.map((post) => (

                                <div>
                                    <button className="round-button" key={post.id} onClick={() => openModal(post)}>
                                        <div className="circle-image">
                                            <img src={post.owner.avatar.url} alt={post.owner.name.split(" ")[0]} />
                                        </div>
                                    </button>
                                    <p style={{ color: "white", marginTop: "5px" }}>  {post.owner.name.split(" ")[0]}</p>

                                </div>

                            )) : null
                        }

                        <Dialog
                            style={{
                                width: "500px",
                                position: "fixed", top: "0%", left: "25%"
                            }}
                            open={selectedStory !== null}
                            onClose={closeModal}
                        // contentLabel="Story Modal"
                        >
                            {selectedStory && (
                                <div>
                                    <Status
                                        key={selectedStory._id}
                                        storyId={selectedStory._id}
                                        caption={selectedStory.caption}
                                        ownerName={selectedStory.owner.name}
                                        storyImage={selectedStory.image.url}
                                        ownerImage={selectedStory.owner.avatar.url}
                                        ownerId={selectedStory.owner._id}
                                    />
                                </div>
                            )}
                        </Dialog>

                    </div>

                    {/* --------Right Scrol Button--------- */}

                    <div className="story-button">
                        <Button onClick={handleScrollRight}> <FiChevronRight /> </Button>
                    </div>

                </div>

                {/* -------------User-POSTS--------- */}

                <div className="user-posts">
                    {
                        posts && posts.length > 0 ? posts.map((post) => (
                            <Post
                                key={post._id}
                                postId={post._id}
                                caption={post.caption}
                                ownerName={post.owner.name}
                                postImage={post.image.url}
                                likes={post.likes}
                                comments={post.comments}
                                ownerImage={post.owner.avatar.url}
                                ownerId={post.owner._id}
                            />
                        )) : <Typography variant="h5"> No Post Yet </Typography>
                    }

                </div>




            </div>


            {/* ==========================home-right-side================= */}


            <div className="home-right">
                <div className="home-me">
                    <User
                        key={me._id}
                        userId={me._id}
                        name={me.name}
                        avatar={me.avatar.url}
                    />
                    <Typography variant='h5'>[ You ]</Typography>
                </div>

                <div className="suggest">
                    <Typography variant='h6'>Suggested For You</Typography>
                </div>

                <div className="right-side">
                    {
                        users && users.length > 0 ? users.map((user) => (
                            <User
                                key={user._id}
                                userId={user._id}
                                name={user.name}
                                avatar={user.avatar.url}
                            />
                        )) : <Typography>No Users Yet </Typography>
                    }
                </div>
            </div>

        </div>


    )
}

export default HomeT
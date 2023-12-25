import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Typography, Dialog, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import {
  AiFillDelete,
  AiOutlineLogout,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import {
  deleteMyProfile,
  getMyPosts,
  logoutUser,
  loadUser,
} from "../../Actions/User";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Post from "../Post/Post";
import User from "../User/User";
import Loader from "../Loader/Loader";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import RequestCard from "../RequestCard/RequestCard";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

const Profile = () => {
  const dispatch = useDispatch();

  const [tab, setTab] = useState(window.location.pathname);

  const alert = useAlert();

  const { user, loading: userLoading } = useSelector((state) => state.user);

  const { loading, error, posts } = useSelector((state) => state.myPosts);

  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.likes);

  const [followersToggle, setFollowersToggle] = useState(false);

  const [followingToggle, setFollowingToggle] = useState(false);

  const [requestToggle, setRequestToggle] = useState(false);

  const logoutHandler = async () => {
    if (window.confirm("Do you really want to Logout this session ?")) {
      await dispatch(logoutUser());
      alert.success("logged out Successfully");
    }
  };

  const deleteProfileHandler = async () => {
    if (window.confirm("Do you really want to delete your account ?")) {
      await dispatch(deleteMyProfile());
      dispatch(logoutUser());
    }
  };

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, likeError, dispatch]);

  // return userLoading === true ? <Loader /> : (
  return (
    <div className="account-item">
      <div className="center-side">
        {user ? (
          <div className="profile-details">
            <Avatar
              src={user.avatar.url}
              sx={{
                height: "10vmax",
                width: "10vmax",
                marginTop: "30px",
                border: "3px solid white",
              }}
              alt={user.name}
            />

            <div className="content">
              <div className="user-name" style={{ display: "flex" }}>
                <Typography style={{ fontSize: "27px", fontFamily: "revert" }}>
                  {" "}
                  {user.name}{" "}
                </Typography>

                {/* ----------------Setting DropDown List------------ */}

                <div className="dropdown down-back">
                  <Link
                    to="#"
                    className="btn btn-secondary"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FiSettings />
                  </Link>

                  <ul className="dropdown-menu  dropdown-list">
                    <li>
                      <Link to="/update/profile" className="dropdown-item">
                        <FaUserEdit /> Edit Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/update/password" className="dropdown-item">
                        <FiSettings /> Change Password
                      </Link>
                    </li>

                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => setRequestToggle(!requestToggle)}
                      >
                        <AiOutlineUsergroupAdd />
                        Requests
                        {user && user.requests.length > 0 && (
                          <span className="badge text-bg-secondary">
                            {user.requests.length}
                          </span>
                        )}
                      </button>
                    </li>

                    <li>
                      <Button class="dropdown-item" onClick={logoutHandler}>
                        <AiOutlineLogout /> Logout
                      </Button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        disabled={deleteLoading}
                        onClick={deleteProfileHandler}
                        style={{ color: "red" }}
                      >
                        <AiFillDelete /> Delete Account
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="details">
                <div
                  className="container text-left"
                  style={{
                    width: "320px",
                  }}
                >
                  <div className="row">
                    <div class="col">
                      <button type="button" className="btn btn-primary">
                        Posts{" "}
                        <span className="badge text-bg-secondary">
                          {user.posts.length}
                        </span>
                      </button>
                    </div>
                    <div class="col">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setFollowingToggle(!followingToggle)}
                      >
                        Following{" "}
                        <span className="badge text-bg-secondary">
                          {user.following.length}
                        </span>
                      </button>
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setFollowersToggle(!followersToggle)}
                      >
                        Followers{" "}
                        <span className="badge text-bg-secondary">
                          {user.followers.length}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* ------------------testing area End-------------- */}
              </div>
            </div>
          </div>
        ) : null}

        <div className="posts-tags">
          <Link to="/account" onClick={() => setTab("/saved")}>
            {tab === "/account" ? (
              <Typography
                variant="h5"
                style={{ textDecoration: "underline", fontWeight: "700" }}
              >
                <MdOutlinePostAdd /> Posts
              </Typography>
            ) : (
              <Typography variant="h5">
                <MdOutlinePostAdd /> Posts
              </Typography>
            )}
          </Link>

          <Link to="/saved" onClick={() => setTab("/saved")}>
            {tab === "/saved" ? (
              <Typography
                variant="h5"
                style={{ textDecoration: "underline", fontWeight: "700" }}
              >
                <BookmarkBorderOutlinedIcon /> Saved
              </Typography>
            ) : (
              <Typography variant="h5">
                <BookmarkBorderOutlinedIcon /> Saved
              </Typography>
            )}
          </Link>
        </div>

        <div className="my-posts">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
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
                isAccount={true}
                isDelete={true}
              />
            ))
          ) : (
            <div className="no-post-msg">
              <CameraAltRoundedIcon />
              <Typography variant="h5">Shared Posts</Typography>
            </div>
          )}
        </div>
      </div>

      {/* <---------------------- All Dialog Boxes ------------------------> */}

      {/* <----------------- Followers Toggle Box ------------------> */}

      <Dialog
        open={followersToggle}
        onClose={() => setFollowersToggle(!followersToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4"> Followers </Typography>
          {user && user.followers.length > 0 ? (
            user.followers.map((follow) => (
              <User
                key={follow._id}
                userId={follow._id}
                name={follow.name}
                avatar={follow.avatar.url}
              />
            ))
          ) : (
            <Typography style={{ margin: "2vmax" }}>
              You have No Followers
            </Typography>
          )}
        </div>
      </Dialog>

      {/* <----------------- Following Toggle Box ------------------> */}

      <Dialog
        open={followingToggle}
        onClose={() => setFollowingToggle(!followingToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4"> Followings </Typography>
          {user && user.following.length > 0 ? (
            user.following.map((follows) => (
              <User
                key={follows._id}
                userId={follows._id}
                name={follows.name}
                avatar={follows.avatar.url}
              />
            ))
          ) : (
            <Typography style={{ marin: "2vmax" }}>
              You Have Not following anyone
            </Typography>
          )}
        </div>
      </Dialog>

      {/* <----------------- Requests Toggle Box ------------------> */}

      <Dialog
        open={requestToggle}
        onClose={() => setRequestToggle(!requestToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4"> Requests </Typography>
          {user && user.requests.length > 0 ? (
            user.requests.map((request) => (
              <RequestCard
                key={request._id}
                userId={request._id}
                name={request.name}
                avatar={request.avatar.url}
              />
            ))
          ) : (
            <Typography style={{ marin: "2vmax" }}>
              You Have Not Any Requests
            </Typography>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Profile;

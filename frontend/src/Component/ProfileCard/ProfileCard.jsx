import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
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

import {
  deleteMyProfile,
  getMyPosts,
  logoutUser,
  loadUser,
} from "../../Actions/User";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import User from "../User/User";
import RequestCard from "../RequestCard/RequestCard";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  followAndUnfollowUser,
  getUserPosts,
  getUserProfile,
  acceptsUserRequest,
  rejectsUserRequest,
} from "../../Actions/User";

const ProfileCard = ({
  userId,
  userName,
  userImage,
  postLength,
  requests = [],
  followersLength,
  folowingLength,
  followings = [],
  followers = [],
  isAccount = false,
}) => {
  const navigate = useNavigate();
  const alert = useAlert();
  const params = useParams();

  const { user: me } = useSelector((state) => state.user);

  const [settingToggle, setSettingToggle] = useState(false);

  const dispatch = useDispatch();

  const { user, loading: userLoading } = useSelector((state) => state.user);

  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.likes);

  const [followersToggle, setFollowersToggle] = useState(false);

  const [followingToggle, setFollowingToggle] = useState(false);

  const [requestToggle, setRequestToggle] = useState(false);

  const [following, setFollowing] = useState(false);

  const [requested, setRequest] = useState(false);
  const [userRequest, setuserRequest] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const followHandler = async () => {
    await setFollowing(!following);
    await dispatch(followAndUnfollowUser(user._id));
    await dispatch(getUserProfile(params.id));
    dispatch(loadUser());
    //window.location.reload();
  };

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
    if (isAccount) {
      dispatch(loadUser());
      dispatch(getMyPosts());
    } else {
      dispatch(getUserProfile(params.id));
    }
  }, [dispatch]);

  // useEffect(() => {

  //     if (followers) {
  //         followers.forEach((item) => {
  //             if (item._id === me._id) {
  //                 setFollowing(true)
  //             }
  //         })

  //     }

  //     if (requests) {
  //         requests.forEach((items) => {
  //             if (items._id === me._id) {
  //                 setRequest(true)
  //             }
  //         })

  //     }

  //     if (requests) {
  //         requests.forEach((items) => {
  //             if (items._id === params.id) {
  //                 setuserRequest(true)
  //             }
  //         })

  //     }

  //     if (me._id === params.id) {
  //         setMyProfile(true)
  //         navigate("/account")
  //     }

  // }, [me._id, params.id, me.requests, navigate])

  return (
    <div className="profile-details">
      <Avatar
        src={userImage}
        sx={{
          height: "10vmax",
          width: "10vmax",
          marginTop: "30px",
          border: "3px solid white",
        }}
        alt={userName}
      />

      <div className="content">
        <div className="user-name" style={{ display: "flex" }}>
          <Typography style={{ fontSize: "27px", fontFamily: "revert" }}>
            {" "}
            {userName}{" "}
          </Typography>
          {isAccount ? (
            <Button onClick={() => setSettingToggle(!settingToggle)}>
              <FiSettings />
            </Button>
          ) : null}
        </div>

        <div className="details">
          <div>
            <Typography variant="h5">Posts</Typography>
            <Typography variant="h5">{postLength}</Typography>
          </div>

          <div>
            <button
              onClick={() => setFollowingToggle(!followingToggle)}
              style={{ backgroundColor: "#67a3dc" }}
            >
              <Typography variant="h5"> Following </Typography>
            </button>
            <Typography variant="h5">{folowingLength}</Typography>
          </div>

          <div>
            <button
              onClick={() => setFollowersToggle(!followersToggle)}
              style={{ backgroundColor: "#67a3dc" }}
            >
              <Typography variant="h5">Followers</Typography>
            </button>
            <Typography variant="h5"> {followersLength} </Typography>
          </div>
        </div>

        {isAccount ? null : (
          <Button
            variant="contained"
            style={{ background: following || requested ? "red" : "" }}
            onClick={followHandler}
          >
            {following ? "Unfollow" : requested ? "Pending" : "Follow"}
          </Button>
        )}

        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4"> Followers </Typography>
            {followers && followers.length > 0 ? (
              followers.map((follow) => (
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

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4"> Followings </Typography>
            {followings && followings.length > 0 ? (
              followings.map((follows) => (
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

        <Dialog
          open={requestToggle}
          onClose={() => setRequestToggle(!requestToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4"> Requests </Typography>
            {requests && requests.length > 0 ? (
              requests.map((request) => (
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

        <Dialog
          open={settingToggle}
          onClose={() => setSettingToggle(!settingToggle)}
          style={{
            width: "500px",
            height: "500px",
            position: "fixed",
            top: "0%",
            left: "68%",
          }}
        >
          <div className="DialogBox2">
            <Typography variant="h4">Settings</Typography> <br></br>
            <div className="box-content">
              <FaUserEdit />
              <Link
                to="/update/profile"
                style={{ fontSize: "24px", fontFamily: "revert" }}
              >
                {" "}
                <span> Edit Profile</span>{" "}
              </Link>
            </div>
            <div className="box-content">
              <RiLockPasswordFill />
              <Link
                to="/update/password"
                style={{ fontSize: "24px", fontFamily: "revert" }}
              >
                {" "}
                <span>Change Password</span>
              </Link>
            </div>
            <div className="box-content">
              <AiOutlineUsergroupAdd />
              {requests && requests.length > 0 ? (
                <Button onClick={() => setRequestToggle(!requestToggle)}>
                  {" "}
                  <span
                  // style={{ color: "red", fontSize: "1.7rem" ,marginLeft:"5px" }}
                  >
                    Requests
                  </span>{" "}
                  <span
                    style={{
                      color: "red",
                      fontSize: "1.7rem",
                      marginLeft: "5px",
                    }}
                  >
                    {" "}
                    *
                  </span>
                </Button>
              ) : (
                <Button onClick={() => setRequestToggle(!requestToggle)}>
                  {" "}
                  <span>Requests</span>{" "}
                </Button>
              )}
            </div>
            <div className="box-content">
              <AiOutlineLogout />
              <Button onClick={logoutHandler}>
                <span>Logout</span>
              </Button>
            </div>
            <div className="box-content">
              <AiFillDelete />
              <Button
                disabled={deleteLoading}
                onClick={deleteProfileHandler}
                style={{ color: "red" }}
              >
                {" "}
                <span>Delete Account</span>
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfileCard;

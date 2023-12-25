import React, { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../Api/api";
import "./Conversation.css";
import { Typography } from "@mui/material";

const Conversation = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [data.members, currentUser]);
  return (
    <>
      <div className="homeUsers">
        <div className="Profile-Image">
          <img src={userData?.avatar.url} alt="Profile" />
          {online && <div className="online-dot"></div>}
        </div>

        <div className="name" style={{ fontSize: "0.8rem" }}>
          <Typography variant="h5">{userData?.name} </Typography>
        </div>
      </div>
    </>
  );
};

export default Conversation;

import React from "react";
import "./RequestCard.css";
import { useDispatch } from "react-redux";

import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  acceptsUserRequest,
  rejectsUserRequest,
  loadUser,
} from "../../Actions/User";
import User from "../User/User";

const RequestCard = ({ userId, name, avatar }) => {
  const dispatch = useDispatch();

  const AcceptHandler = async () => {
    await dispatch(acceptsUserRequest(userId));
    await dispatch(loadUser());
  };

  const RejectHandler = async () => {
    await dispatch(rejectsUserRequest(userId));
    await dispatch(loadUser());
  };

  return (
    <div className="RequestUser">
      <User key={userId} userId={userId} name={name} avatar={avatar} />

      <Button
        style={{ backgroundColor: "blue", padding: "0px" }}
        onClick={AcceptHandler}
      >
        <CheckIcon />
      </Button>

      <Button
        id="re-btn"
        style={{ backgroundColor: "red", padding: "0px" }}
        onClick={RejectHandler}
      >
        <CloseIcon />
      </Button>
    </div>
  );
};

export default RequestCard;

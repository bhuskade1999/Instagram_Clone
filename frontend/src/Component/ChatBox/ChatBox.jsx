import React, { useEffect, useState, useRef } from "react";
import { addMessage, getMessages, deleteMessage } from "../../Api/api";
import { getUser } from "../../Api/api";
import "./ChatBox.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import { useAlert } from "react-alert";
import BlockIcon from "@mui/icons-material/Block";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import moment from "moment";

const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  receivedMessage,
  onlineUsers,
}) => {
  const alert = useAlert();
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const online = onlineUsers.find((user) => user.userId === userId);
    online ? setIsOnline(true) : setIsOnline(false);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser, onlineUsers]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
        console.log("messages", data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);



  const handleDelete = async (id) => {
    const { data } = await deleteMessage(id);
    alert.success(data.message);
  };


  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])


  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
      createdAt: moment().toISOString(),
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);


  const shouldShowDate = (currentMessage, previousMessage) => {
    if (!previousMessage) return true;

    const currentDate = moment(currentMessage.createdAt).format("YYYY-MM-DD");
    const previousDate = moment(previousMessage.createdAt).format("YYYY-MM-DD");

    return currentDate !== previousDate;
  };


  const scroll = useRef();
  const imageRef = useRef();


  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="chat-profile">
                <img src={userData?.avatar.url} alt="Profile" />
                <div className="name" style={{ fontSize: "0.8rem" }}>
                  <Typography variant="h5">
                    {" "}
                    <Link to={`/user/${userData?._id}`}>
                      {userData?.name}
                    </Link>{" "}
                  </Typography>
                  <span style={{ color: isOnline ? "#51e200" : "" }}>
                    {" "}
                    {isOnline ? "Online" : "Offline"}{" "}
                  </span>
                </div>
              </div>
            </div>

            <div className="chat-body">
              {messages.map((message, index) => {
                const previousMessage = messages[index - 1];
                const showDate = shouldShowDate(message, previousMessage);

                return (
                  <>
                    {showDate && (
                      <div className="message-date">
                        <span> {moment(message.createdAt).format("D  MMMM  YYYY")}</span>
                      </div>
                    )}

                    <div
                      key={message._id}
                      // ref={index === messages.length - 1 ? scroll : null}
                      ref={scroll}
                      className={
                        message.senderId === currentUser
                          ? "message own"
                          : "message"
                      }>

                      {
                        !message.isDeleted ? (
                          <>
                            <spna>{message.text}</spna>
                            <span >
                              {moment(message.createdAt).format("h:mm A")}
                              { //if sender and message is not deleted them show delete button else null
                                message.senderId === currentUser && !message.isDeleted ?
                                  <DeleteOutlinedIcon onClick={() => handleDelete(message._id)}
                                    style={{ fontSize: "14px", cursor: "pointer", color: "red" }} /> : null
                              }
                            </span>





                          </>
                        )
                          : (<span style={{ color: "gray" }}> <BlockIcon style={{ fontSize: "14px" }} /> This Message was deleted  </span>)
                      }


                    </div>

                  </>

                );

              })}

            </div>

            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
              <input
                className="input-box"
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>
          </>
        ) : (
          <div className="chatbox-empty-messages">
            <div> <MessageIcon /> </div>
            <span> Tap on a chat to start a conversation...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBox;

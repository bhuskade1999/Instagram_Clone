import React, { useEffect, useRef, useState } from "react";
import "./NewPost.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, Typography } from "@mui/material";
import { createNewPost } from "../../Actions/Post";
import { useAlert } from "react-alert";
import { loadUser } from "../../Actions/User";

const NewPost = () => {
  const { loading, error, message } = useSelector((state) => state.likes);

  const dispatch = useDispatch();
  const alert = useAlert();

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [hashTagToggle, setHashTagToggle] = useState(false);

  const [hashTag, setHashTags] = useState([]);

  const inputHashTag = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, image, hashTag));
    dispatch(loadUser());
  };

  const handleHanshTag = () => {
    let tags = inputHashTag.current.value;
    const hashtagRegex = /^#[A-Za-z0-9_]+$/;

    if (tags.length > 0) {
      tags = tags.trim().split(" ");
      let nonHashtags = tags.filter((str) => !hashtagRegex.test(str));
      if (nonHashtags.length > 0) {
        nonHashtags = nonHashtags.join(" , ");
        return window.alert(`${nonHashtags} :- these are not proper hashtag`);
      } else {
        setHashTags(tags);
        inputHashTag.current.value = "";
      }
    }
    setHashTagToggle(!hashTagToggle);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, alert]);

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3"> NewPost </Typography>

        {image && (
          <>
            {(() => {
              const fileType = image.split(";")[0].split("/")[0];
              if (fileType === "data:video") {
                return (
                  <video controls>
                    <source src={image} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                );
              } else {
                return <img src={image} alt="post" />;
              }
            })()}
          </>
        )}

        <input
          type="file"
          accept="video/*,image/*"
          onChange={handleImageChange}
        />
        <input
          type="text"
          placeholder="enter caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <div className="hashtag-box">
          <span onClick={() => setHashTagToggle(!hashTagToggle)}>
            Add Hashtag
          </span>
        </div>

        <Button
          disabled={loading}
          type="submit"
          style={{
            fontSize: "1rem",
            marginTop: "15px",
            backgroundColor: "blue",
            borderRadius: "20px",
            color: "white",
          }}
        >
          Post
        </Button>
      </form>

      <Dialog
        open={hashTagToggle}
        onClose={() => setHashTagToggle(!hashTagToggle)}
      >
        <div className="DialogBox-hashtag">
          <center>
            <Typography variant="h4"> HashTags </Typography>
          </center>
          <div>
            <span>Note: You can add multple hastag using space</span> <br />
            <span>ex: #nodejs #techno #react</span>
          </div>
          <textarea
            type="text"
            ref={inputHashTag}
            placeholder="Enter hashtags..."
          />
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "50px" }}
            onClick={handleHanshTag}
          >
            Ok
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default NewPost;

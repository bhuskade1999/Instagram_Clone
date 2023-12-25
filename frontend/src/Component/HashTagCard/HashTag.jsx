import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findPostByHashTag } from "../../Actions/Post";
import Post from "../Post/Post";
import { Dialog, Typography } from "@mui/material";
import "./HashTag.css";
import Loader from "../Loader/Loader";

const HashTag = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const { loading, posts } = useSelector((state) => state.hashtags);

  const openModel = (post) => setSelectedPost(post);

  const closeModal = () => setSelectedPost(null);

  useEffect(() => {
    dispatch(findPostByHashTag(params.hashtag));
  }, [dispatch, params.hashtag]);

  return loading ? (
    <Loader />
  ) : (
    <div className="hashtag-container">
      <div className="hashtag-count">
        <Typography variant="h4" fontWeight={700}>
          {`#${params.hashtag} :- `}{" "}
        </Typography>
        <span>{` ${posts ? posts.length : 0}`}posts</span>
      </div>

      <div className="hashtag-post">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <img
              key={post._id}
              src={post.image.url}
              alt="hashtag-images"
              onClick={() => openModel(post)}
            />
          ))
        ) : (
          <center>
            <Typography variant="h3"> No Post Yet </Typography>
          </center>
        )}
      </div>

      <Dialog open={selectedPost !== null} onClose={closeModal}>
        <div className="hashtag-post-container">
          {selectedPost && (
            <>
              <Post
                key={selectedPost._id}
                postId={selectedPost._id}
                caption={selectedPost.caption}
                ownerName={selectedPost.owner.name}
                postImage={selectedPost.image.url}
                likes={selectedPost.likes}
                comments={selectedPost.comments}
                ownerImage={selectedPost.owner.avatar.url}
                ownerId={selectedPost.owner._id}
                hashTag={selectedPost.hashTag}
              />
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default HashTag;

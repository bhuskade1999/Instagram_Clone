import axios from "axios";

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });

    const { data } = await axios.get(`/api/v1/post/${id}`);

    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

//===============================================

export const addCommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    });

    const { data } = await axios.put(
      `/api/v1/post/comment/${id}`,
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "addComentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data.message,
    });
  }
};

//==================== delete comments ===========================

export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentRequest",
    });

    const { data } = await axios.delete(`/api/v1/post/comment/${id}`, {
      data: { commentId },
    });

    dispatch({
      type: "deleteComentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

//==================================== New post=======================

export const createNewPost = (caption, image, hashTag) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });

    const { data } = await axios.post(
      `/api/v1/post/upload/`,
      {
        caption,
        image,
        hashTag,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "newPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response.data.message,
    });
  }
};

//============================ Create story ==================================

export const createNewStory = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "newStoryRequest",
    });

    const { data } = await axios.post(
      `/api/v1/story/upload/`,
      {
        caption,
        image,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "newStorySuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newStoryFailure",
      payload: error.response.data.message,
    });
  }
};

//=====================================UpdatePost ====================================

export const updatePost = (caption, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    });

    const { data } = await axios.put(
      `/api/v1/post/${id}`,
      {
        caption,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

//======================================================

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });

    const { data } = await axios.delete(`/api/v1/post/${id}`);

    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};

/*--------------------------- Delete Story ------------------------------ */

export const deleteStory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteStoryRequest",
    });

    const { data } = await axios.delete(`/api/v1/story/deleteStory/${id}`);

    dispatch({
      type: "deleteStorySuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteStoryFailure",
      payload: error.response.data.message,
    });
  }
};

/*--------------------------- hashtags requests ------------------------------ */

export const findPostByHashTag = (hashtag) => async (dispatch) => {
  try {
    dispatch({
      type: "hashTagRequest",
    });

    const { data } = await axios.get(`/api/v1/posts/hashtag/${hashtag}`);

    dispatch({
      type: "hashTagSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "hashTagFailure",
      payload: error.response.data.message,
    });
  }
};

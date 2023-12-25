import { configureStore } from "@reduxjs/toolkit";
import {
  allUsersReducer,
  postOfFollowingReducer,
  userProfileReducer,
  userReducer,
} from "./Reducer/user";
import {
  hashTagPostReducer,
  likesReducer,
  myPostsReducer,
  myStoryReducer,
  userPostReducer,
} from "./Reducer/Post";
import { chatReducer, messageReducer } from "./Reducer/Chat";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    likes: likesReducer,
    myPosts: myPostsReducer,
    myStory: myStoryReducer,
    userPosts: userPostReducer,
    userProfile: userProfileReducer,
    chat: chatReducer,
    message: messageReducer,
    hashtags: hashTagPostReducer,
  },
});

export default store;

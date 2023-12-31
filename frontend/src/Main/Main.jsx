import "./Main.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Component/Login/login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../Actions/User";
import NewPost from "../Component/NewPost/NewPost";
import Register from "../Component/Register/Register";
import UpdateProfile from "../Component/UpdateProfile/UpdateProfile";
import UpdatePassword from "../Component/UpdatePassword/UpdatePassword";
import ForgotPassword from "../Component/ForgotPassword/ForgotPassword";
import ResetPassword from "../Component/ResetPssword/ResetPassword";
import Search from "../Component/Search/Search";
import NotFound from "../Component/NotFound/NotFound";
import NewStory from "../Component/NewStory/NewStory";
import Profile from "../Component/Account/Profile";
import { Header, Header2 } from "../Component/Header/Header";
import HomeT from "../Component/HomeT/HomeT";
import UserProfile from "../Component/UserProfileT/UserProfile";
import Testing from "../Component/Testing/Testing";
import SavedPost from "../Component/SavedPost/SavedPost";
import Chat from "../Component/Chat/Chat";
import HashTag from "../Component/HashTagCard/HashTag";

function Main() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="app-grid-container">
      <Router>
        {isAuthenticated ? <Header /> : <Header2 />}

        <Routes>
          <Route path="/" element={isAuthenticated ? <HomeT /> : <Login />} />
          <Route
            path="/account"
            element={isAuthenticated ? <Profile /> : <Login />}
          />
          <Route
            path="/newPost"
            element={isAuthenticated ? <NewPost /> : <Login />}
          />
          <Route
            path="/newStory"
            element={isAuthenticated ? <NewStory /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Profile /> : <Register />}
          />
          <Route
            path="/update/profile"
            element={isAuthenticated ? <UpdateProfile /> : <Login />}
          />
          <Route
            path="/update/password"
            element={isAuthenticated ? <UpdatePassword /> : <Login />}
          />
          <Route
            path="/forgot/password"
            element={isAuthenticated ? <UpdatePassword /> : <ForgotPassword />}
          />
          <Route
            path="/password/reset/:token"
            element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />}
          />
          <Route
            path="/user/:id"
            element={isAuthenticated ? <UserProfile /> : <Login />}
          />
          <Route
            path="/hashtag/:hashtag"
            element={isAuthenticated ? <HashTag /> : <Login />}
          />
          <Route
            path="/search"
            element={isAuthenticated ? <Search /> : <Login />}
          />
          <Route
            path="/saved"
            element={isAuthenticated ? <SavedPost /> : <Login />}
          />
          <Route
            path="/chat"
            element={isAuthenticated ? <Chat /> : <Login />}
          />
          <Route path="*" element={<NotFound />} />

          <Route
            path="/testing"
            element={isAuthenticated ? <Testing /> : <Login />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default Main;

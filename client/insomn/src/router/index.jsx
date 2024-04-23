import { createBrowserRouter, redirect } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import HomeFollowing from "../pages/HomeFollowing";
import AddPostModal from "../components/AddPostModal";
import Redirect from "../pages/Redirect";
import Post from "../pages/Post";
import User from "../pages/User";
import UpdateUser from "../pages/UpdateUser";
import Logout from "../pages/Logout";
import DeletePost from "../pages/DeletePost";
import PostPerCategory from "../pages/PostPerCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "home/following",
        element: <HomeFollowing />,
      },
      {
        path: "post/:id",
        element: <Post />,
      },
      {
        path: "category/post/:id",
        element: <PostPerCategory />,
      },
      {
        path: "profile",
        element: <User />,
      },
      {
        path: "edit-profile",
        element: <UpdateUser />,
      },
      {
        path: "delete-post/:id",
        element: <DeletePost />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/home");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <Register />,
    // loader: teamLoader,
  },
  {
    path: "/logout",
    element: <Logout />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
  },
  {
    path: "/test",
    element: <AddPostModal />,
    // loader: teamLoader,
  },
  {
    path: "/redirect/home",
    element: <Redirect page="home" />,
  },
  {
    path: "/redirect/profile",
    element: <Redirect page="profile" />,
  },
  {
    path: "/redirect/category/post/:key",
    element: <Redirect page="postByCategory" state="haveParams" />,
  },
  {
    path: "/redirect/post/:key",
    element: <Redirect page="post" state="haveParams" />,
  },
]);

export default router;

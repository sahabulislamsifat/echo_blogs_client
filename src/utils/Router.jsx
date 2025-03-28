import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import FeaturedBlogs from "../pages/FeaturedBlogs";
import Wishlist from "../pages/Wishlist";
import AllBlogs from "../pages/AllBlogs";
import AuthLayout from "../layouts/AuthLayout";
import SignUp from "../components/sign-up/SignUp";
import SignIn from "../components/sign-in/SignIn";
import AddBlogForm from "../pages/AddBlogForm";
import BlogDetails from "../components/blog-details/BlogDetails";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "../components/miscellaneous/NotFoundPage";
import BlogUpdate from "../components/blog-update/BlogUpdate";
import WishlistDetails from "../components/blog-details/wishlistDetails";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/add-blog",
        element: (
          <PrivateRoute>
            <AddBlogForm></AddBlogForm>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-blogs",
        element: <AllBlogs></AllBlogs>,
      },
      {
        path: "/featured-blogs",
        element: <FeaturedBlogs />,
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist></Wishlist>
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist-details/:id",
        element: <WishlistDetails></WishlistDetails>,
      },
      {
        path: "/blog-details/:id",
        element: <BlogDetails></BlogDetails>,
      },
      {
        path: "/blog-update/:id",
        element: <BlogUpdate></BlogUpdate>,
      },
      
    ],
  },
  //Auth
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/sign-up",
        element: <SignUp></SignUp>,
      },
      {
        path: "/auth/sign-in",
        element: <SignIn></SignIn>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage></NotFoundPage>,
  },
]);

export default Router;

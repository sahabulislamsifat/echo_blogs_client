import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../utils/AuthProvider";
import useAxiosInstance from "../hooks/useAxiosInstance";
import { Helmet } from "react-helmet-async";

const Wishlist = () => {
  const axiosInstance = useAxiosInstance();
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Fetch blog wishlist
  const fetchWishlist = async () => {
    if (user?.uid) {
      try {
        // const { data } = await axios.get(
        //   `${import.meta.env.VITE_API_URL}/my-wishlists/${user?.uid}`
        // );
        const { data } = await axiosInstance.get(
          `${import.meta.env.VITE_API_URL}/my-wishlists/${user?.uid}`
        );
        setWishlist(data);
      } catch (error) {
        toast.error("Failed to fetch blog wishlist");
      }
    } else {
      return;
    }
  };

  const handleDelete = async (blogId) => {
    // delete blog from wishlist API call
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(
            `${import.meta.env.VITE_API_URL}/wishlists/${blogId}`
          );
          setWishlist((prev) => prev.filter((blog) => blog._id !== blogId));
          Swal.fire({
            title: "Deleted!",
            text: "Your blogs has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      toast.error("Failed to fetch blog Blog");
    }
  };

  return (
    <div className="min-h-screen mt-20 p-4">
      <Helmet>
        <title>Wishlist || A Blogs Web Application</title>
      </Helmet>
      <div className="">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-700 my-6 text-center">
          My Wishlist
        </h1>
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((blog) => (
              <div
                key={blog._id}
                className="hover:scale-95 transition-transform duration-200 w-full max-w-lg mx-auto shadow-sm border-none bg-gradient-to-l from-indigo-50 via-white to-gray-50"
              >
                <div data-aos="zoom-in" className=" flex flex-col sm:flex-row">
                  {/* Blog Image */}
                  <img
                    className="w-full h-64 md:w-48 md:h-[220px]  p-4 object-cover"
                    src={blog.imageUrl || "/default-image.jpg"}
                    alt={`Image for ${blog.title || "Untitled Blog"}`}
                  />

                  {/* Blog Content */}
                  <div className="p-4 flex flex-col flex-1">
                    {/* Blog Title */}
                    <h3 className="mb-2 text-xl md:text-[18px] font-semibold text-gray-800 ">
                      {blog.title?.length > 25
                        ? `${blog.title.substring(0, 25)}`
                        : blog.title || "Untitled Blog"}
                    </h3>

                    {/* Short Description */}
                    <div className="mb-3">
                      <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
                        {blog.shortDescription?.length > 60
                          ? `${blog.shortDescription.substring(0, 60)}...`
                          : blog.shortDescription || "No description available"}
                      </p>
                    </div>

                    {/* Category */}
                    <div className="flex items-center flex-wrap gap-2">
                      {/* <p className="text-sm text-gray-600">Category:</p> */}
                      <span className="rounded-sm bg-gray-100 px-2 py-[2px] text-xs sm:text-sm text-gray-700">
                        {blog.category || "Uncategorized"}
                      </span>
                      <span className="rounded-sm bg-gray-100 px-2 py-[2px] text-xs sm:text-sm text-gray-700">
                        {blog.createdAt
                          ? new Date(blog.createdAt).toLocaleDateString()
                          : "Unknown date"}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link
                        to={`/wishlist-details/${blog._id}`}
                        className="btn btn-sm rounded-sm border border-indigo-600 hover:bg-indigo-600 px-4 py-1 text-indigo-600 hover:text-white transition-all duration-200"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id || null)}
                        className="btn btn-sm rounded-sm text-red-600 px-4 py-1 text-red border border-red-600  hover:bg-red-600 hover:text-white transition-all duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center text-lg mt-6">
            Your wishlist is currently empty. Start adding your favorite blogs!
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

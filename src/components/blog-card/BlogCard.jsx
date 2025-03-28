import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthProvider";

const BlogCard = ({ blog }) => {
  const { title, imageUrl, category, createdAt, shortDescription } = blog || {};
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleWishlist = async (id) => {
    const wishlist = {
      userId: user?.uid,
      blogID: id,
      title,
      imageUrl,
      category,
      createdAt,
      shortDescription,
    };

    // Post wishlist for the blog
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/wishlists`, wishlist);
      toast.success("Blog added to wishlist");
      navigate("/wishlist");
    } catch (error) {
      toast.error("Failed to add blog to wishlist");
    }
  };

  return (
    <div className="hover:scale-95 transition-transform duration-200 w-full max-w-lg mx-auto shadow-sm border-none bg-gradient-to-l from-indigo-50 via-white to-gray-50">
      <div data-aos="zoom-in" className=" flex flex-col sm:flex-row">
        {/* Blog Image */}
        <img
          className="w-full h-64 md:w-48 md:h-[220px]  p-4 object-cover"
          src={imageUrl || "/default-image.jpg"}
          alt={`Image for ${title || "Untitled Blog"}`}
        />

        {/* Blog Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Blog Title */}
          <h3 className="mb-2 text-xl md:text-[18px] font-semibold text-gray-800 ">
            {title?.length > 25
              ? `${title.substring(0, 25)}`
              : title || "Untitled Blog"}
          </h3>

          {/* Short Description */}
          <div className="mb-3">
            <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
              {shortDescription?.length > 60
                ? `${shortDescription.substring(0, 60)}...`
                : shortDescription || "No description available"}
            </p>
          </div>

          {/* Category */}
          <div className="flex items-center flex-wrap gap-2">
            {/* <p className="text-sm text-gray-600">Category:</p> */}
            <span className="rounded-sm bg-gray-100 px-2 py-[2px] text-xs sm:text-sm text-gray-700">
              {category || "Uncategorized"}
            </span>
            <span className="rounded-sm bg-gray-100 px-2 py-[2px] text-xs sm:text-sm text-gray-700">
              {createdAt
                ? new Date(createdAt).toLocaleDateString()
                : "Unknown date"}
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to={`/blog-details/${blog?._id || "default-id"}`}
              className="btn btn-sm rounded-sm bg-indigo-600 px-4 py-1 text-white hover:bg-indigo-700 transition"
            >
              Details
            </Link>
            <button
              onClick={() => handleWishlist(blog?._id || null)}
              className="btn btn-sm rounded-sm bg-gray-600 px-4 py-1 text-white hover:bg-gray-700 transition"
            >
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

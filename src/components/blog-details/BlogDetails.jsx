import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../utils/AuthProvider";
import toast from "react-hot-toast";
import Loading from "../miscellaneous/Loading";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch blog details
  const fetchBlogDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/blog/${id}`
      );
      setBlog(data);
    } catch (error) {
      toast.error("Failed to fetch blog details");
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments for the blog
  const fetchComments = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/comments?blogId=${id}`
      );
      setComments(data);
    } catch (error) {
      toast.error("Failed to fetch comments");
    }
  };

  useEffect(() => {
    fetchBlogDetails();
    fetchComments();
  }, [id, comments]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return toast.error("Comment cannot be empty!");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/comments`,
        {
          blogId: id,
          userEmail: user?.email,
          userName: user?.displayName,
          userProfilePic: user?.photoURL,
          commentText,
          createdAt: new Date(),
        }
      );
      setComments((prev) => [...prev, data]);
      setCommentText("");
      toast.success("Comment added!");
    } catch (error) {
      toast.error("please sign in before comment");
      navigate("/auth/sign-in");
    }
  };

  // Navigate to update page
  const handleUpdate = () => {
    navigate(`/blog-update/${id}`);
  };

  if (loading) return <Loading />;

  if (!blog)
    return (
      <p className="text-center text-gray-500">Blog not found or deleted.</p>
    );

  // Check if the user is the author of the blog
  const isAuthor = user?.email === blog?.authorEmail;

  return (
    <div
      data-aos="zoom-in"
      className="container mx-auto mt-20 py-4 sm:w-full md:w-5/6 lg:w-4/6"
    >
      <Helmet>
        <title>Blog Details || A Blogs Web Application</title>
      </Helmet>
      {/* Blog Details Section */}
      <div className="mt-12 mx-4 shadow-sm rounded-sm p-6 bg-gradient-to-r from-indigo-50 via-white to-gray-50">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
          {blog?.title}
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div>
            <p className="text-sm font-semibold">
              Category:{" "}
              <span className="font-semibold text-indigo-600">
                {blog?.category}
              </span>
            </p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-600">
              <span className="font-bold text-gray-700">
                {blog?.authorName}
              </span>
            </h2>
            <p className="text-sm text-gray-500">{blog?.authorEmail}</p>
          </div>
        </div>
        <img
          src={blog?.imageUrl}
          alt={blog?.title}
          className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover my-6 rounded shadow-sm"
        />
        <p className="text-gray-700 text-base sm:text-lg md:leading-relaxed mb-6">
          {blog?.description}
        </p>

        {/* Conditional Update Button */}
        {isAuthor && (
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-indigo-600 text-white rounded-sm hover:bg-indigo-700"
          >
            Update Blog
          </button>
        )}
      </div>

      {/* Comments Section */}
      <div className="py-12 mx-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-6">
          Comments
        </h2>
        {!isAuthor ? (
          <form
            onSubmit={handleCommentSubmit}
            className="flex flex-col gap-4 mb-8 bg-gradient-to-l from-indigo-50 via-white to-gray-50 p-4 rounded-sm shadow-sm"
          >
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700 text-sm"
              placeholder="Write your comment here..."
              rows="4"
            />
            <button
              type="submit"
              className="self-end px-4 py-2 bg-indigo-600 text-white rounded-sm hover:bg-indigo-700"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <p className="text-center text-red-500">
            You cannot comment on your own blog.
          </p>
        )}

        {/* Display Comments */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="p-4 bg-gray-50 rounded-sm shadow flex flex-col sm:flex-row items-start gap-4 hover:shadow-md transition-shadow"
            >
              <img
                src={comment?.userProfilePic}
                alt={comment?.userName}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-indigo-500"
              />
              <div>
                <p className="text-gray-900 font-semibold text-sm sm:text-lg">
                  {comment?.userName}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mb-2">
                  {comment?.createdAt
                    ? format(new Date(comment?.createdAt), "PPpp")
                    : "Date not available"}
                </p>
                <p className="text-gray-700 text-sm">{comment?.commentText}</p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

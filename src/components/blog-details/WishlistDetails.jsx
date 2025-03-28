import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../utils/AuthProvider";
import toast from "react-hot-toast";
import Loading from "../miscellaneous/Loading";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";

const WishlistDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    // Fetch blog details
    const fetchWishListDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/wishlists/${id}`
        );
        setBlog(data);
      } catch (error) {
        toast.error("Failed to fetch blog details");
      } finally {
        setLoading(false);
      }
    };
    fetchWishListDetails();
  }, []);

  useEffect(() => {
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
    fetchComments();
  }, [comments]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return toast.error("Comment cannot be empty!");

    setCommentLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/comments`,
        {
          blogId: id,
          userEmail: user.email,
          userName: user.displayName,
          userProfilePic: user.photoURL,
          commentText,
          createdAt: new Date(),
        }
      );
      setComments((prev) => [...prev, data]);
      setCommentText("");
      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to post comment");
    } finally {
      setCommentLoading(false);
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
    <div data-aos="zoom-in-up" className="container lg:w-4/6 mx-auto mt-32 p-4">
      <Helmet>
        <title>Wishlist Details || A Blogs Web Application</title>
      </Helmet>
      {/* Blog Details Section */}
      <div className="mb-14 shadow-sm rounded-sm p-6 bg-gradient-to-l from-indigo-50 via-white to-gray-50">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{blog?.title}</h1>
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <div className=" px-3 py-1 rounded-full">
            <p className="text-sm font-semibold">
              Category:{" "}
              <span className="font-semibold text-indigo-600">
                {blog?.category}
              </span>
            </p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-600">
              Author:{" "}
              <span className="font-bold text-gray-800">
                {blog?.authorName}
              </span>
            </h2>
            <p className="text-sm text-gray-500">Email: {blog?.authorEmail}</p>
          </div>
        </div>
        <img
          src={blog?.imageUrl}
          alt={blog?.title}
          className="w-full h-80 object-cover my-6 rounded shadow-sm"
        />
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {blog?.description}
        </p>

        {/* Conditional Update Button */}
        {isAuthor && (
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Update Blog
          </button>
        )}
      </div>

      {/* Comments Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Comments</h2>
        {!isAuthor ? (
          <form
            onSubmit={handleCommentSubmit}
            className="flex flex-col gap-4 mb-8 bg-gray-50 p-4 rounded-sm shadow-sm"
          >
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700 text-sm"
              placeholder="Write your comment here..."
              rows="4"
            />
            {commentLoading ? (
              <button
                disabled
                className="self-end px-4 py-2 bg-gray-400 text-white rounded-sm cursor-not-allowed"
              >
                Posting...
              </button>
            ) : (
              <button
                type="submit"
                className="self-end px-4 py-2 bg-indigo-600 text-white rounded-sm hover:bg-indigo-700"
              >
                Post Comment
              </button>
            )}
          </form>
        ) : (
          <p className="text-center text-red-500">
            You cannot comment on your own blog.
          </p>
        )}

        {/* Display Comments */}
        <div className="space-y-6">
          {comments?.map((comment) => (
            <div
              key={comment._id}
              className="p-4 bg-gray-50 rounded-sm shadow flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <img
                src={comment?.userProfilePic}
                alt={comment?.userName}
                className="w-12 h-12 rounded-full border-2 border-indigo-500"
              />
              <div>
                <p className="text-gray-900 font-semibold text-lg">
                  {comment?.userName}
                </p>
                <p className="text-sm text-gray-500 mb-2">
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

export default WishlistDetails;

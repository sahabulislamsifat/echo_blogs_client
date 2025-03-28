import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../miscellaneous/Loading";
import { Helmet } from "react-helmet-async";

const BlogUpdate = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  const fetchBlogData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/${id}`);
      setBlog(res.data);
    } catch (error) {
      toast.error("Failed to fetch blog data.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const updatedBlog = Object.fromEntries(formData.entries());

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/update-blog/${id}`,
        updatedBlog
      );
      toast.success("Blog updated successfully!");
      navigation("/all-blogs");
    } catch (error) {
      toast.error("Failed to update blog.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!blog) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 p-4 ">
      <Helmet>
        <title>Update Blog || A Blogs Web Application</title>
      </Helmet>
      <div className="max-w-3xl mx-auto p-6 mt-14 bg-white shadow-sm bg-gradient-to-l from-indigo-50 via-white to-gray-50 rounded">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 text-center mb-6">
          Update Blog
        </h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={blog.title}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-gray-700 font-medium"
            >
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              defaultValue={blog.imageUrl}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={blog.category}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400"
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="createdAt"
              className="block text-gray-700 font-medium"
            >
              Select a Date:
            </label>
            <input
              type="date"
              id="createdAt"
              name="createdAt"
              defaultValue={blog.createdAt?.split("T")[0]}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          <div>
            <label
              htmlFor="shortDescription"
              className="block text-gray-700 font-medium"
            >
              Short Description
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              defaultValue={blog.shortDescription}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="longDescription"
              className="block text-gray-700 font-medium"
            >
              Long Description
            </label>
            <textarea
              id="longDescription"
              name="longDescription"
              defaultValue={blog.longDescription}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-indigo-400 focus:border-indigo-400"
              rows="6"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-sm hover:bg-indigo-700 transition"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogUpdate;

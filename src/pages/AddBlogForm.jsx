import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../utils/AuthProvider";
import useAxiosInstance from "../hooks/useAxiosInstance";
import { Helmet } from "react-helmet-async";

const AddBlogForm = () => {
  const axiosInstance = useAxiosInstance();

  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    uid: user?.uid,
    authorEmail: user?.email,
    authorName: user?.displayName,
    title: "",
    imageUrl: "",
    category: "",
    shortDescription: "",
    longDescription: "",
    createdAt: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Make a POST request
      await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/add-blog`,
        formData
      );
      setIsSubmitted(true);
      toast.success("Blog Added Successfully!!");

      // Reset form after successful submission
      setFormData({
        title: "",
        imageUrl: "",
        category: "",
        shortDescription: "",
        longDescription: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-16 p-4">
      <Helmet>
        <title>Add Blog || A Blogs Web Application</title>
      </Helmet>
      <div
        data-aos="zoom-in"
        className="max-w-3xl mx-auto p-6 mt-1 lg:mb-36 shadow-sm rounded-sm bg-gradient-to-r from-indigo-50 via-white to-gray-50"
      >
        <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-700 mb-6">
          Add New Blog
        </h2>
        {isSubmitted && (
          <div className="text-green-600 font-medium mb-4">
            Blog submitted successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Image URL */}
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
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter image URL"
              required
            />
          </div>

          {/* Category */}
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
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
              <option value="Business">Business</option>
              <option value="Business">Miscellaneous</option>
            </select>
          </div>

          {/* Date Field  */}
          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium">
              Select a Date:
            </label>
            <input
              type="date"
              id="date"
              name="createdAt"
              value={formData.createdAt}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Short Description */}
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
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none"
              placeholder="Write a short description"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Long Description */}
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
              value={formData.longDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none"
              placeholder="Write a detailed description"
              rows="6"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-sm hover:bg-indigo-700 transition"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogForm;

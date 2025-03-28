import axios from "axios";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/featured-blogs`
      );
      setBlogs(res.data);
      // console.log(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div className="mt-24 ">
      <Helmet>
        <title>Featured Blogs || A Blogs Web Application</title>
      </Helmet>
      <div data-aos="fade-up" className="max-w-7xl mx-auto rounded-sm p-8">
        <h1 className="text-3xl md:text-4xl text-center font-extrabold mb-6 text-gray-700 tracking-wide">
          Featured Blogs
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
            <thead className="bg-gradient-to-r from-indigo-50 via-white to-gray-50 text-indigo-700">
              <tr>
                <th className="text-left px-6 py-3 border-b font-semibold">
                  Title
                </th>
                <th className="text-left px-6 py-3 border-b font-semibold">
                  Short Description
                </th>
                <th className="text-left px-6 py-3 border-b font-semibold">
                  Category
                </th>
                <th className="text-left px-6 py-3 border-b font-semibold">
                  Word Count
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.slice(0, 10).map((blog, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-indigo-50 transition`}
                  >
                    <td className="px-6 py-3 border-b text-gray-700">
                      {blog.title}
                    </td>
                    <td className="px-6 py-3 border-b text-gray-600">
                      {blog.shortDescription}...
                    </td>
                    <td className="px-6 py-3 border-b text-gray-600">
                      {blog.category}
                    </td>
                    <td className="px-6 py-3 border-b text-gray-600">
                      {blog.wordCount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-gray-500 px-6 py-6"
                  >
                    No featured blogs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogs;

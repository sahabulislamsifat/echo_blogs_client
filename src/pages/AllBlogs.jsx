import React, { useState, useEffect } from "react";
import BlogCard from "../components/blog-card/BlogCard";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
      setBlogs(data);
      setFilteredBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterBlogs(term, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterBlogs(searchTerm, category);
  };

  const filterBlogs = (term, category) => {
    let filtered = blogs;

    if (category) {
      filtered = filtered.filter((blog) => blog.category === category);
    }

    if (term) {
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
  };

  const handleWishlist = (blogId) => {
    console.log(`Added blog with ID ${blogId} to wishlist`);
    // Add logic to update wishlist collection in the database
  };

  const handleDetails = (blogId) => {
    console.log(`Navigate to details of blog ID ${blogId}`);
    // Add navigation logic to the blog details page
  };

  return (
    <div className="min-h-screen mt-20 p-4">
      <Helmet>
        <title>All Blogs || A Blogs Web Application</title>
      </Helmet>
      <div className="p-6">
        <h1 className="text-3xl lg:text-start lg:text-4xl font-bold text-gray-700 text-center mb-6">
          All Blogs
        </h1>

        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full lg:w-1/2 px-4 py-2 border rounded-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none border-slate-300"
            placeholder="Search by blog title..."
          />

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full md:w-1/4 px-4 py-2 border rounded-sm focus:ring-1 focus:ring-indigo-400"
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* Blog List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              onWishlist={() => handleWishlist(blog._id)}
              onDetails={() => handleDetails(blog._id)}
            />
          ))}
        </div>

        {/* No Blogs Found */}
        {filteredBlogs.length === 0 && (
          <p className="text-center text-gray-600 mt-6">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;

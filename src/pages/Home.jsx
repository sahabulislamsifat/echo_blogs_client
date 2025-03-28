import React, { useEffect, useState } from "react";
import Banner from "../components/banner/Banner";
import Newsletter from "../components/newsletter/Newsletter";
import BlogCard from "../components/blog-card/BlogCard";
import axios from "axios";
import Author from "../components/author-section/Author";
import TipsAndResources from "../components/miscellaneous/TipsAndResearches";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from the backend
    fetchRecentBlogs();
  }, []);

  const fetchRecentBlogs = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/recent-blogs`
    );
    setBlogs(data);
  };

  return (
    <div>
      <Helmet>
        <title>Home || A Blogs Web Application</title>
      </Helmet>
      {/* Banner Section  */}
      <Banner></Banner>
      {/* Recent Blogs Section  */}
      <div>
        <h2 className="text-3xl text-gray-700 text-center lg:text-4xl font-bold py-8">
          Recent Blogs
        </h2>
        {/* Blog List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-1 px-5">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog}></BlogCard>
          ))}
        </div>
      </div>
      <div>
        {/* Author Section  */}
        <Author></Author>
      </div>
      {/* Another extra  */}
      <TipsAndResources></TipsAndResources>
      {/* Newsletter Section  */}
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;

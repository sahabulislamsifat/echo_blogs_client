import React from "react";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  return (
    <div className="h-[250px] mt-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
          Welcome to EchoBlogs
        </h1>
        <div className="my-5 text-md md:text-xl">
          where -
          <Typewriter
            words={[
              " Inspiring stories, insightful blogs,",
              " and trending topics—explore",
              " engage, and stay informed!",
            ]}
          ></Typewriter>
        </div>
        <div className=" mt-8 flex justify-center space-x-4">
          <a
            href="/all-blogs"
            className="btn btn-sm  bg-white border-none text-indigo-700 font-semibold px-6 py-2 rounded-sm shadow-sm hover:bg-gray-100 transition"
          >
            Explore Blogs
          </a>
          <a
            href="/add-blog"
            className=" btn btn-sm border-none bg-indigo-600 text-white font-semibold px-6 py-2 rounded-sm shadow-sm hover:bg-indigo-700 transition"
          >
            Create Blog
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;

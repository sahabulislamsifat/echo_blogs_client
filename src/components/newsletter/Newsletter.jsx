import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="bg-gradient-to-l from-indigo-50 via-white to-gray-50 py-12 px-6 md:px-16 lg:px-24 mb-6"
    >
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mt-4">
          Stay updated with the latest blogs, tips, and insights directly in
          your inbox.
        </p>
        <form
          className="mt-6 flex flex-row items-center justify-center "
          onSubmit={handleSubscribe}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border-none bg-gray-200 md:w-2/3 px-4 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-200"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-sm shadow hover:bg-indigo-700 transition duration-300"
          >
            Subscribe
          </button>
        </form>
        {message && <p className="mt-4 text-indigo-600">{message}</p>}
      </div>
    </div>
  );
};

export default Newsletter;

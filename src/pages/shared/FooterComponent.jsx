import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const FooterComponent = () => {
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
    <div>
      <footer className="py-5">
        <div className="container mx-auto">
          <div className=" px-6 md:px-12 lg:px-2 flex flex-col md:flex-row justify-between gap-8">
            {/* Column 1: About */}
            <div>
              <h2 className="text-2xl text-indigo-600 font-bold mb-4">
                EchoBlogs
              </h2>
              <p className="text-gray-700 flex flex-col mb-4">
                Dive into stories that inspire, inform,
                <span>
                  {" "}
                  and ignite your curiosity. Explore a world of knowledge with
                  EchoBlogs.
                </span>
              </p>
              <a href="#about" className="link link-hover">
                Helpline: +880 1632165523
              </a>
            </div>

            {/* Column 2: Quick Links */}
            {/* <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    href="/"
                    className="text-gray-600 hover:text-indigo-400 transition"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href="/blogs"
                    className="text-gray-600 hover:text-indigo-400 transition"
                  >
                    About Dev
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href="/contact"
                    className="text-gray-600 hover:text-indigo-400 transition"
                  >
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div> */}

            {/* Column 3: Subscribe */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-600 mb-4">
                Subscribe to our newsletter and never miss an update.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-row"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Your email"
                  className="px-4 bg-gray-200 py-2 rounded-sm border-none focus:ring-1 focus:ring-indigo-400 text-gray-800 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-sm hover:bg-indigo-700 transition"
                >
                  Subscribe
                </button>
              </form>
              {message && <p className="mt-4 text-indigo-600">{message}</p>}
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="border-t border-gray-400 mt-5 pt-6 text-center text-slate-600">
          <p>© {new Date().getFullYear()} EchoBlogs. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FooterComponent;

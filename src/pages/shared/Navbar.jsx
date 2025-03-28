import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../utils/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Log out Successful");
    } catch (error) {
      toast.error(`Error during logout: ${error.message}`);
    }
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/add-blog", label: "Add Blog" },
    { path: "/all-blogs", label: "All Blogs" },
    { path: "/featured-blogs", label: "Featured Blogs" },
    { path: "/wishlist", label: "Wishlist" },
  ];

  const NavLinks = ({ className }) =>
    navItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          `${className} ${
            isActive ? "text-indigo-600 font-semibold" : "text-gray-700"
          } hover:text-indigo-600 border-none shadow-none text-[13px] bg-white transition duration-500`
        }
      >
        {item.label}
      </NavLink>
    ));

  return (
    <section className="navbar fixed top-0 bg-base-100 left-0 z-40">
      <div className="container navbar mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Dropdown for Mobile */}
          <div className="dropdown">
            <button
              tabIndex={0}
              className="mr-3 lg:hidden"
              aria-label="Open Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-4 z-[1] bg-base-100 w-32 space-y-1 rounded-sm"
            >
              <NavLinks className="btn btn-xs  rounded-sm" />
            </ul>
          </div>
          {/* Logo */}
          <a href="/">
            <h1 className="text-xl md:text-2xl">
              <span className="font-bold text-indigo-600 lg:text-3xl hover:text-indigo-500 transition-all duration-300">
                Echo
              </span>
              <span className=" lg:text-3xl font-semibold transition-all duration-300">
                Blogs
              </span>
            </h1>
            <p className="text-xs lg:text-sm">
              Resonating Voices, Inspiring Change
            </p>
          </a>
        </div>
        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4 px-1">
            <NavLinks className="btn btn-xs rounded-sm" />
          </ul>
        </div>
        {/* Navbar End */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
                aria-label="User Menu"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={user?.photoURL || "default-avatar.png"}
                  />
                </div>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-sm w-52 p-2 gap-1 space-y-2"
              >
                <li className="btn btn-xs bg-white text-gray-800 rounded-none shadow-none border-none">
                  {user.displayName}
                </li>
                <li className="border-none text-gray-800 btn btn-xs bg-white rounded-none shadow-none">
                  {user.email}
                </li>
                <li>
                  <Link
                    onClick={handleLogout}
                    className="bg-red-600 btn pb-3 btn-xs border-none w-full text-white hover:bg-red-700 rounded-sm"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink
              to="/auth/sign-in"
              className="btn bg-indigo-600 rounded-sm transition-all duration-300 hover:bg-indigo-500 text-white btn-sm border-none"
            >
              Join Now
            </NavLink>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;

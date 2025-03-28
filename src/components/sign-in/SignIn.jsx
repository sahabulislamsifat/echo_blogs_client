import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthProvider";
import toast from "react-hot-toast";
import ContinueWithGoogle from "../sign-up/ContinueWithGoogle";
import signInImage from "../../assets/sign-in.png";

const SignIn = () => {
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleSignIn = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      await signIn(email, password);
      setKeepLoggedIn(true);
      const redirectPath = location.state?.form || "/";
      navigate(redirectPath);
      toast.success("Welcome Back");
    } catch (error) {
      toast.error("Sign-in failed");
      console.error("Sign-in error:", error.message);
    }
  };

  return (
    <div
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay="100"
      data-aos-offset="0"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center p-4"
    >
      <div className="flex flex-row-reverse">
        {/* Form Section */}
        <div className="w-full bg-base-100 max-w-md shadow-sm rounded-sm p-6 sm:p-8 md:mr-8">
          <h1 className="text-2xl font-bold text-indigo-600 mb-4 text-center ">
            Welcome Back!
          </h1>
          <p className="text-gray-700 mb-6 text-center md:text-left">
            Every login is a step closer to sharing, learning, and inspiring.
            Welcome back to where your voice matters.
          </p>
          <form onSubmit={handleSignIn}>
            {/* Email Input */}
            <div className="mb-4">
              <label className=" block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="border-slate-200 bg-base-100 border w-full px-3 py-2 rounded-sm shadow-sm focus:ring-indigo-200 focus:ring-1 focus:outline-none"
              />
            </div>
            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="border-slate-200 bg-base-100 border w-full px-3 py-2 rounded-sm shadow-sm focus:ring-indigo-200 focus:ring-1 focus:outline-none"
              />
            </div>
            {/* Keep Logged In & Forget Password */}
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600 border-gray-200 rounded"
                  checked={keepLoggedIn}
                  onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                />
                <span className="ml-2 text-gray-700">Keep me logged in</span>
              </label>
              <Link
                to={"/resetPassword"}
                className="text-sm text-indigo-600 hover:underline"
              >
                Forget password?
              </Link>
            </div>

            {/* Sign-In Button */}
            <button className="w-full bg-indigo-600 text-white py-2 rounded-sm hover:bg-indigo-700 transition">
              Sign In
            </button>
          </form>

          {/* Register & Google Sign-In */}
          <div className="text-center mt-6">
            <p className="text-slate-600 text-sm">
              Don’t have an account?{" "}
              <Link
                to={"/auth/sign-up"}
                className="font-semibold text-indigo-600 hover:underline"
              >
                Register here
              </Link>
            </p>
            <div className=" relative flex items-center mt-4">
              <div className=" flex-grow border-t border-gray-200"></div>
              <span className=" mx-4 text-gray-500">Or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <ContinueWithGoogle></ContinueWithGoogle>
          </div>
        </div>
        {/* Sign-in Image  */}
        <div className="hidden lg:block">
          <img className="h-[600px] w-[600px]" src={signInImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;

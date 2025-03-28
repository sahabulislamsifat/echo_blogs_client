import { useContext } from "react";
import { AuthContext } from "../../utils/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import ContinueWithGoogle from "./ContinueWithGoogle";
import signUpImage from "../../assets/crate.png";

const validPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

const SignUp = () => {
  const { signUp, profileUpdate } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const photo = event.target.photo.value;
    const password = event.target.password.value;

    try {
      if (!validPasswordRegex.test(password)) {
        toast.error(
          "Password must be at least 6 characters long, include at least one uppercase letter, and one lowercase letter."
        );
        return;
      }

      const result = await signUp(email, password);
      if (result) {
        await profileUpdate({ displayName: name, photoURL: photo });
        navigate("/");
        return toast.success("Successfully Sign up");
      } else {
        throw new Error("Failed to sign up");
      }
    } catch (error) {
      toast.error("Sign-up failed");
      console.error(error.message);
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
          <h1 className="text-2xl font-bold text-indigo-600 mb-4 text-center md:text-left">
            Registration
          </h1>
          <p className="mb-6 text-center text-slate-600 md:text-left">
            Every great story starts with a single step. Register now and become
            a part of our blogging journey!
          </p>

          <form onSubmit={handleSignUp}>
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                className="border-slate-200 bg-base-100 border w-full px-3 py-2 rounded-sm shadow-sm focus:ring-indigo-200 focus:ring-1 focus:outline-none"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="border-slate-200 bg-base-100 border w-full px-3 py-2 rounded-sm shadow-sm focus:ring-indigo-200 focus:ring-1 focus:outline-none"
              />
            </div>

            {/* Photo URL Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo URL
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Enter photo URL"
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

            {/* Register Button */}
            <button className="w-full bg-indigo-600 text-white py-2 rounded-sm hover:bg-indigo-700 transition">
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-4">
            <p className="text-slate-600 text-sm">
              Already have an account?{" "}
              <Link
                to={"/auth/sign-in"}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Sign in here
              </Link>
            </p>
            <div className="relative flex items-center mt-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-gray-500">Or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <ContinueWithGoogle></ContinueWithGoogle>
          </div>
        </div>
        {/* Sign-up Image  */}
        <div className="hidden lg:block">
          <img
            className="object-cover h-[700px]"
            src={signUpImage}
            alt="sign up"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;

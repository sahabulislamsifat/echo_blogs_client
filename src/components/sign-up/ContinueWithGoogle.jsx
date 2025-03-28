import { useContext } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthProvider";

const ContinueWithGoogle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { continueWithGoogle } = useContext(AuthContext);

  const handleGoogle = async () => {
    try {
      await continueWithGoogle();
      const redirectPath = location.state?.form || "/";
      navigate(redirectPath);
      toast.success("Welcome!");
    } catch (error) {
      toast.error("Sign-in failed");
      console.error("Google sign-in error:", error.message);
    }
  };

  return (
    <div className="border rounded-sm">
      <button
        onClick={handleGoogle}
        className="flex items-center justify-center bg-gray-200 border-none py-2 px-4 w-full hover:bg-gray-300"
      >
        <img
          src="https://loodibee.com/wp-content/uploads/Google-Symbol.png"
          alt="Google Logo"
          className="w-5 h-5 mr-2"
        />
        Sign In with Google
      </button>
    </div>
  );
};

export default ContinueWithGoogle;

import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://echo-blogs-server.vercel.app",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosInstance = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        logOut().then(() => {
          navigate("/auth/sign-in");
        });
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;

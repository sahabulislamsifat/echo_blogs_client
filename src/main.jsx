import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./utils/AuthProvider";
import Router from "./utils/Router";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { HelmetProvider } from "react-helmet-async";
AOS.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={Router}></RouterProvider>
        <Toaster position="top-right" reverseOrder="false"></Toaster>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);

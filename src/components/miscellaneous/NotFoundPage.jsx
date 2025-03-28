import React from "react";
import { Link, useRouteError } from "react-router-dom";

const NotFoundPage = () => {
  const error = useRouteError();
  const errorMessage =
    error?.statusText || "The requested resource was not found.";

  return (
    <section className="h-screen">
      <div className="flex flex-col justify-center items-center h-screen text-center bg-gray-50 dark:bg-gray-800 dark:text-slate-300 text-slate-800">
        <h1 className="text-4xl font-extrabold mb-4">
          404 - Page Not Found!!!
        </h1>
        <p className="text-lg font-semibold mb-6">{errorMessage}</p>
        <div className="flex justify-center">
          <Link
            to={"/"}
            aria-label="Go back to the homepage"
            className="px-6 py-3 text-lg font-bold bg-indigo-500 rounded-lg hover:bg-green-500 hover:text-gray-800 text-white transition duration-300"
          >
            👈 Go Back Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;

import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="px-4 mx-auto max-w-screen-md text-center">
        <h1 className="mb-8 text-8xl font-extrabold text-yellow-500 lg:text-9xl animate-pulse">
          404
        </h1>
        <p className="mb-6 text-3xl font-bold text-white lg:text-4xl">
          Oops! Page Not Found
        </p>
        <p className="mb-6 text-lg font-bold text-gray-400 text-white">
          Sorry, we can't find the page you're looking for. You might have the
          wrong URL or the page might have been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-lg font-medium text-black bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 focus:outline-none transition-all duration-200"
        >
          Back to Homepage
        </Link>
      </div>
    </section>
  );
};

export default Error;

// src/pages/NotFoundPage.tsx

import { Link } from "react-router";


export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

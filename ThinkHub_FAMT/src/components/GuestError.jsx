import { Link } from "react-router-dom";

function GuestError() {
  return (
    <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-xl text-center">
      {/* Lock Icon */}
      <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
        <span className="text-2xl text-white">🔒</span>
      </div>

      {/* Title */}
      <p className="text-gray-800 font-bold text-xl mb-2 tracking-wide">
        Authentication Required
      </p>

      {/* Subtitle */}
      <p className="text-gray-600 mb-7 text-sm md:text-base">
        You need to be logged in to post a question.
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <Link
          to="/login"
          className="px-6 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 
                     hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Go to Login
        </Link>

        <Link
          to="/"
          className="px-6 py-2.5 rounded-lg font-semibold text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 
                     hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default GuestError;

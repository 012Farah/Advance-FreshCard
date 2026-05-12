import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md w-full">
        {/* Illustration */}
        <div className="relative flex justify-center mb-8">
          <div className=" flex ">
            <div className="text-white text-6xl">😞</div>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Oops! Page Not Found
        </h1>

        <p className="text-gray-500 text-sm mb-6">
          The page you're looking for seems to have gone shopping!
          <br />
          Don't worry, our fresh products are still available for you.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Link to="/" >
          <button
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 
                       text-white px-5 py-2 rounded-md text-sm font-medium"
          >
            🏠 Back to Home
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

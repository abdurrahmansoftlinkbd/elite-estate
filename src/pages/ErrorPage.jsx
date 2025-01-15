import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center font-inter">
      <h2 className="text-7xl font-montserrat font-bold mb-2">404</h2>
      <p className="text-2xl">Sorry, we were unable to find that page</p>
      <p className="mt-4">
        Start from{" "}
        <Link
          to="/"
          className="ml-2 btn bg-gray-500 border-gray-500 text-white hover:bg-gray-400 hover:border-gray-400"
        >
          <FaArrowLeft /> Home
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;

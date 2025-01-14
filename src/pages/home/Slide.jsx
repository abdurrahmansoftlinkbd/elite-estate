import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaArrowRight } from "react-icons/fa";

const Slide = ({ image, text, desc, btn }) => {
  return (
    <div
      className="w-full bg-center bg-cover h-[38rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="relative w-full h-full bg-gray-900/70">
        <div className="w-3/4 absolute top-1/4 left-16">
          <h2 className="text-3xl lg:text-6xl font-playfair font-semibold text-white">
            {text}
          </h2>
          <p className="w-4/5 font-inter text-white mt-4 text-xl">{desc}</p>
          {btn && (
            <Link
              to="/queries"
              className="btn font-inter bg-default border-default text-white hover:bg-dark hover:border-dark mt-6"
            >
              {btn} <FaArrowRight />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

Slide.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  desc: PropTypes.string,
  btn: PropTypes.string,
};

export default Slide;

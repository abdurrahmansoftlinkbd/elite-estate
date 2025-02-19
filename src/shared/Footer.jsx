import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer container w-11/12 mx-auto text-white py-10">
        <aside>
          <Link to="/" className="text-4xl font-bold flex items-center gap-2">
            <div className="w-12">
              <img
                src="https://i.ibb.co.com/0BkVPkm/investment.png"
                alt="logo"
                className="w-full"
              />
            </div>
            <h2 className="font-playfair">Elite Estate</h2>
          </Link>
          <p className="mt-2">Discover Your Dream Home with Us</p>
        </aside>
        <nav>
          <h6 className="footer-title opacity-100 text-lg">Pages</h6>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/allProperties" className="link link-hover">
            All Properties
          </Link>
          <Link to="/news" className="link link-hover">
            News
          </Link>
          <Link to="/contact" className="link link-hover">
            Contact
          </Link>
          <Link to="/dashboard" className="link link-hover">
            Dashboard
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title opacity-100 text-lg">Contact Info</h6>
          <p>
            Support:{" "}
            <Link to="/" className="hover:underline">
              web@eliteestate.com
            </Link>
          </p>
          <p className="mb-2">Helpline: +01 234 56789</p>
          <div className="grid grid-flow-col gap-4">
            <a href="https://x.com/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.275c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.275h-3v-5.5c0-1.105-.895-2-2-2s-2 .895-2 2v5.5h-3v-10h3v1.5c.774-1.047 2.071-1.5 3.5-1.5 2.485 0 4.5 2.015 4.5 4.5v5.5z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
      <footer className="footer footer-center bg-default text-white p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            <Link
              className="ml-1 text-white font-semibold font-playfair hover:underline"
              to="/"
            >
              Elite Estate
            </Link>
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;

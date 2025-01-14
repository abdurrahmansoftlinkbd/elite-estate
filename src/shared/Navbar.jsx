import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 font-semibold transition-colors duration-200 ease-in-out rounded-md ${
            isActive
              ? "font-bold bg-white text-default rounded-md"
              : "hover:bg-white hover:text-default hover:rounded-md"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/allProperties"
        className={({ isActive }) =>
          `px-3 py-2 font-semibold transition-colors duration-200 ease-in-out rounded-md ${
            isActive
              ? "font-bold bg-white text-default rounded-md"
              : "hover:bg-white hover:text-default hover:rounded-md"
          }`
        }
      >
        All Properties
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `px-3 py-2 font-semibold transition-colors duration-200 ease-in-out rounded-md ${
            isActive
              ? "font-bold bg-white text-default rounded-md"
              : "hover:bg-white hover:text-default hover:rounded-md"
          }`
        }
      >
        Dashboard
      </NavLink>
    </>
  );

  return (
    <div className="navbar container w-11/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link className="flex items-center gap-1">
          <div className="w-10">
            <img
              src="https://i.ibb.co.com/0BkVPkm/investment.png"
              alt="elite-estate-logo"
              className="w-full"
            />
          </div>
          <h1 className="text-3xl font-bold font-playfair">Elite Estate</h1>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal items-center gap-4 px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;

import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../providers/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

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
            {links}
            {user && (
              <>
                <NavLink
                  to="/allProperties"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "font-bold underline"
                        : "hover:underline font-medium"
                    }`
                  }
                >
                  All Properties
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "font-bold underline"
                        : "hover:underline font-medium"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </>
            )}
            {user ? (
              <Link className="hover:underline font-medium">Log out</Link>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "font-bold underline"
                      : "hover:underline font-medium"
                  }`
                }
              >
                Login
              </NavLink>
            )}
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
          {user && (
            <>
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
          )}
        </ul>
      </div>
      <div className="navbar-end gap-4">
        {user && user?.email ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-14 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  title={user?.displayName}
                  src={user?.photoURL}
                  className="w-full"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow text-zinc-950"
            >
              <li>
                <a className="justify-between">{user?.displayName}</a>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
        {user && user?.email ? (
          <button onClick={logOut} className="btn hidden md:flex">
            Log out
          </button>
        ) : (
          <>
            <Link to="/login" className="btn hidden md:flex">
              Log in
            </Link>
            <Link to="/register" className="btn hidden md:flex">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

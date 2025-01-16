import { useContext, useEffect, useState } from "react";
import { BsBuildingsFill } from "react-icons/bs";
import { FaUsers, FaUserTie } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import AuthContext from "../providers/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState({});
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get(`/users/role/${user?.email}`).then((res) => {
      setRole(res.data);
    });
  }, [axiosPublic, user?.email]);

  console.log(role.role);

  return (
    <div className="drawer font-inter lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-default text-white font-bold min-h-full w-80 p-4">
          {/* Sidebar content here */}
          {role.role === "admin" && (
            <>
              <NavLink to="/dashboard/adminProfile">
                <li>
                  <a>
                    <FaUserTie /> Admin Profile
                  </a>
                </li>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `font-semibold transition-colors duration-200 ease-in-out rounded-md ${
                    isActive
                      ? "font-bold bg-white text-default rounded-md"
                      : "hover:bg-white hover:text-default hover:rounded-md"
                  }`
                }
                to="/dashboard/manageProperties"
              >
                <li>
                  <a>
                    <BsBuildingsFill /> Manage Properties
                  </a>
                </li>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `font-semibold transition-colors duration-200 ease-in-out rounded-md ${
                    isActive
                      ? "font-bold bg-white text-default rounded-md"
                      : "hover:bg-white hover:text-default hover:rounded-md"
                  }`
                }
                to="/dashboard/manageUsers"
              >
                <li>
                  <a>
                    <FaUsers /> Manage Users
                  </a>
                </li>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `font-semibold transition-colors duration-200 ease-in-out rounded-md ${
                    isActive
                      ? "font-bold bg-white text-default rounded-md"
                      : "hover:bg-white hover:text-default hover:rounded-md"
                  }`
                }
                to="/dashboard/manageReviews"
              >
                <li>
                  <a>
                    <MdReviews /> Manage Reviews
                  </a>
                </li>
              </NavLink>
              <div className="divider"></div>
              <Link to="/">
                <li>
                  <a>Back to Home</a>
                </li>
              </Link>
            </>
          )}
          {role.role === "agent" && (
            <>
              <NavLink to="/dashboard/agentProfile">
                <li>
                  <a>
                    <FaUserTie /> Agent Profile
                  </a>
                </li>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `font-semibold transition-colors duration-200 ease-in-out rounded-md ${
                    isActive
                      ? "font-bold bg-white text-default rounded-md"
                      : "hover:bg-white hover:text-default hover:rounded-md"
                  }`
                }
                to="/dashboard/addProperty"
              >
                <li>
                  <a>
                    <BsBuildingsFill /> Add Property
                  </a>
                </li>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `font-semibold transition-colors duration-200 ease-in-out rounded-md ${
                    isActive
                      ? "font-bold bg-white text-default rounded-md"
                      : "hover:bg-white hover:text-default hover:rounded-md"
                  }`
                }
                to="/dashboard/myAddedProperties"
              >
                <li>
                  <a>
                    <FaUsers /> My Added Properties
                  </a>
                </li>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `font-semibold transition-colors duration-200 ease-in-out rounded-md ${
                    isActive
                      ? "font-bold bg-white text-default rounded-md"
                      : "hover:bg-white hover:text-default hover:rounded-md"
                  }`
                }
                to="/dashboard/mySoldProperties"
              >
                <li>
                  <a>
                    <MdReviews /> My Sold Properties
                  </a>
                </li>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `font-semibold transition-colors duration-200 ease-in-out rounded-md ${
                    isActive
                      ? "font-bold bg-white text-default rounded-md"
                      : "hover:bg-white hover:text-default hover:rounded-md"
                  }`
                }
                to="/dashboard/requestedProperties"
              >
                <li>
                  <a>
                    <MdReviews /> Requested Properties
                  </a>
                </li>
              </NavLink>
              <div className="divider"></div>
              <Link to="/">
                <li>
                  <a>Back to Home</a>
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

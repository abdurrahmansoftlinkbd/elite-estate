import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";

const MainLayout = () => {
  return (
    <>
      <nav className="bg-default text-white font-inter py-1">
        <Navbar></Navbar>
      </nav>
      <Outlet></Outlet>
    </>
  );
};

export default MainLayout;

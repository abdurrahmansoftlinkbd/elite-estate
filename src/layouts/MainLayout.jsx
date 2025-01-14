import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";

const MainLayout = () => {
  return (
    <>
      <nav>
        <Navbar></Navbar>
      </nav>
      <Outlet></Outlet>
    </>
  );
};

export default MainLayout;

import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <>
      <nav className="bg-default sticky top-0 z-10 text-white font-inter py-1">
        <Navbar></Navbar>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
      <footer className="bg-default font-inter">
        <Footer></Footer>
      </footer>
    </>
  );
};

export default MainLayout;

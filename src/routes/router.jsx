import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
]);

export default router;

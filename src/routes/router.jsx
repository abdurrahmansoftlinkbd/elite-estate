import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import AddProperty from "../pages/Dashboard/Agent/AddProperty";
import AgentProfile from "../pages/Dashboard/Agent/AgentProfile";
import MyAddedProperties from "../pages/Dashboard/Agent/MyAddedProperties";
import UpdateProperty from "../pages/Dashboard/Agent/UpdateProperty";
import ManageProperties from "../pages/Dashboard/Admin/ManageProperties";
import PropertyDetails from "../pages/PropertyDetails";
import AllPropertiesPage from "../pages/AllPropertiesPage";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import Wishlist from "../pages/Dashboard/User/Wishlist";
import MakeOffer from "../pages/Dashboard/User/MakeOffer";
import PropertyBought from "../pages/Dashboard/User/PropertyBought";
import RequestedProperties from "../pages/Dashboard/Agent/RequestedProperties";
import ManageReviews from "../pages/Dashboard/Admin/ManageReviews";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "property/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails></PropertyDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "allProperties",
        element: (
          <PrivateRoute>
            <AllPropertiesPage></AllPropertiesPage>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "manageProperties",
        element: (
          <AdminRoute>
            <ManageProperties></ManageProperties>
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manageReviews",
        element: (
          <AdminRoute>
            <ManageReviews></ManageReviews>
          </AdminRoute>
        ),
      },
      {
        path: "agentProfile",
        element: (
          <AgentRoute>
            <AgentProfile></AgentProfile>
          </AgentRoute>
        ),
      },
      {
        path: "addProperty",
        element: (
          <AgentRoute>
            <AddProperty></AddProperty>
          </AgentRoute>
        ),
      },
      {
        path: "myAddedProperties",
        element: (
          <AgentRoute>
            <MyAddedProperties></MyAddedProperties>
          </AgentRoute>
        ),
      },
      {
        path: "updateProperty/:id",
        element: (
          <AgentRoute>
            <UpdateProperty></UpdateProperty>
          </AgentRoute>
        ),
      },
      {
        path: "requestedProperties",
        element: (
          <AgentRoute>
            <RequestedProperties></RequestedProperties>
          </AgentRoute>
        ),
      },
      {
        path: "myProfile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <PrivateRoute>
            <Wishlist></Wishlist>
          </PrivateRoute>
        ),
      },
      {
        path: "makeOffer/:id",
        element: (
          <PrivateRoute>
            <MakeOffer></MakeOffer>
          </PrivateRoute>
        ),
      },
      {
        path: "propertyBought",
        element: (
          <PrivateRoute>
            <PropertyBought></PropertyBought>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

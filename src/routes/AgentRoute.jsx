import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "../pages/Loading";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../providers/AuthContext";

const AgentRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: role = {}, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/role/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (role.role === "agent") return children;
  return <Navigate to="/dashboard" replace="true" />;
};

AgentRoute.propTypes = {
  children: PropTypes.element,
};

export default AgentRoute;

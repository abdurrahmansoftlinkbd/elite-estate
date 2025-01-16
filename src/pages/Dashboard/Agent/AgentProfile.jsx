import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../providers/AuthContext";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AgentProfile = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState({});
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get(`/users/role/${user?.email}`).then((res) => {
      setRole(res.data);
    });
  }, [axiosPublic, user?.email]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
      <div className="flex flex-col items-center space-y-4">
        <div>
          {user?.photoURL && (
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-gray-800">
            {user?.displayName}
          </h2>
          {role?.role && (
            <span className="px-3 py-1 text-sm font-medium bg-teal-100 text-default rounded-full">
              {role?.role.charAt(0).toUpperCase() + role?.role.slice(1)}
            </span>
          )}
          {user?.email && (
            <p className="text-gray-600 text-sm">{user?.email}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;

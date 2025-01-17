import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../../../providers/AuthContext";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const { data: userRole } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get(`/users/role/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  const isAdmin = userRole?.role === "admin";

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
      <div className="flex flex-col items-center space-y-4">
        {/* Profile Image */}
        <div>
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>
        {/* User Information */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">
            {user?.displayName}
          </h2>
          {/* Only show role for admin users */}
          {isAdmin && (
            <div className="flex items-center justify-center gap-2">
              <span className="px-4 py-1.5 text-sm font-semibold bg-teal-100 text-default rounded-full">
                Admin
              </span>
            </div>
          )}

          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

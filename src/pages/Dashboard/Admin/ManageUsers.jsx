import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageUsers = () =>
  //   {
  //   users,
  //   handleMakeAdmin,
  //   handleMakeAgent,
  //   handleMarkFraud,
  //   handleDeleteUser,
  //   }
  {
    const axiosSecure = useAxiosSecure();

    const {
      data: users = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axiosSecure.get("/users");
        return res.data;
      },
    });

    const handleMakeAdmin = (user) => {
      axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`${user.name} is an Admin now.`);
        } else {
          toast.error(`${user.name} is already an Admin`);
        }
      });
    };

    return (
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">
                  {user?.role ? user?.role : "User"}
                </td>
                <td className="flex space-x-2">
                  {user.role !== "fraud" ? (
                    <>
                      <button
                        className="btn btn-sm btn-success text-white"
                        onClick={() => handleMakeAdmin(user)}
                      >
                        Make Admin
                      </button>
                      <button
                        className="btn btn-sm btn-accent text-white"
                        // onClick={() => handleMakeAgent(user.id)}
                      >
                        Make Agent
                      </button>
                      {user.role === "agent" && (
                        <button
                          className="btn btn-sm btn-warning"
                          //   onClick={() => handleMarkFraud(user.id)}
                        >
                          Mark as Fraud
                        </button>
                      )}
                    </>
                  ) : (
                    <span className="text-red-500 font-semibold">Fraud</span>
                  )}
                  <button
                    className="btn btn-sm btn-error text-white"
                    // onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default ManageUsers;

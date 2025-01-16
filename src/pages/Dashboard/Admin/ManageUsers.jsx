import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loading from "../../Loading";

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

    const handleDeleteUser = (user) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/users/${user._id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: `${user.name} has been deleted`,
                icon: "success",
              });
            }
          });
        }
      });
    };

    if (isLoading) {
      <Loading></Loading>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
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
                    onClick={() => handleDeleteUser(user)}
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

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../Loading";

const ManageUsers = () => {
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
    Swal.fire({
      title: "Are you sure?",
      text: "Promoting this user to admin grants them additional privileges. This action cannot be undone!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: `${user?.name} is an Admin now.`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handleMakeAgent = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Promoting this user to agent grants them additional privileges. This action cannot be undone!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make agent",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/agent/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: `${user?.name} is an Agent now.`,
              icon: "success",
            });
            refetch();
          }
        });
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
            Swal.fire({
              title: "Deleted!",
              text: `${user.name} has been deleted`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) {
    <Loading></Loading>;
  }

  const renderActionButtons = (user) => {
    if (user?.role === "fraud") {
      return <span className="text-red-500 font-semibold">Fraud</span>;
    }
    return (
      <div className="flex space-x-2">
        {user?.role === "user" && (
          <>
            <button
              className="btn btn-sm btn-success text-white"
              onClick={() => handleMakeAdmin(user)}
            >
              Make Admin
            </button>
            <button
              className="btn btn-sm btn-accent text-white"
              onClick={() => handleMakeAgent(user)}
            >
              Make Agent
            </button>
          </>
        )}
        {user.role === "agent" && (
          <button
            className="btn btn-sm btn-warning"
            // onClick={() => handleMarkFraud(user)}
          >
            Mark as Fraud
          </button>
        )}
        <button
          className="btn btn-sm btn-error text-white"
          onClick={() => handleDeleteUser(user)}
        >
          Delete User
        </button>
      </div>
    );
  };

  return (
    <section className="container w-11/12 mx-auto my-16">
      <h2 className="text-3xl text-center font-bold font-playfair uppercase mb-8">
        Manage <span className="text-default">Users</span>
      </h2>
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
                <td className="capitalize">{user?.role}</td>
                <td>{renderActionButtons(user)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageUsers;

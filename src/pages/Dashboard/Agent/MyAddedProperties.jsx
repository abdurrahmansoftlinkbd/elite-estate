import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import AuthContext from "../../../providers/AuthContext";
import Loading from "../../Loading";
import Swal from "sweetalert2";
import { FaExternalLinkAlt } from "react-icons/fa";

const MyAddedProperties = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: properties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["properties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/agent/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = async (property) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/properties/${property._id}`);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${property?.title} has been deleted.`,
              icon: "success",
            });
          }
        } catch (error) {
          toast.error(error?.message);
        }
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="container w-11/12 mx-auto my-16">
      <h2 className="text-3xl text-center font-bold uppercase mb-8">
        My Added <span className="text-default">Properties</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property._id} className="card bg-base-100 shadow-xl">
            {/* Property Image */}
            <figure className="relative h-40">
              <img
                src={property?.image}
                alt={property?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span
                  className={`badge ${
                    property?.status === "verified"
                      ? "badge-success"
                      : property?.status === "rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {property?.status}
                </span>
              </div>
            </figure>
            <div className="card-body p-4">
              {/* Property Info */}
              <h3 className="card-title">{property?.title}</h3>
              <p className="text-gray-600">{property?.location}</p>
              {/* Price Range */}
              <div className="mt-1">
                <p className="font-semibold">Price Range:</p>
                <p className="text-gray-600">
                  ${property.priceRange.minimum.toLocaleString()} - $
                  {property.priceRange.maximum.toLocaleString()}
                </p>
              </div>
              {/* Agent Info */}
              <div className="flex items-center mt-2">
                <img
                  src={user?.photoURL}
                  alt={property?.agentName}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{property?.agentName}</p>
                  <p className="text-sm text-gray-500">
                    {property?.agentEmail}
                  </p>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="card-actions justify-center mt-2">
                {property.status !== "rejected" && (
                  <Link
                    to={`/dashboard/updateProperty/${property._id}`}
                    className="btn bg-default border-default text-white hover:bg-dark hover:border-dark btn-sm"
                  >
                    Update
                  </Link>
                )}
                <button
                  onClick={() => handleDelete(property)}
                  className="btn btn-error text-white btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/dashboard/addProperty"
          target="_blank"
          className="btn btn-lg bg-default border-default text-white hover:bg-dark hover:border-dark"
        >
          Add More Property <FaExternalLinkAlt />
        </Link>
      </div>

      {properties.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-600">No properties found</p>
          <Link
            to="/dashboard/addProperty"
            className="btn bg-default border-default text-white hover:bg-dark hover:border-dark mt-4"
          >
            Add Your First Property
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyAddedProperties;

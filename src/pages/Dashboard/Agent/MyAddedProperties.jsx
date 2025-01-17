import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import AuthContext from "../../../providers/AuthContext";
import Loading from "../../Loading";

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

  // Delete property mutation
  const { mutate: deleteProperty } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/properties/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Property deleted successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete property");
    },
  });

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      deleteProperty(id);
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="container w-11/12 mx-auto">
      <h2 className="text-3xl font-bold mb-8">My Added Properties</h2>
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
                  onClick={() => handleDelete(property._id)}
                  className="btn btn-error text-white btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
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

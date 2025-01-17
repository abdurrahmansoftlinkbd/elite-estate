import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../../Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [processing, setProcessing] = useState(false);

  const {
    data: properties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties");
      return res.data;
    },
  });

  const handleVerify = async (property) => {
    try {
      setProcessing(true);
      const res = await axiosSecure.patch(
        `/properties/verify/${property._id}`,
        {
          status: "verified",
        }
      );
      if (res.data.modifiedCount) {
        toast.success(`${property?.title} verified successfully!`);
        refetch();
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (property) => {
    try {
      setProcessing(true);
      const res = await axiosSecure.patch(
        `/properties/verify/${property._id}`,
        {
          status: "rejected",
        }
      );

      if (res.data.modifiedCount) {
        toast.success(`${property?.title} rejected!`);
        refetch();
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setProcessing(false);
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="container w-11/12 mx-auto my-16">
      <h2 className="text-3xl text-center font-bold font-playfair mb-8 uppercase">
        Manage <span className="text-default">Properties</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="table bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Property Title</th>
              <th>Location</th>
              <th>Agent Info</th>
              <th>Price Range</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr key={property._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="font-semibold">{property?.title}</div>
                </td>
                <td>{property?.location}</td>
                <td>
                  <div>
                    <div className="font-semibold">{property?.agentName}</div>
                    <div className="text-sm text-gray-500">
                      {property?.agentEmail}
                    </div>
                  </div>
                </td>
                <td>
                  ${property.priceRange.minimum.toLocaleString()} - $
                  {property.priceRange.maximum.toLocaleString()}
                </td>
                <td>
                  {property?.status === "pending" ? (
                    <span className="badge badge-warning text-white">
                      Pending
                    </span>
                  ) : property?.status === "verified" ? (
                    <span className="badge badge-success text-white">
                      Verified
                    </span>
                  ) : (
                    <span className="badge badge-error text-white">
                      Rejected
                    </span>
                  )}
                </td>
                <td>
                  {property?.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleVerify(property)}
                        disabled={processing}
                        className="btn btn-success btn-sm text-white"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleReject(property)}
                        disabled={processing}
                        className="btn btn-error btn-sm text-white"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {properties.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No properties found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProperties;

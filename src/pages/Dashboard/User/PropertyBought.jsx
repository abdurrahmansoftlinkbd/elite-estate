import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../providers/AuthContext";
import Loading from "../../Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PropertyBought = () => {
  const { user } = useContext(AuthContext);
  //   const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: offeredProperties = [], isLoading } = useQuery({
    queryKey: ["offered-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/user/${user?.email}`);
      return res.data;
    },
  });

  //   const handlePayment = (property) => {
  //     navigate(`/dashboard/payment/${property._id}`, {
  //       state: {
  //         property,
  //         amount: property.offerAmount,
  //         title: property.propertyTitle,
  //       },
  //     });
  //   };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "badge-warning";
      case "accepted":
        return "bg-blue-500 border-blue-500";
      case "bought":
        return "badge-success";
      default:
        return "badge-error";
    }
  };

  return (
    <div className="container w-11/12 mx-auto my-16 font-inter">
      {isLoading ? (
        <Loading />
      ) : offeredProperties.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven’t made any offers yet.</p>
        </div>
      ) : (
        <>
          <h2 className="text-3xl text-center font-bold font-playfair mb-8 uppercase">
            My <span className="text-default">Offered Properties</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offeredProperties.map((property) => (
              <div key={property._id} className="card bg-base-100 shadow-xl">
                <figure className="relative h-40">
                  <img
                    src={property?.propertyImage}
                    alt={property?.propertyTitle}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute top-2 right-2 text-white badge capitalize ${getStatusColor(
                      property?.status
                    )}`}
                  >
                    {property?.status}
                  </div>
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title font-playfair">
                    {property?.propertyTitle}
                  </h3>
                  <p className="text-gray-600">{property?.propertyLocation}</p>
                  <div className="mt-2">
                    <p className="font-medium">Agent: {property?.agentName}</p>
                    <p className="text-gray-600 mt-1">
                      Offered Amount: ${property?.offerAmount.toLocaleString()}
                    </p>
                  </div>

                  <div className="card-actions justify-center mt-4">
                    {/* {property.status === "accepted" && (
                      <button
                        // onClick={() => handlePayment(property)}
                        className="btn btn-primary w-full"
                      >
                        Pay Now
                      </button>
                    )} */}
                    {/* {property.status === "bought" && (
                      <div className="w-full">
                        <p className="text-sm text-gray-600">Transaction ID:</p>
                        <p className="text-xs font-mono bg-gray-100 p-2 rounded mt-1 break-all">
                          {property.transactionId}
                        </p>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyBought;

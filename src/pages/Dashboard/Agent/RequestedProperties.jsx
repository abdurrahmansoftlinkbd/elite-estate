import { useQuery } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
import { useContext } from "react";
import AuthContext from "../../../providers/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading";

const RequestedProperties = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: offers = [],
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["agentOffers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agentOffers/${user?.email}`);
      return res.data;
    },
  });

  //   const handleAcceptOffer = async (offerId, propertyId) => {
  //     try {
  //       const res = await axiosSecure.patch(`/accept-offer/${offerId}`, {
  //         propertyId,
  //       });
  //       if (res.data.success) {
  //         toast.success("Offer accepted successfully");
  //         refetch();
  //       }
  //     } catch (error) {
  //       toast.error(error?.message || "Error accepting offer");
  //     }
  //   };

  //   const handleRejectOffer = async (offerId) => {
  //     try {
  //       const res = await axiosSecure.patch(`/reject-offer/${offerId}`);
  //       if (res.data.success) {
  //         toast.success("Offer rejected");
  //         refetch();
  //       }
  //     } catch (error) {
  //       toast.error(error?.message);
  //     }
  //   };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Requested Properties
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>Property Title</th>
              <th>Location</th>
              <th>Buyer Info</th>
              <th>Offered Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id}>
                <td className="font-medium">{offer.propertyTitle}</td>
                <td>{offer.propertyLocation}</td>
                <td>
                  <div>
                    <p>{offer.buyerName}</p>
                    <p className="text-sm text-gray-500">{offer.buyerEmail}</p>
                  </div>
                </td>
                <td>${offer.offerAmount.toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${
                      offer.status === "pending"
                        ? "badge-warning"
                        : offer.status === "accepted"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {offer.status}
                  </span>
                </td>
                <td>
                  {offer.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        // onClick={() =>
                        //   handleAcceptOffer(offer._id, offer.propertyId)
                        // }
                        className="btn btn-xs btn-success text-white"
                      >
                        Accept
                      </button>
                      <button
                        // onClick={() => handleRejectOffer(offer._id)}
                        className="btn btn-xs btn-error text-white"
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
      </div>

      {offers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No offers received yet.
        </div>
      )}
    </div>
  );
};

export default RequestedProperties;

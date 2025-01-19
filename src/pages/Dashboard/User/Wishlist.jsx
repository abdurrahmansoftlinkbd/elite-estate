import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "../../../providers/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading";
import Swal from "sweetalert2";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: wishlistItems = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${user?.email}`);
      const offersRes = await axiosSecure.get(`/offers/${user?.email}`);
      const offers = offersRes.data;
      const itemsWithOfferStatus = res.data.map((item) => {
        const pendingOffer = offers.find(
          (offer) =>
            offer?.propertyId === item._id.toString() &&
            offer?.status === "pending"
        );
        return {
          ...item,
          hasPendingOffer: !!pendingOffer,
        };
      });
      return itemsWithOfferStatus;
    },
  });

  const handleRemoveFromWishlist = async (item) => {
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
          const res = await axiosSecure.delete(`/wishlist/${item._id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${item?.title} has been deleted.`,
              icon: "success",
            });
          }
        } catch (error) {
          toast.error(error?.message);
        }
      }
    });
  };

  const handleMakeOffer = (property) => {
    navigate(`/dashboard/makeOffer/${property._id}`, { state: { property } });
  };

  return (
    <div className="container w-11/12 mx-auto my-16 font-inter">
      {isLoading ? (
        <Loading></Loading>
      ) : wishlistItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No properties in your wishlist yet.</p>
        </div>
      ) : (
        <>
          <h2 className="text-3xl text-center font-bold font-playfair mb-8 uppercase">
            My <span className="text-default">Wishlist</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item._id} className="card bg-base-100 shadow-xl">
                <figure className="relative h-40">
                  <img
                    src={item?.image}
                    alt={item?.title}
                    className="w-full h-full object-cover"
                  />
                  {item?.status === "verified" && (
                    <div className="absolute top-2 right-2 bg-success border-success p-3 text-white badge ">
                      <FaCheckCircle className="w-4 h-4 mr-1" />
                      Verified
                    </div>
                  )}
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title font-playfair">{item?.title}</h3>
                  <p className="text-gray-600">{item?.location}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <img
                      src={item?.agentImage}
                      alt={item?.agentName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.agentName}</p>
                      <p className="text-sm text-gray-500">Agent</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-gray-600">
                      ${item?.priceRange?.minimum.toLocaleString()} - $
                      {item?.priceRange?.maximum.toLocaleString()}
                    </p>
                  </div>
                  <div className="card-actions justify-center mt-1">
                    <button
                      onClick={() => handleMakeOffer(item)}
                      className="btn btn-sm bg-default border-default text-white hover:bg-dark hover:border-dark"
                      disabled={item?.hasPendingOffer}
                    >
                      {item?.hasPendingOffer ? "Pending" : "Make Offer"}
                    </button>

                    <button
                      onClick={() => handleRemoveFromWishlist(item)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Delete
                    </button>
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

export default Wishlist;

import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
import { FaCheck, FaTrash } from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "../../../providers/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  //   const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: wishlistItems = [],
    isLoading,
    //  refetch
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${user?.email}`);
      return res.data;
    },
  });

  //   const handleRemoveFromWishlist = async (id) => {
  //     try {
  //       await axiosSecure.delete(`/wishlist/${id}`);
  //       toast.success("Removed from wishlist");
  //       refetch();
  //     } catch (error) {
  //       toast.error("Failed to remove from wishlist");
  //     }
  //   };

  //   const handleMakeOffer = (property) => {
  //     navigate(`/make-offer/${property._id}`, { state: { property } });
  //   };

  return (
    <div className="container w-11/12 mx-auto my-16">
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
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full flex items-center">
                      <FaCheck className="mr-1" /> Verified
                    </div>
                  )}
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="text-gray-600">{item.location}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      src={item.agentImage}
                      alt={item.agentName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.agentName}</p>
                      <p className="text-sm text-gray-500">Agent</p>
                    </div>
                  </div>
                  <p className="text-primary font-medium mt-2">
                    ${item.priceRange.min} - ${item.priceRange.max}
                  </p>

                  <div className="card-actions justify-end mt-4">
                    <button
                      // onClick={() => handleRemoveFromWishlist(item._id)}
                      className="btn btn-sm btn-error"
                    >
                      <FaTrash /> Remove
                    </button>
                    <button
                      // onClick={() => handleMakeOffer(item)}
                      className="btn btn-sm btn-primary"
                    >
                      Make Offer
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

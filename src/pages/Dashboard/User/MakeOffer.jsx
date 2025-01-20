import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AuthContext from "../../../providers/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";

const MakeOffer = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const property = location?.state?.property;

  const [offerAmount, setOfferAmount] = useState("");
  const [buyingDate, setBuyingDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: userRole,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      return res.data?.role;
    },
  });

  if (!property) {
    return navigate("/dashboard/wishlist");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRole === "agent" || userRole === "admin") {
      toast.error("Only regular users can make offers");
      return;
    }

    const amount = parseFloat(offerAmount);
    if (
      amount < property?.priceRange?.minimum ||
      amount > property?.priceRange?.maximum
    ) {
      toast.error(
        `Offer amount must be between $${property?.priceRange?.minimum} and $${property?.priceRange?.maximum}`
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await axiosSecure.post("/offers", {
        propertyId: property?.propertyId,
        propertyTitle: property?.title,
        propertyLocation: property?.location,
        propertyImage: property?.image,
        agentName: property?.agentName,
        agentEmail: property?.agentEmail,
        offerAmount: amount,
        buyerEmail: user?.email,
        buyerName: user?.displayName,
        buyingDate,
        status: "pending",
      });
      refetch();
      toast.success(`${property?.title} Offer submitted successfully`);
      navigate("/dashboard/wishlist");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="container w-11/12 mx-auto my-16 font-inter">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center font-playfair uppercase mb-8">
          Make an <span className="text-default">Offer</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Property Title <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              value={property?.title}
              className="input input-bordered"
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Property Location <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              value={property?.location}
              className="input input-bordered"
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Agent Name <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              value={property?.agentName}
              className="input input-bordered"
              readOnly
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Offer Amount ($) <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="number"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              className="input input-bordered"
              placeholder={`Enter amount between $${property?.priceRange?.minimum} - $${property?.priceRange?.maximum}`}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Buyer Email <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="email"
              value={user?.email}
              className="input input-bordered"
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Buyer Name <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              value={user?.displayName}
              className="input input-bordered"
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Buying Date <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="date"
              value={buyingDate}
              onChange={(e) => setBuyingDate(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-block bg-default border-default text-white hover:bg-dark hover:border-dark"
            disabled={
              isSubmitting || userRole === "agent" || userRole === "admin"
            }
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
              </>
            ) : (
              "Make Offer"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeOffer;

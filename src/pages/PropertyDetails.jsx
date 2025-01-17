import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import { FaHeart } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./Loading";

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch property details
  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
  });

  // Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  const handleAddToWishlist = async () => {
    try {
      await axiosSecure.post("/wishlist", {
        propertyId: id,
        title: property.title,
        image: property.image,
        location: property.location,
        agentName: property.agentName,
        priceRange: property.priceRange,
      });
      toast.success("Added to wishlist!");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || rating === 0) {
      toast.error("Please provide both review text and rating");
      return;
    }
    setIsSubmitting(true);
    try {
      await axiosSecure.post(`/reviews`, {
        propertyId: id,
        review: reviewText,
        rating: rating,
      });
      toast.success("Review added successfully!");
      setShowReviewModal(false);
      setReviewText("");
      setRating(0);
      // Refetch reviews after successful submission
      queryClient.invalidateQueries(["reviews", id]);
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
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg mb-8">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{property?.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <img
                src={property?.image}
                alt={property?.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
              <button
                onClick={handleAddToWishlist}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <FaHeart /> Add to Wishlist
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Location</h3>
                <p className="text-gray-600">{property.location}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Price Range</h3>
                <p className="text-primary font-medium">
                  ${property.priceRange.min} - ${property.priceRange.max}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Agent Information
                </h3>
                <p className="text-gray-600">Name: {property.agentName}</p>
                <p className="text-gray-600">Email: {property.agentEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowReviewModal(true)}
          >
            Add Review
          </button>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white rounded-lg shadow p-4">
              <div className="mb-2">
                <ReactStars
                  count={5}
                  value={review.rating}
                  size={24}
                  edit={false}
                  activeColor="#ffd700"
                />
              </div>
              <p className="text-gray-600">{review.review}</p>
              <p className="text-sm text-gray-400 mt-2">
                By {review.userName} on{" "}
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
          {reviews.length === 0 && (
            <p className="text-center text-gray-500">
              No reviews yet. Be the first to review!
            </p>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Write a Review</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <ReactStars
                  count={5}
                  onChange={setRating}
                  size={36}
                  activeColor="#ffd700"
                />
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review here..."
                  className="w-full p-2 border border-gray-300 rounded-lg min-h-[100px]"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;

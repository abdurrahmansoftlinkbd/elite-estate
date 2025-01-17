import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../Loading";

const UpdateProperty = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
  });

  // Update property mutation
  const { mutate: updateProperty } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/properties/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Property updated successfully");
      navigate("/dashboard/my-properties");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update property");
      setLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const location = form.location.value;
    const minPrice = parseFloat(form.minPrice.value);
    const maxPrice = parseFloat(form.maxPrice.value);
    const imageFile = form.image.files[0];

    try {
      let imageUrl = property.image; // Keep existing image by default

      // Upload new image if provided
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const imageRes = await axiosPublic.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          formData
        );

        if (imageRes.data.success) {
          imageUrl = imageRes.data.data.url;
        }
      }

      const updatedData = {
        title,
        location,
        priceRange: {
          minimum: minPrice,
          maximum: maxPrice,
        },
        image: imageUrl,
        status: "pending", // Reset to pending after update
      };
      updateProperty(updatedData);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Update Property</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Property Image */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Image</span>
          </label>
          <div className="flex items-center space-x-4">
            <img
              src={property.image}
              alt="Current property"
              className="w-32 h-32 object-cover rounded"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input file-input-bordered w-full"
            />
          </div>
        </div>

        {/* Property Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Title</span>
          </label>
          <input
            type="text"
            name="title"
            defaultValue={property.title}
            className="input input-bordered"
            required
          />
        </div>

        {/* Property Location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            name="location"
            defaultValue={property.location}
            className="input input-bordered"
            required
          />
        </div>

        {/* Agent Info - Read Only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Agent Name</span>
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
              <span className="label-text">Agent Email</span>
            </label>
            <input
              type="email"
              value={user?.email}
              className="input input-bordered"
              readOnly
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Minimum Price</span>
            </label>
            <input
              type="number"
              name="minPrice"
              defaultValue={property.priceRange.minimum}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Maximum Price</span>
            </label>
            <input
              type="number"
              name="maxPrice"
              defaultValue={property.priceRange.maximum}
              className="input input-bordered"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;

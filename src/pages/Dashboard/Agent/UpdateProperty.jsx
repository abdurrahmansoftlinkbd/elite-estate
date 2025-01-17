import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading";
import AuthContext from "../../../providers/AuthContext";
import axios from "axios";

const UpdateProperty = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
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
    const image = form.image.files[0];
    try {
      let imageUrl = property?.image;
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const { data } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_imgbb_api
          }`,
          formData
        );
        imageUrl = data.data.display_url;
      }

      const updatedData = {
        title,
        location,
        priceRange: {
          minimum: minPrice,
          maximum: maxPrice,
        },
        image: imageUrl,
        status: "pending",
      };

      const response = await axiosSecure.patch(
        `/properties/${id}`,
        updatedData
      );

      if (response.data.modifiedCount) {
        toast.success("Property updated successfully");
        navigate("/dashboard/myAddedProperties");
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="container w-11/12 mx-auto my-16">
      <h2 className="text-3xl font-bold text-center mb-8">Update Property</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Property Image */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Image</span>
          </label>
          <div className="flex items-center space-x-4">
            <img
              src={property?.image}
              alt={property?.title}
              className="w-24 h-24 object-cover rounded"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input file-input-bordered file-input-accent w-full"
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
            defaultValue={property?.title}
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
            defaultValue={property?.location}
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
              defaultValue={property?.priceRange?.minimum}
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
              defaultValue={property?.priceRange?.maximum}
              className="input input-bordered"
              required
            />
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className={`btn bg-default border-default text-white hover:bg-dark hover:border-dark btn-block ${
            loading ? "loading" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;

import { useContext, useState } from "react";
import AuthContext from "../../../providers/AuthContext";
import Loading from "../../Loading";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const location = form.location.value;
    const minPrice = parseFloat(form.minPrice.value);
    const maxPrice = parseFloat(form.maxPrice.value);
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api}`,
      formData
    );
    const imageUrl = data.data.display_url;
    try {
      const propertyData = {
        title,
        location,
        priceRange: {
          minimum: minPrice,
          maximum: maxPrice,
        },
        image: imageUrl,
        agentName: user?.displayName,
        agentEmail: user?.email,
        status: "pending",
      };
      const result = await axiosSecure.post("/properties", propertyData);
      if (result.data.insertedId) {
        toast.success(`${propertyData?.title} Added Successfully!`);
        form.reset();
        navigate("/dashboard/myAddedProperties");
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="container w-11/12 my-16 mx-auto font-inter">
      <h2 className="text-3xl font-bold font-playfair text-center mb-8 uppercase">
        Add <span className="text-default">Property</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Property Title <span className="text-error">*</span>
            </span>
          </label>
          <input
            type="text"
            name="title"
            className="input input-bordered"
            required
          />
        </div>
        {/* Property Location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Location <span className="text-error">*</span>
            </span>
          </label>
          <input
            type="text"
            name="location"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Property Image <span className="text-error">*</span>
            </span>
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="file-input file-input-bordered file-input-accent w-full"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Agent Name <span className="text-error">*</span>
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
                Agent Email <span className="text-error">*</span>
              </span>
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
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Price Range</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Minimum Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Minimum Price <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="number"
                name="minPrice"
                className="input input-bordered"
                required
              />
            </div>
            {/* Maximum Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Maximum Price <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="number"
                name="maxPrice"
                className="input input-bordered"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-default border-default text-white hover:bg-dark hover:border-dark btn-block"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;

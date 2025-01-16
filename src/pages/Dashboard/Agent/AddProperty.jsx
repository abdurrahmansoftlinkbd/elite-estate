import { useContext, useState } from "react";
import AuthContext from "../../../providers/AuthContext";
import Loading from "../../Loading";

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const location = form.location.value;
    const priceRange = form.priceRange.value;
    const imageFile = form.image.files[0];
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Add New Property</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Property Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Luxury Beachfront Villa"
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
            placeholder="123 Ocean Drive, Miami Beach, FL"
            className="input input-bordered"
            required
          />
        </div>

        {/* Property Image */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Property Image</span>
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="file-input file-input-bordered w-full"
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price Range</span>
          </label>
          <input
            type="text"
            name="priceRange"
            placeholder="$500,000 - $750,000"
            className="input input-bordered"
            required
          />
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

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "./Loading";

const AllPropertiesPage = () => {
  const axiosPublic = useAxiosPublic();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axiosPublic.get("/properties");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="container w-11/12 mx-auto my-16 font-inter">
      <h2 className="text-3xl font-bold font-playfair uppercase text-center mb-8">
        All <span className="text-default">Properties</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map(
          (property) =>
            property.status === "verified" && (
              <div
                key={property._id}
                className="card card-compact bg-base-100 group shadow-xl hover:shadow-lg transition-shadow duration-300"
              >
                <figure className="relative overflow-hidden">
                  <img
                    src={property?.image}
                    alt={property?.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {property.status === "verified" && (
                    <div className="absolute top-2 right-2 bg-success border-success p-3 text-white badge ">
                      <FaCheckCircle className="w-4 h-4 mr-1" />
                      Verified
                    </div>
                  )}
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title font-semibold font-playfair text-lg mb-2 line-clamp-1">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                    {property.location}
                  </p>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-gray-600">
                      ${property.priceRange.minimum.toLocaleString()} - $
                      {property.priceRange.maximum.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center mb-1">
                    <img
                      src={property?.agentImage}
                      alt={property?.agentName}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold">{property?.agentName}</p>
                      <p className="text-sm text-gray-500">
                        {property?.agentEmail}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/property/${property._id}`}
                    className="btn bg-default border-default text-white hover:bg-dark hover:border-dark btn-sm btn-block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default AllPropertiesPage;

import { useQuery } from "@tanstack/react-query";
import { FaHome } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../Loading";
import { Link } from "react-router-dom";

const MeetOurAgents = () => {
  const axiosPublic = useAxiosPublic();

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosPublic.get("/agents");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="container w-11/12 mx-auto mb-24 font-inter">
      <div className="text-center mb-12">
        <p className="text-default font-medium text-sm mb-2">Meet Our</p>
        <h2 className="text-4xl font-bold font-playfair uppercase mb-4">
          Agents
        </h2>
        <p className="text-gray-600 text-sm">
          Our experienced agents are here to help you find your perfect home
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agents
          .map((agent) => (
            <div
              key={agent.email}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
                <p className="text-gray-600 mb-4">{agent.email}</p>
                <div className="flex items-center justify-center gap-2 text-default">
                  <FaHome className="text-xl" />
                  <span className="font-semibold">
                    {agent.propertyCount} Properties Listed
                  </span>
                </div>
                <Link
                  to="/allProperties"
                  className="mt-4 btn btn-sm bg-default border-default text-white hover:bg-dark hover:border-dark w-full"
                >
                  View Properties
                </Link>
              </div>
            </div>
          ))
          .slice(0, 3)}
      </div>
    </section>
  );
};

export default MeetOurAgents;

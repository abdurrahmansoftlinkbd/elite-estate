import { useQuery } from "@tanstack/react-query";
import Rating from "react-rating";
import { Star } from "lucide-react";

const fetchTestimonials = async () => {
  const response = await fetch("testimonials.json");
  return response.json();
};

const Testimonials = () => {
  const { data: testimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  return (
    <section className="font-inter">
      <div className="">
        {/* heading */}
        <div className="text-center mb-10">
          <h3 className="text-default text-sm font-medium mb-1">
            Stories from Our Clients
          </h3>
          <h2 className="text-4xl font-semibold font-playfair">Testimonials</h2>
          <p className="text-sm text-gray-500 mt-2">
            From our satisfied clients.
          </p>
        </div>
        {/* testimonial section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-4 md:gap-y-4 lg:gap-y-0 justify-items-center">
          {testimonials?.map((testimonial, index) => (
            <div
              key={index}
              className="card card-compact bg-base-100 md:w-80 lg:w-72 xl:w-96 shadow-xl"
            >
              <div className="card-body">
                <h3 className="text-xl font-bold font-playfair mb-1">
                  {testimonial.title}
                </h3>
                {/* rating */}
                <div className="mb-2">
                  <Rating
                    initialRating={testimonial.rating}
                    readonly
                    emptySymbol={<Star className="w-5 h-5 text-gray-300" />}
                    fullSymbol={
                      <Star
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                      />
                    }
                  />
                </div>
                {/* desc */}
                <p className="text-gray-600 mb-2">{testimonial.text}</p>
                {/* author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.author}
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-3xl text-gray-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

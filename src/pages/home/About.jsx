import { ArrowRight, Check, Phone } from "lucide-react";

export default function About() {
  return (
    <section className="container w-11/12 mx-auto">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
        {/* left column */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl text-default font-playfair font-bold">
            About Us
          </h2>

          <p className="text-gray-600">
            We are a real estate firm with over 20 years of expertise, and our
            main goal is to provide amazing locations to our partners and
            clients. Within the luxury real estate market, our agency offers
            customized solutions. We are a real estate firm with over 20 years
            of expertise. Our main goal is to provide amazing locations to our
            partners and clients.
          </p>

          <ul className="space-y-3">
            {[
              "Quality real estate services",
              "100% Satisfaction guarantee",
              "Highly professional team",
              "Dealing always on time",
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-default" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-default/10 p-2 rounded-full">
                <Phone className="w-5 h-5 text-default" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Call Us 24/7</p>
                <p className="font-semibold">+01 234 56789</p>
              </div>
            </div>

            <button className="btn bg-default border-default text-white hover:bg-dark hover:border-dark gap-2">
              More About Realtor
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="h-[25rem] md:h-[34.25rem] lg:h-[31.25rem]">
          <img
            src="https://i.ibb.co.com/hJpZdNdF/jason-briscoe-UV81-E0o-XXWQ-unsplash.jpg"
            alt="Professional realtor in modern office"
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

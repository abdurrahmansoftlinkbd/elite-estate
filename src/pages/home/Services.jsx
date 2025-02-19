export default function Services() {
  const services = [
    {
      icon: "https://wordpress.themeholy.com/realar/wp-content/uploads/2024/05/service-icon2-1.svg",
      title: "Property Valuation",
      description:
        "We provide real estate services to facilitate the easy and confident purchase, sale, and management of your properties.",
      image:
        "https://wordpress.themeholy.com/realar/wp-content/uploads/2024/05/1-1-2.png",
    },
    {
      icon: "https://wordpress.themeholy.com/realar/wp-content/uploads/2024/05/service-icon2-2.svg",
      title: "Property Management",
      description:
        "We provide real estate services to facilitate the easy and confident purchase, sale, and management of your properties.",
      image:
        "https://wordpress.themeholy.com/realar/wp-content/uploads/2024/05/1-2.png",
    },
    {
      icon: "https://wordpress.themeholy.com/realar/wp-content/uploads/2024/05/service-icon2-3.svg",
      title: "Invest Opportunities",
      description:
        "We provide real estate services to facilitate the easy and confident purchase, sale, and management of your properties.",
      image:
        "https://wordpress.themeholy.com/realar/wp-content/uploads/2024/05/1-3.png",
    },
  ];

  return (
    <section className="container w-11/12 mx-auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-default font-playfair font-bold mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are a real estate firm with over 25 years of expertise, and our
            main goal is to provide amazing solutions to our partners and
            clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="px-6 pt-6">
                <img src={service.icon} className="text-4xl mb-2 block" />
                <h3 className="text-xl font-playfair font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {service.description}
                </p>
              </div>
              <figure className="px-6 pb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full rounded-2xl"
                />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

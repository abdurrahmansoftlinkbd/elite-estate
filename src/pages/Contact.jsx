import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ContactPage = () => {
  return (
    <section className="container w-11/12 mx-auto my-16 font-inter">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold font-playfair text-default mb-7">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 mb-7">
              Contact us with any questions or requests. Our dedicated team is
              ready to provide the support and information you need. Get in
              touch today to discuss your specific needs or to learn more about
              our comprehensive services.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Cumilla, Bangladesh</span>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+88 01327 389952</span>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>web@eliteestate.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold font-playfair text-default mb-7">
              Stay Connected
            </h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                className="btn btn-circle  btn-ghost"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/home"
                target="_blank"
                className="btn btn-circle btn-ghost"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                className="btn btn-circle btn-ghost"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Omar"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="omar@example.com"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Reason for Contact</span>
                </label>
                <input
                  type="text"
                  placeholder="General question"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">How can we help you?</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32"
                  placeholder="Enter your message here..."
                ></textarea>
              </div>

              <button className="btn btn-block bg-default border-default text-white hover:bg-dark hover:border-dark">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

import News from "./News";
import Slider from "./Slider";
import AllProperties from "./AllProperties";
import MeetOurAgents from "./MeetOurAgents";
import Testimonials from "./Testimonials";
import ContactPage from "../Contact";

const Home = () => {
  return (
    <>
      <header>
        <Slider></Slider>
      </header>
      <section className="container w-11/12 mx-auto my-24 font-inter">
        <AllProperties></AllProperties>
      </section>
      <section>
        <MeetOurAgents></MeetOurAgents>
      </section>
      <section className="container w-11/12 mx-auto mb-24">
        <News></News>
      </section>
      <section className="container w-11/12 mx-auto mb-24">
        <Testimonials></Testimonials>
      </section>
      <section className="mb-24">
        <ContactPage></ContactPage>
      </section>
    </>
  );
};

export default Home;

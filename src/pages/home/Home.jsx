import News from "./News";
import Slider from "./Slider";
import AllProperties from "./AllProperties";

const Home = () => {
  return (
    <>
      <header>
        <Slider></Slider>
      </header>
      <section className="container w-11/12 mx-auto my-24 font-inter">
        <AllProperties></AllProperties>
      </section>
      <section className="container w-11/12 mx-auto mb-24">
        <News></News>
      </section>
    </>
  );
};

export default Home;

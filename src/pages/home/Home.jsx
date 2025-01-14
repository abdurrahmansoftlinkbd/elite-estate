import News from "./News";
import Slider from "./Slider";

const Home = () => {
  return (
    <>
      <header>
        <Slider></Slider>
      </header>
      <section className="container w-11/12 mx-auto mt-24">
        <News></News>
      </section>
    </>
  );
};

export default Home;

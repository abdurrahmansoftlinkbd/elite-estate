import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";
const Slider = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            image="https://i.ibb.co.com/qj1G7dk/dillon-kydd-2ke-CPb73a-QY-unsplash.jpg"
            text="Discover Your Dream Home"
            desc="Step into a world of stunning properties designed for your comfort and lifestyle. Explore homes that blend modern elegance with timeless charm."
            btn="Get Started"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image="https://i.ibb.co.com/LPZxWxT/frames-for-your-heart-2d4l-AQAlb-DA-unsplash.jpg"
            text="Invest in Your Future"
            desc="Secure your tomorrow with properties that promise exceptional value and a lifetime of satisfaction. Find opportunities tailored to your goals."
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image="https://i.ibb.co.com/7WZP5mt/francesca-tosolini-t-Hk-JAMc-O3-QE-unsplash.jpg"
            text="Experience Luxury Living"
            desc="Indulge in premium residences with unmatched amenities and breathtaking locations. Your perfect retreat awaits you."
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;

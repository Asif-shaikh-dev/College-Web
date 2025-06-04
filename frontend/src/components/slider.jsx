import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const images = [
  "https://aisc.vriddhionline.com/assets/student/img/Slide6.jpg",
  "https://aisc.vriddhionline.com/assets/student/img/Slide7.jpg",
  "https://aisc.vriddhionline.com/assets/student/img/Slide8.jpg",
];

export default function ImageSlider() {
  return (
    <div className="w-[500px] bg-black ">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={10}
        slidesPerView={1}
        className="rounded-lg shadow-lg"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

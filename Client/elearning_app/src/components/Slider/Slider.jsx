// src/components/Slider.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const Slider = () => {
  const slides = [
    {
      image: "../../../public/images/programming-background-with-person-working-with-codes-computer.jpg",
      subtitle: "BEST ONLINE COURSES",
      title: "Get Educated Online From Your Home",
      description:
        "Vero elit justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea sanctus eirmod elitr.",
    },
    {
      image: "../../../public/images/close-up-student-online-class.jpg",
      subtitle: "BEST ONLINE COURSES",
      title: "Learn Anytime, Anywhere",
      description:
        "Vero elit justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea sanctus eirmod elitr.",
    },
    {
      image: "../../../public/images/woman-attending-online-class.jpg",
      subtitle: "BEST ONLINE COURSES",
      title: "Master Skills From Home",
      description:
        "Vero elit justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea sanctus eirmod elitr.",
    },
  ];

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      modules={[Autoplay]}
      className="relative"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="object-cover w-full h-[600px]"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
            <div>
              <p className="text-cyan-400 text-sm uppercase tracking-widest mb-2 font-mono">
                {slide.subtitle}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight font-mono">
                {slide.title}
              </h2>
              <p className="text-gray-200 text-sm md:text-base mb-6 max-w-lg mx-auto font-mono">
                {slide.description}
              </p>
              <div className="flex justify-center gap-4">
                <button className="bg-cyan-500 text-white px-6 py-2 rounded hover:bg-cyan-600 transition font-mono">
                  Read More
                </button>
                <button className="border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-black transition font-mono">
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
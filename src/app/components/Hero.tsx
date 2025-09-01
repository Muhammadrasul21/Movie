"use client";
import React, { useState } from "react";
import { Autoplay, Thumbs, Navigation } from "swiper/modules";
import { FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { HeroProps } from "../types/type";
import { IMAGE_BASE_URL } from "../constants";
import Link from "next/link";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import Image from "next/image";

const Hero: React.FC<HeroProps> = ({ movies }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="max-w-full px-4">
      {/* Main Swiper */}
      <Swiper
        className="mySwiper"
        modules={[Autoplay, Thumbs]}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="relative h-[640px] rounded-xl bg-cover bg-center"
              style={{
                backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
              }}
            >
              <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 text-center">
                <p className="font-medium text-3xl text-white">{movie.title}</p>
                <div className="flex gap-4 text-white">
                  <p>{movie.release_date}</p>
                  <p>{movie.original_language}</p>
                  <p>{movie.vote_average}</p>
                  <p>{movie.vote_count}</p>
                </div>
                <Link href={`/movie/${movie.id}`}>
                  <button className="flex items-center justify-center gap-2 px-[100px] py-3.5 bg-white text-primary rounded-xl font-medium cursor-pointer">
                    <FaPlay /> Watch
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails Swiper */}
      <div className="relative mt-6 flex justify-center">
        <Swiper
          onSwiper={setThumbsSwiper}
          className="w-full max-w-2xl !h-16 flex items-center"
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={10}
          slidesPerView={4}
          modules={[Thumbs, Autoplay, Navigation]}
          watchSlidesProgress
          navigation={{
            prevEl: ".thumb-prev",
            nextEl: ".thumb-next",
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className="cursor-pointer group !h-16 !w-[108px]">
              <Image
                width={108}
                height={64}
                className="w-full h-16 object-cover rounded-md transition-opacity duration-300 opacity-50 group-[.swiper-slide-thumb-active]:opacity-100"
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.backdrop_path}`}
                alt={movie.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="thumb-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white p-2 rounded-full">
          ‹
        </button>

        <button className="thumb-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white p-2 rounded-full">
          ›
        </button>
      </div>
    </div>
  );
};

export default Hero;

"use client";
import React from "react";
import { HeroProps } from "../types/type";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { getImageUrl } from "../constants";
import "swiper/css";
import "swiper/css/navigation";
import BookmarkButton from "./BookmarkButton";

const WeeklyData: React.FC<HeroProps> = ({ movies }) => {
  return (
    <div className="relative mt-[50px]">
      <div className="container flex items-center justify-between mb-4">
        <p className="text-xl font-semibold">During the week</p>
        <Link
          href={"/pages/movie"}
          className="text-primary flex items-center font-medium cursor-pointer"
        >
          Show all <FaChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className=" flex items-center">
        {/* <button className="swiper-button-prev-custom w-12 h-12 rounded-full bg-[#1D1D1D] text-primary flex items-center justify-center">
          <MdKeyboardArrowLeft className="w-6 h-6" />
        </button> */}

        <div className="container">
          <Swiper
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            modules={[Autoplay, Navigation]}
            className="mySwiper gap-5 !h-[480px]"
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {movies.map((movie) => (
              <SwiperSlide
                key={movie.id}
                className="!h-[400px] max-w-[280px] mb-10 rounded-xl"
              >
                <div className="flex flex-col gap-2 relative">
                  <Link href={`/pages/movie/${movie.id}`}>
                    <img
                      className="w-full h-[400px] object-cover rounded-xl"
                      src={getImageUrl(movie.poster_path, 'w500')}
                      alt={movie.title}
                    />
                  </Link>

                  <div
                    className="absolute top-2 right-2 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BookmarkButton movie={movie} size="md" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p
                      className="font-medium text-lg line-clamp-1"
                      title={movie.title}
                    >
                      {movie.title}
                    </p>
                    <p className="font-medium text-sm text-[#4D4D4D]">
                      {movie.release_date}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* 
        <button className="swiper-button-next-custom w-12 h-12 rounded-full bg-[#1D1D1D] text-primary flex items-center justify-center">
          <MdKeyboardArrowRight className="w-6 h-6" />
        </button> */}
      </div>
    </div>
  );
};

export default WeeklyData;

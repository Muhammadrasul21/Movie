"use client";
import React, { useState } from "react";
import { Autoplay, Thumbs, Navigation } from "swiper/modules";
import { FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { HeroProps } from "../types/type";
import { getImageUrl } from "../constants";
import Link from "next/link";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import BookmarkButton from "./BookmarkButton";

const Hero: React.FC<HeroProps> = ({ movies }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);

  return (
    <div className="max-w-full px-4">
      <Swiper
        onSwiper={setMainSwiper}
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
                backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'w1280')})`,
              }}
            >
              {/* Bookmark Button */}
              <div className="absolute top-4 right-4 z-10">
                <BookmarkButton movie={movie} size="lg" />
              </div>

              <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 text-center">
                <p className="font-medium text-3xl text-white">{movie.title}</p>
                <div className="flex gap-4 text-white">
                  <p>{movie.release_date}</p>
                  <p>{movie.original_language}</p>
                  <p>{movie.vote_average}</p>
                  <p>{movie.vote_count}</p>
                </div>
                <Link href={`/pages/movie/${movie.id}`}>
                  <button className="flex items-center justify-center gap-2 px-[100px] py-3.5 bg-white text-primary rounded-xl font-medium cursor-pointer">
                    <FaPlay /> Watch
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center mt-1 container">
        <button
          className="hidden sm:flex thumb-prev w-12 h-12 rounded-full bg-[#1D1D1D] text-primary items-center justify-center shadow-lg"
          onClick={() => {
            if (mainSwiper) mainSwiper.slidePrev();
            if (thumbsSwiper) thumbsSwiper.slidePrev();
          }}
        >
          <MdKeyboardArrowLeft className="w-6 h-6" />
        </button>

        <Swiper
          onSwiper={setThumbsSwiper}
          className="w-[432px] !h-16"
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={10}
          modules={[Thumbs, Autoplay, Navigation]}
          watchSlidesProgress
          navigation={{
            prevEl: ".thumb-prev",
            nextEl: ".thumb-next",
          }}
          observer={true}
          observeParents={true}
          resizeObserver={true}
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
              className="cursor-pointer group !h-16 rounded-md"
            >
              <Image
                width={108}
                height={64}
                className=" h-16 object-cover rounded-md transition-opacity duration-300 opacity-30 group-[.swiper-slide-thumb-active]:opacity-100"
                src={getImageUrl(movie.backdrop_path, 'w300')}
                alt={movie.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="hidden sm:flex thumb-next w-12 h-12 rounded-full bg-[#1D1D1D] text-primary  items-center justify-center shadow-lg"
          onClick={() => {
            if (mainSwiper) mainSwiper.slideNext();
            if (thumbsSwiper) thumbsSwiper.slideNext();
          }}
        >
          <MdKeyboardArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Hero;

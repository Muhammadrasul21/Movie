"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Movies from "@/app/components/Movies";
import "swiper/css";
import { MoviePageProps } from "@/app/types/type";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

function getImageUrl(path: string, size: string = "w500") {
  return path ? `${IMAGE_BASE_URL}${size}${path}` : "/placeholder.jpg";
}

const MovieDetailClient = ({ movie, credits, videos, similarMovies }: MoviePageProps) => {
  const [rating, setRating] = useState<number>(0);

  const trailer = videos?.results?.find(
    (video) =>
      video.type === "Trailer" &&
      video.site === "YouTube" &&
      video.key
  );

  const cast = credits?.cast?.slice(0, 10) || [];

  return (
    <div className="w-full bg-black text-white min-h-screen px-4">
      <div className="relative w-full h-[500px]">
        {trailer ? (
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <img
            src={getImageUrl(
              movie?.backdrop_path || movie?.poster_path,
              "w1280"
            )}
            alt={movie?.title}
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </div>

      {/* Movie Details */}
      <div className="container">
        <div className="mt-5 px-10">
          <h1 className="text-4xl font-bold">{movie?.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-yellow-400 text-xl">{movie?.vote_average}</p>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`cursor-pointer text-2xl ${
                    index < Math.round((movie?.vote_average || 0) / 2)
                      ? "text-yellow-500"
                      : "text-gray-600"
                  }`}
                  onClick={() => setRating((index + 1) * 2)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <p className="text-lg mt-4">
            {movie?.overview || "No information available"}
          </p>

          <div className="mt-4 space-y-2">
            <p>
              <b>Duration:</b>{" "}
              {movie?.runtime ? `${movie.runtime} min` : "Unknown"}
            </p>
            <p>
              <b>Genres:</b>{" "}
              {movie?.genres?.length
                ? movie.genres.map((g) => g.name).join(", ")
                : "Unknown"}
            </p>
            <p>
              <b>Budget:</b>{" "}
              {movie?.budget ? `$${movie.budget.toLocaleString()}` : "Unknown"}
            </p>
            <p>
              <b>Language:</b> {movie?.original_language || "Unknown"}
            </p>
            <p>
              <b>Quality:</b> HD
            </p>
          </div>
        </div>

        {/* Cast Section */}
        <div className="mt-10 container -mb-100">
          <h2 className="text-2xl font-semibold mb-4">Top Cast</h2>
          <Swiper
            spaceBetween={10}
            slidesPerView={5}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {cast.map((actor) => (
              <SwiperSlide key={actor.id} className="w-32! h-32! rounded-full">
                <div className="flex flex-col h-32 w-32 rounded-full items-center text-center">
                  <img
                    src={getImageUrl(actor.profile_path, "w200")}
                    alt={actor.name}
                    className="w-32 h-32 object-cover rounded-full mb-2"
                  />
                  <p className="font-medium">{actor.name}</p>
                  <p className="text-sm text-gray-400">{actor.character}</p>
                </div>
              </SwiperSlide>
            ))}x
          </Swiper>
        </div>

        {/* Similar Movies Section */}
        <div className="mt-10">
          <Movies data={similarMovies} isLoading={false} title="Similar Movies" />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailClient;

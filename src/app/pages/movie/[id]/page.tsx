"use client";

import { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  getSingleMovie,
  getMovieVideos,
  getMovieCredits,
  getSimilarMovies,
} from "@/app/api/moviesApi";
import Skeleton from "@/app/components/skeleton/skeleton";
import DetailSkeleton from "@/app/components/skeleton/DetailSkeleton";
import Movies from "@/app/components/Movies";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";
import "swiper/css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

function getImageUrl(path: string, size: string = "w500") {
  return path ? `${IMAGE_BASE_URL}${size}${path}` : "/placeholder.jpg";
}

const DetailPageContent = () => {
  const { id } = useParams<{ id: string }>();
  const [rating, setRating] = useState<number>(0);

  if (!id) return null;

  const movieId = Number(id);

  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getSingleMovie(movieId),
  });

  const { data: videos } = useQuery({
    queryKey: ["movieVideos", movieId],
    queryFn: () => getMovieVideos(movieId),
  });

  const { data: credits } = useQuery({
    queryKey: ["movieCredits", movieId],
    queryFn: () => getMovieCredits(movieId),
  });

  const { data: similarMovies, isLoading: similarMoviesLoading } = useQuery({
    queryKey: ["movies", "similar", movieId],
    queryFn: () => getSimilarMovies(movieId),
  });

  if (isLoading) {
    return (
      <div className="w-full">
        <DetailSkeleton />
        <Skeleton />
      </div>
    );
  }

  const trailer = videos?.results?.find(
    (video: any) => video.type === "Trailer" && video.site === "YouTube",
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
          />
        ) : (
          <img
            src={getImageUrl(
              movie?.backdrop_path || movie?.poster_path,
              "w1280",
            )}
            alt={movie?.title}
            className="w-full h-full object-cover rounded-lg"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-10 left-10">
          <h1 className="text-4xl font-bold">{movie?.title}</h1>
          <p className="text-gray-300 max-w-xl mt-2">{movie?.overview}</p>
          <Link
            href={`/pages/movie/${movie?.id}`}
            className="mt-3 inline-block"
          >
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium">
              <FaPlay /> Watch
            </button>
          </Link>
        </div>
      </div>

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
                ? movie.genres.map((g:{ id: number; name: string }) => g.name).join(", ")
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
            {cast.map((actor: any) => (
              <SwiperSlide
                key={actor.id}
                className=" w-32! h-32! rounded-full"
              >
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
            ))}
          </Swiper>
        </div>

        <div className="mt-10">
          <Movies
            data={similarMovies}
            isLoading={similarMoviesLoading}
            title="Similar Movies"
          />
        </div>
      </div>
    </div>
  );
};

const DetailPageWrapper = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full">
          <div className="flex flex-col gap-10">
            <DetailSkeleton />
            <Skeleton />
          </div>
        </div>
      }
    >
      <DetailPageContent />
    </Suspense>
  );
};

export default DetailPageWrapper;

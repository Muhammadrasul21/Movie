"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSingleMovie, getMovieVideos, getMovieCredits } from "@/app/api/moviesApi";
import Skeleton from "@/app/components/skeleton/skeleton";
import DetailSkeleton from "@/app/components/skeleton/DetailSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";
import "swiper/css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

function getImageUrl(path: string, size: string = "w500") {
  return path ? `${IMAGE_BASE_URL}${size}${path}` : "/placeholder.jpg";
}

const DetailPageContent = () => {
  const { id } = useParams<{ id: string }>();

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

  if (isLoading) {
    return (
      <div className="w-full">
        <DetailSkeleton />
      </div>
    );
  }

  const trailer = videos?.results?.find(
    (video: any) => video.type === "Trailer" && video.site === "YouTube"
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
            src={getImageUrl(movie?.backdrop_path || movie?.poster_path, "w1280")}
            alt={movie?.title}
            className="w-full h-full object-cover rounded-lg"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-10 left-10">
          <h1 className="text-4xl font-bold">{movie?.title}</h1>
          <p className="text-gray-300 max-w-xl mt-2">{movie?.overview}</p>
          <Link href={`/pages/movie/${movie?.id}`} className="mt-3 inline-block">
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium">
              <FaPlay /> Watch
            </button>
          </Link>
        </div>
      </div>

      {/* Actors */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Top Cast</h2>
        <Swiper spaceBetween={10} slidesPerView={5}>
          {cast.map((actor: any) => (
            <SwiperSlide key={actor.id}>
              <div className="flex flex-col items-center text-center">
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

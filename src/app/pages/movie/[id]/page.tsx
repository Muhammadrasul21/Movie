"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSingleMovie, getSingleItems } from "@/app/api/moviesApi";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import React, { useState } from "react";
import DetailSkeleton from "@/app/components/skeleton/DetailSkeleton";
import { Skeleton } from "antd";
import BookmarkButton from "@/app/components/BookmarkButton";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [rating, setRating] = useState(0);

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getSingleMovie(Number(id)),
    enabled: !!id,
  });

  // Debug: Log movie data when it's loaded
  React.useEffect(() => {
    if (movie) {
      console.log('Movie data loaded:', movie);
    }
  }, [movie]);

  const { data: similar } = useQuery({
    queryKey: ["movie", id, "similar"],
    queryFn: () => getSingleItems(Number(id), "similar"),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex flex-col gap-10">
          <DetailSkeleton />
          <Skeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Error loading movie
          </h2>
          <p className="text-gray-400 mb-4">
            Something went wrong while fetching the movie details.
          </p>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black text-white min-h-screen px-4">
      <div className="w-full flex justify-center">
        <div
          className="w-[1360px] h-[700px] p-3 rounded-xl bg-gray-400 mt-2 flex flex-col items-center justify-between pb-[38px] text-white text-center relative"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL}${movie?.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="w-full flex justify-between">
            <Link
              href="/"
              className="w-14 h-14 bg-[#ffffffc4] dark:bg-[#000000c4] flex items-center justify-center rounded-xl text-primary cursor-pointer hover:bg-opacity-80 transition-all"
            >
              <MdKeyboardArrowLeft className="w-7 h-7" />
            </Link> 

                        <div className="flex gap-2">
              {movie && (
                <div onClick={(e) => e.stopPropagation()}>
                  <BookmarkButton movie={movie} size="lg" />
                </div>
              )}


              <button className="w-14 h-14 bg-[#ffffffc4] dark:bg-[#000000c4] flex items-center justify-center rounded-xl text-primary cursor-pointer hover:bg-opacity-80 transition-all">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="font-medium text-3xl">{movie?.title}</p>
            <div className="flex gap-4 mt-4 text-sm">
              <p>{movie?.release_date}</p>
              <p>{movie?.original_language?.toUpperCase()}</p>
              <p>⭐ {movie?.vote_average?.toFixed(1)}</p>
              <p>{movie?.vote_count} votes</p>
            </div>
            <Link href={`/pages/movie/${movie?.id}`} className="mt-3">
              <button className="flex items-center justify-center gap-2 px-[137px] py-3.5 bg-[#ffffff] dark:bg-[#000000] text-primary rounded-xl font-medium cursor-pointer hover:bg-opacity-90 transition-all">
                <FaPlay /> Watch
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="mt-5 px-10">
          <h1 className="text-4xl font-bold">{movie?.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-yellow-400 text-xl">
              {movie?.vote_average?.toFixed(1)}
            </p>
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

          <p className="text-lg mt-4 text-gray-300">
            {movie?.overview || "No information available"}
          </p>

          <div className="mt-4 space-y-2 text-gray-300">
            <p>
              <b className="text-white">Duration:</b>{" "}
              {movie?.runtime ? `${movie.runtime} min` : "Unknown"}
            </p>
            <p>
              <b className="text-white">Genres:</b>{" "}
              {movie?.genres?.length
                ? movie.genres.map((g: any) => g.name).join(", ")
                : "Unknown"}
            </p>
            <p>
              <b className="text-white">Budget:</b>{" "}
              {movie?.budget ? `$${movie.budget.toLocaleString()}` : "Unknown"}
            </p>
            <p>
              <b className="text-white">Language:</b>{" "}
              {movie?.original_language?.toUpperCase() || "Unknown"}
            </p>
            <p>
              <b className="text-white">Quality:</b> HD
            </p>
          </div>
        </div>

        <div className="mt-10 px-10">
          <h2 className="text-3xl font-semibold mb-4">Similar Movies:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {similar?.results?.slice(0, 10).map((m: any) => (
              <div key={m.id} className="block group relative">
                <Link href={`/pages/movie/${m.id}`}>
                  <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${m.poster_path}`}
                      alt={m.title}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-poster.jpg";
                      }}
                    />
                    <div className="p-3">
                      <p className="text-white font-semibold truncate group-hover:text-blue-400 transition-colors">
                        {m.title}
                      </p>

                      <p className="text-gray-400 text-sm mt-1">
                        ⭐ {m.vote_average?.toFixed(1)} ({m.vote_count} votes)
                      </p>
                    </div>
                  </div>
                </Link>
                
                {/* Bookmark Button for Similar Movies */}
                <div 
                  className="absolute top-2 right-2 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <BookmarkButton movie={m} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

"use client";

import { useQuery } from "@tanstack/react-query";
import { getSavedMovies } from "@/app/api/savedApi";
import Link from "next/link";
import BookmarkButton from "@/app/components/BookmarkButton";
import { FaRegBookmark } from "react-icons/fa";

export default function SavedMoviesPage() {
  const {
    data: savedMovies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["savedMovies"],
    queryFn: getSavedMovies,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-300">Loading saved movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Error loading saved movies
          </h2>
          <p className="text-gray-400 mb-4">
            Something went wrong while fetching your saved movies.
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
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            My Saved Movies
          </h1>
          <p className="text-xl text-gray-400">
            {savedMovies.length} {savedMovies.length === 1 ? "movie" : "movies"}{" "}
            saved
          </p>
        </div>

        {/* Saved Movies Grid */}
        {savedMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {savedMovies.map((movie: any) => (
              <div key={movie.id} className="group relative">
                <Link href={`/pages/movie/${movie.id}`}>
                  <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative">
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-poster.jpg";
                        }}
                      />
                      <div
                        className="absolute top-2 right-2 z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <BookmarkButton movie={movie} size="md" />
                      </div>
                      <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-md text-sm font-semibold">
                        {movie.vote_average?.toFixed(1)}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                        {movie.title}
                      </h3>

                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>
                          {movie.release_date
                            ? new Date(movie.release_date).getFullYear()
                            : "N/A"}
                        </span>
                        <span>{movie.vote_count} votes</span>
                      </div>

                      {movie.overview && (
                        <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                          {movie.overview}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No saved movies yet
            </h3>
            <p className="text-gray-400 mb-6">
              Start saving movies by clicking the bookmark icon on any movie you
              like!
            </p>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <FaRegBookmark />
              Browse Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

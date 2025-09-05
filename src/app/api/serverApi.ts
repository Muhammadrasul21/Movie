// serverApi.ts - Server-side API functions for SSR
import { apiFetcher } from "./api";
import { MovieDetail, MovieCredits, MovieVideos, SimilarMovies } from "../types/type";

// Server-side movie data fetcher
export async function getServerSideMovie(id: number): Promise<MovieDetail> {
  try {
    const movie = await apiFetcher(`/movie/${id}`);
    return movie as MovieDetail;
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw new Error(`Failed to fetch movie with ID: ${id}`);
  }
}

// Server-side movie credits fetcher
export async function getServerSideMovieCredits(id: number): Promise<MovieCredits> {
  try {
    const credits = await apiFetcher(`/movie/${id}/credits`);
    return credits as MovieCredits;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw new Error(`Failed to fetch credits for movie ID: ${id}`);
  }
}

// Server-side movie videos fetcher
export async function getServerSideMovieVideos(id: number): Promise<MovieVideos> {
  try {
    const videos = await apiFetcher(`/movie/${id}/videos`);
    return videos as MovieVideos;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw new Error(`Failed to fetch videos for movie ID: ${id}`);
  }
}

// Server-side similar movies fetcher
export async function getServerSideSimilarMovies(id: number): Promise<SimilarMovies> {
  try {
    const similarMovies = await apiFetcher(`/movie/${id}/similar`);
    return similarMovies as SimilarMovies;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    throw new Error(`Failed to fetch similar movies for movie ID: ${id}`);
  }
}

// Combined server-side data fetcher
export async function getServerSideMovieData(id: number) {
  try {
    // Fetch all data in parallel for better performance
    const [movie, credits, videos, similarMovies] = await Promise.all([
      getServerSideMovie(id),
      getServerSideMovieCredits(id),
      getServerSideMovieVideos(id),
      getServerSideSimilarMovies(id),
    ]);

    return {
      movie,
      credits,
      videos,
      similarMovies,
    };
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
}

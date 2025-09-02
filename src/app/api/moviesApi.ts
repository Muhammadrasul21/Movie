// moviesApi.ts
import { apiFetcher } from "./api";

// Filmlar ro‘yxati
export const getMovies = (params: { page?: number; with_genres?: string }) =>
  apiFetcher("/discover/movie", params);

// Bitta film
export const getSingleMovie = (id: number) => apiFetcher(`/movie/${id}`);

// Filmga tegishli items
export const getSingleItems = (id: number, path: string) =>
  apiFetcher(`/movie/${id}/${path}`);

// Janrlar
export const getGenres = () => apiFetcher("/genre/movie/list");

// Qidiruv
export const getSearch = (params: { query: string }) =>
  apiFetcher("/search/movie", params);


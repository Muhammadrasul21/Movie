import { IconType } from "react-icons";

export interface NavbarItem {
  id: number;
  icon: IconType;
  name: string;
  path: string;
}

export interface FooterItem {
  id: number;
  icon: IconType;
  title: string;
}

export interface FooterCategory {
  id: number;
  icon: IconType;
  title: string;
}
export interface HeroProps {
  movies: any[];
}

export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

export interface MovieDetail extends Movie {
  overview: string;
  backdrop_path: string | null;
  runtime: number;
  budget: number;
  original_language: string;
  genres: Array<{ id: number; name: string }>;
  release_date: string;
  status: string;
  tagline: string;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
  }>;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface MovieCredits {
  cast: CastMember[];
  crew: Array<{
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
  }>;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface MovieVideos {
  results: Video[];
}

export interface SimilarMovies {
  results: Movie[];
}

export interface MoviePageProps {
  movie: MovieDetail;
  credits: MovieCredits;
  videos: MovieVideos;
  similarMovies: SimilarMovies;
}

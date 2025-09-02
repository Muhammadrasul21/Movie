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

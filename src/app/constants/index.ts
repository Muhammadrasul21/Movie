import { FooterCategory, FooterItem, NavbarItem } from "../types/type";
import { PiMonitorFill } from "react-icons/pi";
import { BsFillTabletFill } from "react-icons/bs";
import { FaSearch, FaBookmark } from "react-icons/fa";
import {
  RiBasketballLine,
  RiMovie2Line,
  RiClapperboardLine,
  RiMovieLine,
  RiFileList2Line,
  RiPhoneLine,
  RiShiningLine,
} from "react-icons/ri";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export const navbarItems: NavbarItem[] = [
  {
    id: 1,
    icon: PiMonitorFill,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    icon: BsFillTabletFill,
    name: "Movie",
    path: "/pages/movie",
  },
  {
    id: 3,
    icon: FaBookmark,
    name: "Saved",
    path: "/pages/saved",
  },
  {
    id: 4,
    icon: FaSearch,
    name: "Search",
    path: "/pages/search",
  },
];
export const footerInfo: FooterItem[] = [
  {
    id: 1,
    icon: RiFileList2Line,
    title: "Public Offer",
  },
  {
    id: 2,
    icon: RiShiningLine,
    title: "Advertisement",
  },
  {
    id: 3,
    icon: AiOutlineQuestionCircle,
    title: "F.A.Q",
  },
  {
    id: 4,
    icon: RiPhoneLine,
    title: "Contacts",
  },
];
export const footerCategory: FooterCategory[] = [
  {
    id: 1,
    icon: RiMovieLine,
    title: "Movie",
  },
  {
    id: 2,
    icon: RiClapperboardLine,
    title: "Theatre",
  },
  {
    id: 3,
    icon: RiMovie2Line,
    title: "Concerts",
  },
  {
    id: 4,
    icon: RiBasketballLine,
    title: "Sport",
  },
];
export const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL || "https://image.tmdb.org/t/p";

// Helper function to get optimized image URL
export const getImageUrl = (path: string, size: string = 'w500') => {
  if (!path) return '/placeholder-poster.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

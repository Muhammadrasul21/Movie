import { NavbarItem } from "../types/type";
import { PiMonitorFill } from "react-icons/pi";
import { BsFillTabletFill } from "react-icons/bs";
import { FaSearch, FaBookmark } from "react-icons/fa";

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
    path: "/movie",
  },
  {
    id: 3,
    icon: FaBookmark,
    name: "Saved",
    path: "/saved",
  },
  {
    id: 4,
    icon: FaSearch,
    name: "Search",
    path: "/search",
  },
];

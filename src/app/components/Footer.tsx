import React from "react";
import appStore from "../assets/appstore.svg";
import google from "../assets/google.svg";
import Image from "next/image";
import { footerCategory, footerInfo } from "../constants";
import { RiInstagramLine, RiYoutubeLine, RiTelegramLine } from "react-icons/ri";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="container bg-[#111111] text-white p-[30px] rounded-xl">
      <div className="footer p-8 flex justify-between">
        <div className="flex flex-col gap-2">
          <Link
            href={
              "https://bile-tick-2bk1k69vk-muhammadrasuls-projects.vercel.app/"
            }
            target="blank"
            className="mb-12"
          >
            <Image src="/logoIcon.svg" alt="#" width={55} height={36} />
          </Link>

          <Link
            href={"https://play.google.com/store/games?hl=en"}
            target="blank"
          >
            <Image src={google} alt="" />
          </Link>

          <Link href={"https://www.apple.com/app-store/"} target="blank">
            <Image src={appStore} alt="" />
          </Link>
        </div>
        <ul className="flex  gap-4 flex-col">
          <li className="font-medium mb-1">About Us</li>
          {footerInfo?.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-2 text-black dark:text-white hover:text-primary hover:underline focus:text-primary focus:underline transition duration-200 cursor-pointer"
            >
              <item.icon className="text-primary" />
              {item.title}
            </li>
          ))}
        </ul>
        <ul className="flex gap-4 flex-col">
          <li className="font-medium mb-1">Category</li>
          {footerCategory?.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-2 text-black dark:text-white hover:text-primary hover:underline focus:text-primary focus:underline transition duration-200 cursor-pointer"
            >
              <item.icon className="text-primary" />
              {item.title}
            </li>
          ))}
        </ul>
        <div className="flex  flex-col gap-14">
          <div className="flex flex-col gap-5">
            <p className="font-medium">Contact Us</p>
            <p className="font-medium text-xl text-primary">
              +998 (95) 897-33-38
            </p>
          </div>

          <div className="flex flex-col gap-5 text-primary">
            <p className="text-black dark:text-white font-medium">
              Social Media
            </p>
            <div className="flex gap-5">
              <Link
                href={"https://www.instagram.com/gulomoov_1"}
                target="blank"
              >
                <RiInstagramLine className="min-w-5 min-h-5 cursor-pointer" />{" "}
              </Link>
              <Link href={"https://t.me/gulomjonovs_1"} target="blank">
                <RiTelegramLine className="min-w-5 min-h-5 cursor-pointer" />{" "}
              </Link>
              <Link
                href={"https://www.youtube.com/@gulomoov__1"}
                target="blank"
              >
                <RiYoutubeLine className="min-w-5 min-h-5 cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

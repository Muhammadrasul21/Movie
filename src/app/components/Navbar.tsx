"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo.svg";
import bilogo from "../assets/bilogo.svg";
import { Select } from "antd";
import { navbarItems } from "../constants";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";

const { Option } = Select;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<string>("uz");

  return (
    <div className="container sticky top-[50px] z-10">
      <div className="flex justify-center w-full h-[82px] transition-colors duration-300">
        <div className="py-4 container fixed flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-medium flex items-center gap-2"
          >
            <Image src={logo} alt="Logo" width={55} height={36} />
            <Image src="/bilogo.svg" alt="Bilogo" width={46} height={32} />
          </Link>

          <div className="hidden sm:flex items-center gap-8">
            {navbarItems?.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className="flex items-center gap-2 transition-colors duration-200 text-[#A1A1A1] hover:text-gray-200"
              >
                <div className="flex flex-col gap-[6px] items-center">
                  <item.icon className="min-h-6 min-w-6" />
                  <p className="font-medium text-[12px]">{item.name}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Select
              value={value}
              onChange={(val) => setValue(val)}
              placeholder="Language"
              style={{
                width: 92,
                backgroundColor: "#1f2937",
                color: "#fff",
                borderRadius:"10px"
              }}
            >
              <Option value="ru">
                <span className="flex items-center gap-2">
                  <Image
                    src="/flags/ru.png"
                    alt="Russian flag"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  Ru
                </span>
              </Option>
              <Option value="uz">
                <span className="flex items-center gap-2">
                  <Image
                    src="/flags/uzb.png"
                    alt="Uzbek flag"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  Uz
                </span>
              </Option>
              <Option value="eng">
                <span className="flex items-center gap-2">
                  <Image
                    src="/flags/eng.png"
                    alt="English flag"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  Eng
                </span>
              </Option>
            </Select>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex sm:hidden text-2xl text-white"
            >
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-10"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4 }}
              className="fixed top-0 right-0 w-2/3 h-full bg-gray-900 shadow-lg z-20 flex flex-col items-center pt-20 gap-8"
            >
              {navbarItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-gray-200 hover:text-blue-400"
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

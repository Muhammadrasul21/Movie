'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo.svg";
import bilogo from "../assets/bilogo.svg";
import { Select, Segmented } from "antd";
import { navbarItems } from "../constants";
import { GiHamburgerMenu } from "react-icons/gi";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useTheme } from "../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const { Option } = Select;

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
const [value, setValue] = useState<string>("uz");

  const handleThemeChange = (value: string | number) => {
    if (value === "dark" && theme === "light") toggleTheme();
    else if (value === "light" && theme === "dark") toggleTheme();
  };

  return (
    <div className="w-full flex justify-center sticky top-0 left-0 z-10">
      <div className="flex justify-center w-full h-[82px] transition-colors duration-300">
        <div className="py-4 container fixed flex justify-between items-center">
          
          <Link href="/" className="text-2xl font-medium flex items-center gap-2">
            <Image src={logo} alt="Logo" />
            <Image src={bilogo} alt="Bilogo" />
          </Link>

          <div className="hidden sm:flex items-center gap-8">
            {navbarItems?.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className="flex items-center gap-2 transition-colors duration-200 text-[#A1A1A1] hover:text-gray-800 dark:hover:text-gray-200"
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
    backgroundColor: theme === "dark" ? "#1f2937" : "#fff", 
    color: theme === "dark" ? "#fff" : "#000",
  }}
>
  <Option value="ru">
    <span className="flex items-center gap-2">
      <img src="/flags/ru.png" alt="Russian flag" className="w-5 h-5 rounded-full" />
      Ru
    </span>
  </Option>
  <Option value="uz">
    <span className="flex items-center gap-2">
      <img src="/flags/uzb.png" alt="Uzbek flag" className="w-5 h-5 rounded-full" />
      Uz
    </span>
  </Option>
  <Option value="eng">
    <span className="flex items-center gap-2">
      <img src="/flags/eng.png" alt="English flag" className="w-5 h-5 rounded-full" />
      Eng
    </span>
  </Option>
</Select>


            <Segmented
              options={[
                { label: <SunOutlined />, value: "light" },
                { label: <MoonOutlined />, value: "dark" },
              ]}
              value={theme}
              onChange={handleThemeChange}
              shape="round"
              className="transition-all duration-300"
            />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex sm:hidden text-2xl"
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
              className="fixed top-0 right-0 w-2/3 h-full bg-white dark:bg-black shadow-lg z-20 flex flex-col items-center pt-20 gap-8"
            >
              {navbarItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-blue-500"
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

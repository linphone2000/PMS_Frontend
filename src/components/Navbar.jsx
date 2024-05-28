// React
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
// Context
import { useUIModal } from "../context/UIModalContext";

const Navbar = () => {
  // Context
  const { isSideBarOpen } = useUIModal();

  // States
  const [currentDate, setCurrentDate] = useState(new Date());
  const [greeting, setGreeting] = useState("Good Morning");
  const [iconClass, setIconClass] = useState("fa-solid fa-sun");

  // Effect used to render time based on time of the day
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);
      const hours = now.getHours();
      if (hours < 12) {
        setGreeting("Good Morning");
        setIconClass("fa-solid fa-cloud-sun text-sky-400");
      } else if (hours < 18) {
        setGreeting("Good Afternoon");
        setIconClass("fa-solid fa-sun text-yellow-400");
      } else {
        setGreeting("Good Night");
        setIconClass("fa-solid fa-moon text-sky-600");
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Handlers

  return (
    <div className="h-20 w-full sticky top-0 shadow-lg bg-gray-950 text-white flex items-center justify-between">
      {/* Left Pane */}
      <AnimatePresence>
        {isSideBarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "20%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-1/5 h-full flex justify-between items-center bg-gray-950 gap-4"
          >
            <h1 className="ps-2 text-center font-bold">
              Pharmacy Management System
            </h1>
            <button>
              <img
                className="w-14 inline-block rounded-xl shadow-md opacity-100 hover:opacity-85 hover:scale-105 transition"
                src="pms_logo.webp"
                alt="PMS Logo"
              ></img>
            </button>

            {/* Vertical bar */}
            <div className="border-r border-gray-300 h-14"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Pane */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: isSideBarOpen ? "80%" : "100%" }}
        transition={{ duration: 0.5 }}
        className="flex w-4/5 px-4 justify-between transition"
      >
        {/* Left */}
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-language"></i>
          <p>English</p>
          <i className="fa-solid fa-angle-down"></i>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-end items-center gap-2">
            <i className={iconClass + " text-2xl"}></i>
            <h1>{greeting}</h1>
          </div>
          <div className="flex gap-2">
            <p>{currentDate.toLocaleDateString()}</p>
            <p>{currentDate.toLocaleTimeString()}</p>
          </div>
        </div>
        {/*  */}
      </motion.div>
    </div>
  );
};

export default Navbar;

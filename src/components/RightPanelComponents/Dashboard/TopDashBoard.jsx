import React, { useState, useEffect } from "react";

const TopDashBoard = () => {

  return (
    <div className="bg-sky-700 flex justify-between px-4 py-4 text-sky-100 rounded-t-md">
      {/* Left */}
      {/* <div className="flex items-center gap-2">
        <i className="fa-solid fa-language"></i>
        <p>Language</p>
        <i className="fa-solid fa-angle-down"></i>
      </div> */}

      {/* Right */}
      {/* <div className="flex flex-col gap-2">
        <div className="flex justify-end items-center gap-2">
          <i className={iconClass + " text-2xl"}></i>
          <h1>{greeting}</h1>
        </div>
        <div className="flex gap-2">
          <p>{currentDate.toLocaleDateString()}</p>
          <p>{currentDate.toLocaleTimeString()}</p>
        </div>
      </div> */}
    </div>
  );
};

export default TopDashBoard;

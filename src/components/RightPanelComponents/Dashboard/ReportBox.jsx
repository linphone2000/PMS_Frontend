import React from "react";

const ReportBox = ({
  title,
  mainStat,
  mainStatLabel,
  secondaryStat,
  secondaryStatLabel,
  handleClick,
  page,
}) => {
  return (
    <div className="border bg-sky-800 border-sky-300 rounded-md">
      <div className="flex justify-between px-4 py-2 rounded-md items-center">
        <p className="font-semibold text-lg">{title}</p>
        <div
          onClick={() => handleClick(page)}
          className="flex gap-2 items-center font-extralight text-sm hover:scale-95 transition hover:cursor-pointer"
        >
          <p className="text-sky-300">Go to {title}</p>
          <i className="fa-solid fa-angles-right text-sky-300"></i>
        </div>
      </div>
      <hr className="mx-4 border-sky-500"></hr>
      <div className="flex justify-between px-4 py-2 rounded-md">
        <div className="">
          <p className="font-bold text-lg">{mainStat}</p>
          <p>{mainStatLabel}</p>
        </div>
        <div className="">
          <div className="">
            <p className="font-bold text-lg">{secondaryStat}</p>
            <p>{secondaryStatLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBox;

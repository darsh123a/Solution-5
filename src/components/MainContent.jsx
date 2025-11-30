import React from "react";
import Wheather from "./Wheather";
import Info from "./Info";
import DailyReport from "./DailyReport";
import HourlyForecast from "./HourlyForecast";

const MainContent = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full">
      {/* Left section */}
      <div className="flex-1">
        <Wheather />
        <Info />
        <DailyReport />
      </div>

      {/* Right section */}
      <div className="text-white w-full lg:w-auto">
        <HourlyForecast />
      </div>
    </div>
  );
};

export default MainContent;

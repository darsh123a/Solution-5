import React from "react";

const DailyReportCard = ({ day, max, min, icon }) => {
  return (
    <div className="bg-[#2C2E58] w-full sm:w-[90px] rounded-xl p-4 flex flex-col items-center gap-3 border border-white/10 shadow-md shadow-black/20">
      <p className="text-white/70 text-xs sm:text-sm font-medium">{day}</p>

      <img src={icon} alt={day} className="w-6 h-6 sm:w-8 sm:h-8" />

      <div className="flex items-center gap-2">
        <p className="text-white text-sm sm:text-base font-semibold">{max}°</p>
        <p className="text-white/60 text-sm sm:text-base">{min}°</p>
      </div>
    </div>
  );
};

export default DailyReportCard;

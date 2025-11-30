import React from "react";
import DailyReportCard from "./DailyReportCard";

const DailyReport = () => {
  const dailyData = [
    { day: "Tue", max: 20, min: 14, icon: "/assets/icon-rain.webp" },
    { day: "Wed", max: 21, min: 15, icon: "/assets/icon-overcast.webp" },
    { day: "Thu", max: 24, min: 14, icon: "/assets/icon-sunny.webp" },
    { day: "Fri", max: 25, min: 13, icon: "/assets/icon-sunny.webp" },
    { day: "Sat", max: 21, min: 15, icon: "/assets/icon-storm.webp" },
    { day: "Sun", max: 25, min: 16, icon: "/assets/icon-partly-cloudy.webp" },
    { day: "Mon", max: 24, min: 15, icon: "/assets/icon-wind.webp" },
  ];

  return (
    <div className="w-full">
      <h1 className="text-white text-lg sm:text-xl font-semibold mb-4">
        Daily Forecast
      </h1>
      <div className="flex flex-wrap gap-3">
        {dailyData.map((item, index) => (
          <DailyReportCard
            key={index}
            day={item.day}
            max={item.max}
            min={item.min}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default DailyReport;

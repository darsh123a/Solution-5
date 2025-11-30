import React, { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../components/WeatherContext";
import { weatherIconMap } from "../utils/Weathericons";

const HourlyForecast = () => {
  const { weather } = useContext(WeatherContext);

  const dailyDates = React.useMemo(() => {
    return weather?.daily?.map((d) => d.day) || [];
  }, [weather]);

  const [selectedDay, setSelectedDay] = useState(dailyDates[0] || "");

  // FIXED: Avoid synchronous setState in effect
  useEffect(() => {
    if (!dailyDates.length) return;

    Promise.resolve().then(() => {
      setSelectedDay(dailyDates[0]);
    });
  }, [dailyDates]);

  if (!weather) return null;

  const hoursForSelectedDay = weather.hourly.filter(
    (h) => h.time && selectedDay && h.time.startsWith(selectedDay)
  );

  function formatHour(timeString) {
    if (!timeString) return "--";
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  }

  return (
    <div className="bg-[#2B2D5B] rounded-2xl p-5 w-full sm:w-[280px] text-white flex flex-col h-auto max-h-[515px] shadow-xl shadow-black/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-white/90">
          Hourly forecast
        </h2>

        <select
          className="bg-[#26284D] text-white text-xs sm:text-sm px-2 py-1 rounded-md outline-none"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          {dailyDates.map((day, index) => (
            <option key={index} value={day}>
              {new Date(day).toLocaleDateString("en-US", { weekday: "long" })}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3 mt-2 overflow-y-auto pr-2 no-scrollbar">
        {hoursForSelectedDay.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-[#26284D] px-4 py-3 rounded-xl border border-white/10 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <img
                src={
                  weatherIconMap[item.weathercode] || "/assets/icon-sunny.webp"
                }
                className="w-6 h-6 sm:w-8 sm:h-8"
                alt="weather icon"
              />
              <p className="text-white/80 text-xs sm:text-sm">
                {formatHour(item.time)}
              </p>
            </div>

            <p className="text-white font-semibold text-sm sm:text-base">
              {Math.round(item.temp)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;

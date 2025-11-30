import React, { useContext } from "react";
import { WeatherContext } from "../components/WeatherContext";

const Wheather = () => {
  const { weather } = useContext(WeatherContext);

  const city = weather?.location?.city || "----";
  const country = weather?.location?.country || "--";
  const temperature = weather?.current?.temperature ?? "--";

  const today = weather?.current?.time
    ? new Date(weather.current.time).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "--- --, ----";

  return (
    <div
      className="
        w-full min-h-[200px]
        rounded-lg
        flex justify-center items-center
        text-white font-bold
        bg-no-repeat bg-cover bg-center
        p-4 sm:p-6
      "
      style={{ backgroundImage: "url('/assets/bg-today-large.svg')" }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4 sm:gap-6">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            {city}, {country}
          </h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg">
            {today}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="text-5xl sm:text-6xl md:text-8xl font-bold rotate-1 font-sans">
          {temperature}°
        </div>
      </div>
    </div>
  );
};

export default Wheather;

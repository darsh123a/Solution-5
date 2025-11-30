import React, { useContext } from "react";
import InfoCard from "./InfoCard";
import { WeatherContext } from "../components/WeatherContext";

const Info = () => {
  const { weather, tempUnit, windUnit, precipUnit } =
    useContext(WeatherContext);

  function format(value) {
    if (value === undefined || value === null) return "--";
    if (Number(value) < 0.01) return "0.00";
    return Number(value).toFixed(2);
  }

  return (
    <div className="w-full h-auto flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-stretch gap-3 mt-10 ">
      <InfoCard
        title="Feels Like"
        value={format(weather?.current?.feels_like)}
        unit={tempUnit === "fahrenheit" ? "°F" : "°C"}
      />

      <InfoCard
        title="Humidity"
        value={format(weather?.current?.humidity)}
        unit="%"
      />

      <InfoCard
        title="Wind"
        value={format(weather?.current?.wind)}
        unit={windUnit === "mph" ? " mph" : " km/h"}
      />

      <InfoCard
        title="Precipitation"
        value={weather?.current?.precipitation}
        unit={precipUnit === "inch" ? " in" : " mm"}
      />
    </div>
  );
};

export default Info;

import React, { useState, useContext } from "react";
import { WeatherContext } from "../components/WeatherContext";

const Header = () => {
  const [open, setOpen] = useState(false);

  const {
    setTempUnit,
    setWindUnit,
    setPrecipUnit,
    tempUnit,
    windUnit,
    precipUnit,
  } = useContext(WeatherContext);

  function choose(fn) {
    fn(); // apply unit
    setOpen(false); // close dropdown
  }

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center p-4 relative gap-4 sm:gap-6">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img src="/assets/logo.svg" alt="Logo" className="w-32 sm:w-40" />
      </div>

      {/* Units Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-[#26284D] flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm hover:bg-[#30315A] transition"
      >
        <img src="/assets/icon-units.svg" alt="Units Icon" className="w-4" />
        Units
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-4 top-20 sm:top-16 bg-[#2B2D5B] w-60 p-4 text-white rounded-2xl shadow-xl border border-white/10 z-50">
          {/* Temperature */}
          <p className="text-xs text-white/60 mb-2">Temperature</p>
          <button
            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-[#3A3C6B] ${
              tempUnit === "celsius" ? "bg-[#3A3C6B]" : ""
            }`}
            onClick={() => choose(() => setTempUnit("celsius"))}
          >
            Celsius (°C)
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-[#3A3C6B] ${
              tempUnit === "fahrenheit" ? "bg-[#3A3C6B]" : ""
            }`}
            onClick={() => choose(() => setTempUnit("fahrenheit"))}
          >
            Fahrenheit (°F)
          </button>

          {/* Wind */}
          <p className="text-xs text-white/60 mt-4 mb-2">Wind Speed</p>
          <button
            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-[#3A3C6B] ${
              windUnit === "kmh" ? "bg-[#3A3C6B]" : ""
            }`}
            onClick={() => choose(() => setWindUnit("kmh"))}
          >
            km/h
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-[#3A3C6B] ${
              windUnit === "mph" ? "bg-[#3A3C6B]" : ""
            }`}
            onClick={() => choose(() => setWindUnit("mph"))}
          >
            mph
          </button>

          {/* Precipitation */}
          <p className="text-xs text-white/60 mt-4 mb-2">Precipitation</p>
          <button
            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-[#3A3C6B] ${
              precipUnit === "mm" ? "bg-[#3A3C6B]" : ""
            }`}
            onClick={() => choose(() => setPrecipUnit("mm"))}
          >
            Millimeters (mm)
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-[#3A3C6B] ${
              precipUnit === "inch" ? "bg-[#3A3C6B]" : ""
            }`}
            onClick={() => choose(() => setPrecipUnit("inch"))}
          >
            Inches (in)
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;

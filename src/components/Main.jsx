import React, { useState, useContext, useEffect } from "react";
import { WeatherContext } from "./WeatherContext";

const Main = () => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { fetchWeatherForCity } = useContext(WeatherContext);

  async function fetchCitySuggestions(query) {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
    );
    const data = await res.json();
    setSuggestions(data.results || []);
  }

  useEffect(() => {
    let shouldClear = false;

    if (!searchValue.trim()) {
      shouldClear = true;
    }

    const timer = setTimeout(() => {
      if (shouldClear) {
        setSuggestions([]);
      } else {
        fetchCitySuggestions(searchValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  function handleSelectCity(cityName) {
    setSearchValue(cityName);
    setSuggestions([]);
    fetchWeatherForCity(cityName);
  }

  function handleSearch() {
    if (!searchValue.trim()) return;
    fetchWeatherForCity(searchValue);
    setSuggestions([]);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-8 sm:gap-10 mt-10 mb-10">
      <h1 className="text-2xl sm:text-3xl md:text-5xl text-white font-sans font-bold text-center">
        How's the sky looking today
      </h1>

      {/* Search Box + Button */}
      <div className="w-full max-w-xl flex flex-col md:flex-row items-center gap-3 relative">
        {/* INPUT BOX */}
        <div className="flex items-center bg-[#181A41] px-4 py-3 rounded-2xl flex-1 w-full">
          <img
            src="/assets/icon-search.svg"
            className="w-5 h-5 filter invert"
            alt="search"
          />
          <input
            type="text"
            placeholder="Enter city name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-white/60 outline-none ml-3 text-base sm:text-lg"
          />
        </div>

        {/* SEARCH BUTTON */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 mt-4 md:mt-0 rounded-2xl text-base sm:text-lg font-bold whitespace-nowrap w-full md:w-auto"
          onClick={handleSearch}
        >
          Search
        </button>

        {/* SUGGESTIONS DROPDOWN */}
        {suggestions.length > 0 && (
          <div className="absolute top-[65px] left-0 bg-[#1F2143] w-full md:w-[75%] rounded-xl shadow-lg border border-white/10 max-h-60 overflow-y-auto z-50">
            {suggestions.map((item, idx) => (
              <div
                key={idx}
                className="p-3 text-white hover:bg-[#2B2D5B] cursor-pointer"
                onClick={() => handleSelectCity(item.name)}
              >
                {item.name}, {item.country}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;

import { createContext, useState, useEffect } from "react";

const WeatherContext = createContext();

function WeatherProvider({ children }) {
  const [rawWeather, setRawWeather] = useState(null);
  const [weather, setWeather] = useState(null);

  const [tempUnit, setTempUnit] = useState("celsius");
  const [windUnit, setWindUnit] = useState("kmh");
  const [precipUnit, setPrecipUnit] = useState("mm");

  const toF = (c) => (c * 9) / 5 + 32;
  const toMPH = (kmh) => kmh / 1.609;
  const toInch = (mm) => mm / 25.4;

  async function fetchWeatherForCity(city) {
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results?.length) return null;

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,weathercode,precipitation,wind_speed_10m,apparent_temperature&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

      const weatherRes = await fetch(weatherURL);
      const data = await weatherRes.json();
      console.log(data);
      const clean = {
        location: { city: name, country },
        current: {
          temperature: data.current_weather.temperature,
          wind: data.current_weather.windspeed,
          time: data.current_weather.time,
          feels_like: data.hourly.apparent_temperature[0],
          humidity: data.hourly.relativehumidity_2m[0],
          precipitation: data.hourly.precipitation[0],
        },
        daily: data.daily.time.map((day, i) => ({
          day,
          max: data.daily.temperature_2m_max[i],
          min: data.daily.temperature_2m_min[i],
          weathercode: data.daily.weathercode[i],
        })),
        hourly: data.hourly.time.map((t, i) => ({
          time: t,
          temp: data.hourly.temperature_2m[i],
          weathercode: data.hourly.weathercode[i],
        })),
      };
      console.log("RAW PRECIPITATION (mm):", clean);

      setRawWeather(clean);
      return clean;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      if (active) fetchWeatherForCity("Chandigarh");
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!rawWeather) return;

    Promise.resolve().then(() => {
      const converted = {
        ...rawWeather,
        current: {
          ...rawWeather.current,
          temperature:
            tempUnit === "fahrenheit"
              ? toF(rawWeather.current.temperature)
              : rawWeather.current.temperature,
          feels_like:
            tempUnit === "fahrenheit"
              ? toF(rawWeather.current.feels_like)
              : rawWeather.current.feels_like,
          wind:
            windUnit === "mph"
              ? toMPH(rawWeather.current.wind)
              : rawWeather.current.wind,
          precipitation:
            precipUnit === "inch"
              ? toInch(rawWeather.current.precipitation)
              : rawWeather.current.precipitation,
        },
        daily: rawWeather.daily.map((d) => ({
          ...d,
          max: tempUnit === "fahrenheit" ? toF(d.max) : d.max,
          min: tempUnit === "fahrenheit" ? toF(d.min) : d.min,
        })),
        hourly: rawWeather.hourly.map((h) => ({
          ...h,
          temp: tempUnit === "fahrenheit" ? toF(h.temp) : h.temp,
        })),
      };

      setWeather(converted);
    });
  }, [rawWeather, tempUnit, windUnit, precipUnit]);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        fetchWeatherForCity,
        tempUnit,
        setTempUnit,
        windUnit,
        setWindUnit,
        precipUnit,
        setPrecipUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext, WeatherProvider };

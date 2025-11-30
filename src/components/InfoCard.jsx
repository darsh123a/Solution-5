import React from "react";

const InfoCard = ({ title, value, unit }) => {
  return (
    <div className="bg-[#2C2D52] rounded-xl p-5 flex flex-col justify-center items-start border border-white/10 shadow-lg shadow-black/10 w-full sm:w-[150px] gap-3">
      <p className="text-white/70 text-sm font-medium">{title}</p>
      <h2 className="text-white text-xl sm:text-2xl font-semibold mt-1">
        {value}
        {unit}
      </h2>
    </div>
  );
};

export default InfoCard;

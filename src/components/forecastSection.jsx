import React from "react";

export default function ForecastSection({ temp, des, Max, Min, img, day }) {
  return (
    <div className="p-4 rounded-3xl text-white shadow-lg place-items-center bg-gradient-to-r from-blue-400 to-blue-800">
      <h3 className="font-bold text-lg">{day}</h3>
      <img src={img}></img>
      <h1 className="text-lg font-semibold pb-2">{temp}°</h1>
      <p>{des}</p>
      <p >
        <span className="pr-15">H: {Max}°</span>
        <span>L: {Min}°</span>
      </p>
    </div>
  );
}

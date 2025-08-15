import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import axios from "axios";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


export default function Header({setCrrCity}){

 const[city, setCity] = useState("");

    const GetLocationCoords = async (lat, lon) => {
    try{
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
         setCity(res.data.name);
         setCrrCity(res.data.name);
         console.log(res.data.name);
    } catch(err){
        console.error(err);
    }
}

const GetCurrentCity= async ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                GetLocationCoords(
                    position.coords.latitude,
                    position.coords.longitude
                );
            },
            ()=>{
                console.error("no city found...");
            },
            { enableHighAccuracy: true }
        );
    }
}

    return(
        <header className="flex justify-between items-center bg-white-700 shadow-md px-8 py-3 mb-8">
            <div className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faCloudMoon} className="p-2 bg-gradient-to-r from-blue-400 to-blue-800 text-white text-xl rounded-lg "/>
                <h3 className="text-xl font-bold text-black ">Weather </h3>
            </div>
            <button onClick={()=>{GetCurrentCity();}}  className="px-3 py-2 cursor-pointer text-white bg-gradient-to-r from-blue-400 to-blue-800 rounded-lg">Current Location</button>
        </header>
    )
}
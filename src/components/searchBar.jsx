import React, { useState } from "react";


export default function SearchBar({setCity}){
    const[searchCity, setSearchCity] = useState("");

    const handleSubmit=()=>{
       if(searchCity.trim() !== ""){
         setCity(searchCity);
         setSearchCity("");
       }
    }

    const handleKey=(e)=>{
        if(e.key=== "Enter"){
            handleSubmit();
        }
    }

    return(
        <div className=" px-8 py-2 mb-6">
            <div className=" flex p-3 border-2 border-black/10 w-[100%] rounded-xl">
                <input onKeyDown={handleKey}  type="text" placeholder="Search for City" className="border-none outline-none flex-1" value={searchCity} onChange={(e)=>setSearchCity(e.target.value)}/>
                <button onClick={handleSubmit} className="px-4 cursor-pointer py-2 bg-gradient-to-r from-blue-400 to-blue-800 rounded-lg text-white" >Search</button>
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Header from './components/header';
import SearchBar from './components/searchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudMoon, faWind, faDroplet } from '@fortawesome/free-solid-svg-icons';
import ForecastSection from './components/forecastSection';

function App() {
const [city, setCity] = useState("Islamabad");
const[weather, setWeather]=useState(null);
const[forecast, setForecast]=useState(null);

const API_KEY=import.meta.env.VITE_WEATHER_API_KEY;

const searchedCity=(city)=>{
  setCity();
}

useEffect(()=>{
  async function fetchWeather() {
    try{
      const WeatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const ForecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(WeatherRes.data);

      const forecast3Days = ForecastRes.data.list.filter(item=> item.dt_txt.includes("12:00:00")).slice(0,3);
      setForecast(forecast3Days);

    } catch(err){
      if(err.response && err.response.status === 404){
        alert("city not found");
      }else{
        console.error(err); 
      }
    }
    

  }
  fetchWeather();
},[API_KEY, city]);

  return (
  <>
  <Header setCrrCity={setCity} />
  <SearchBar setCity={setCity}/>
    <section className='mx-8 py-6 my-2 px-8 bg-gradient-to-r from-blue-500 to-blue-800 rounded-xl text-white '>
      {weather?(
        <>
        <div className='flex justify-between flex-wrap items-center '>
          <h2 className='text-3xl font-bold'>{weather.name}</h2>
          <FontAwesomeIcon icon={faCloudMoon} className='text-6xl mb-4'/>
        </div>
        <div className='flex justify-between flex-wrap p3-4'>
          <div className='flex gap-4 items-center'>
            <span className='text-5xl font-semibold'>{weather.main.temp}°</span>
            <div>
              <p className='font-semibold text-lg'>{weather.weather[0].description}</p>
              <p className='text-md'>Feels Like {weather.main.feels_like}° </p>
            </div>
          </div>
          <div>
            <p className='text-lg font-semibold'><FontAwesomeIcon icon={faWind}  className='text-sm px-1'/>{weather.wind.speed}m/s</p>
            <p className='text-lg font-semibold'><FontAwesomeIcon icon={faDroplet} className='text-sm px-1' />{weather.main.humidity}%</p>
          </div>
        </div>
        </>
      ):(
        <h2 className='text-xl font-extrabold'>Loading...</h2>
      )} 
    </section>
    
   <div className=' p-6 my-4 mx-8 gap-6 grid lg:grid-cols-3 sm:grid-cols-1'>
     {forecast?.map((frcst, index)=>{
      const dayName= new Date(frcst.dt_txt).toLocaleDateString("en-Us",{weekday:"long"});
      return(
      <ForecastSection key={index} day={dayName}  temp={frcst.main.temp} des={frcst.weather[0].description} Max={frcst.main.temp_max} Min={frcst.main.temp_min} img={`https://openweathermap.org/img/wn/${frcst.weather[0].icon}@2x.png`}/>
    )
    })}
   </div>
  </>
  )
}

export default App


import './App.css'

import humudidity from './assets/hum.png'
import rainIcon from './assets/rain.png'
import snowIcon from './assets/snow.png'
import clearIcon from './assets/sun.png'
import search from './assets/search.svg'
import air from './assets/images.png'
import { useEffect, useState } from 'react'
import data from './data.json';
import load from './load.json'
import Lottie from 'react-lottie'

const Weather=({icon , temp,location,country,lat,log,humidity,wind})=>{
 
  return (
    <>
 <div className="weather">
    <img src={icon} a />
   </div>

    <div className='weather-container'>
    <div className='details'>
    <div className="temp">{temp}°C</div>
    <div className="location">{location}</div>
    <div className="country">{country}</div>
    
    </div>
    </div>
    <div className="cord">
    <div>
      <span className='lat'>Lattitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>Longitude</span>
      <span>{log}</span>
    </div>
    </div>
<div className='base'>
     <div className='container'>
  <div className='humudity'>
    <img src={humudidity}  />
      <p>{humidity}%</p>
      <h3>Humidity</h3>
  </div>
      
  <div className='wind'>
       <img src={air} />
       <p>{wind} KM/HR</p>
       <h3>Wind speed</h3>
  </div>
     </div>
     </div> 

    </>
  )

}


  
function App() {


  const API_key='51f5aceafdd4c094cd04dec1fbd409c8'
  const [text,SetText]=useState('Madurai')
  const [icon,SetIcon]=useState(clearIcon);
  const [temp,SetTemp]=useState(0);
  const [location,SetLocation]=useState('');
  const [country,SetCountry]=useState('');
  const [lat,SetLat]=useState(0);
  const [log,SetLog]=useState(0);
  const [humidity,SetHumidity]=useState(0);
  const [wind,SetWind]=useState(0); 
  const [citynotfound,SetCityNotFound]=useState(false);
  const [loading,SetLoading]=useState(false);  

  const defaultOption = {
    loop: true,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };


  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "13n":snowIcon,
    
  };
   

  const Search= async ()=>{
    SetLoading(true);
    SetCityNotFound(false);
    let API_URL=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API_key}&units=Metric`;
  

  try{
    let response= await fetch(API_URL);
    let data = await response.json();
    // console.log(data)
    if (data.cod ==='404'){
      console.error('city not found');
      SetCityNotFound(true);
      SetLoading(false);
      return;
    };



    SetHumidity(data.main.humidity);
    SetWind(data.wind.speed);
    SetTemp(Math.floor(data.main.temp));
    SetLocation(data.name);
    SetCountry(data.sys.country);
    SetLat(data.coord.lat);
    SetLog(data.coord.lon);
    const weathericoncode=data.weather[0].icon;
    SetIcon(weatherIconMap[weathericoncode] || clearIcon);
    SetCityNotFound(false);

 

  }catch(error){
    console.error('an error occur:',error.message)

  }finally{
    SetLoading(false);
  }
}
  

  const HandleCity=(e)=>{
    SetText(e.target.value)
  }
  const HandleKeyDown=(e)=>{
    if (e.key === 'Enter'){
      Search();
    };
   

  }
  useEffect(function(){
    Search();
  },[]);

  return (
    <>
    <div>
    <div className='heading'>
   <div className='Header'>
   <h1>Weather App</h1>

   </div>
   <div className="for">
    <h2>Forcasting</h2>
   </div>
   </div>
   
   <div className="input">
    <input type="text" 
    className='city-search'
     onChange={HandleCity}
     onKeyDown={HandleKeyDown}
     value={text}/>
    <div className='search-icon'>
    <img src={search}
    onClick={()=>{Search();}} />
    </div>
   </div>
   {loading && <div className="loading-message">LOADING.....</div>}

   

  {citynotfound && <div className="citynot">City Not Found</div>}
  {citynotfound && (
  <Lottie
    options={defaultOption}
    height={300}
    width={300}
  />
)}

</div>
  
{ !loading && !citynotfound && <Weather  icon={icon}  temp={temp} location={location} 
country={country}  lat={lat} log={log} humidity={humidity} wind={wind}/>} 
   

    </>
  )
}

export default App

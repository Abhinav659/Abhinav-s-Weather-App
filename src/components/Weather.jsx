import React, { useState } from 'react'
import '../App.css';
import axios from 'axios'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Weather = () => {
    const [city, setCity] = useState("Delhi");
    const [temp, setTemp] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    const [description, setDescription] = useState("");
    var [icon, setIcon] = useState("../Assets/icons/clear_sky.png");
    const [showMyComponent, setshowMyComponent] = useState(false);
    
    let time = new Date().toLocaleTimeString();
    const [cTime, setCTime] = useState(time);
    const updateTime = () => {
        time = new Date().toLocaleTimeString();
        setCTime(time);        
    }
    setInterval(updateTime, 1000);

    var displayIcon = (icon) => {
                        // console.log("Here");
                        if(icon=="01d" || icon=="01n" ){
                            setIcon(require("../Assets/icons/clear_sky.png"));
                        } else if(icon=="02d" || icon=="02n" ){
                            console.log("here");
                            setIcon(require("../Assets/icons/few_clouds.png"));
                        } else if(icon=="03d" || icon=="03n" ){
                            setIcon(require("../Assets/icons/scattered_clouds.png"));
                        } else if(icon=="04d" || icon=="04n" ){
                            setIcon(require("../Assets/icons/broken_clouds.png"));
                        } else if(icon=="09d" || icon=="09n" ){
                            setIcon(require("../Assets/icons/shower_rain.png"));
                        } else if(icon=="10d" || icon=="10n" ){
                            setIcon(require("../Assets/icons/rain.png"));
                        } else if(icon=="11d" || icon=="11n" ){
                            setIcon(require("../Assets/icons/thunderstorm.png"));
                        } else if(icon=="13d" || icon=="13n" ){
                            setIcon(require("../Assets/icons/snow.png"));
                        } else if(icon=="50d" || icon=="50n" ){
                            setIcon(require("../Assets/icons/mist.png"));
                        }
            }

    const getWeatherData = async(city) => {
        await axios({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=637414295980f7a5cc627ce446466732`
        }).then((res) => {
            console.log(res.data);
            setTemp(res.data.main.temp - 273.15);
            displayIcon(res.data.weather[0].icon);
            console.log(res.data.weather[0].icon);
            setMin(res.data.main.temp_min - 273.15);
            setMax(res.data.main.temp_max - 273.15);
            setDescription(res.data.weather[0].description);
            setshowMyComponent(true);




        }).catch((err) => {
            console.log(err);
        });
    }
    
    return (
        <div className="container">
            <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}} placeholder='city...' className='m-3 p-2'/>
            <button onClick={(e)=>{getWeatherData(city)}} className="btn btn-primary" style={{backgroundColor:"#67afab", fontWeight:"bold", fontSize: 20, border: 0}}>Get Weather</button>

            {showMyComponent ? (
                <div className="data_container">
                <h3 className="city p-2 m-3">{ city }</h3>
                <div className="">
                    <img src={icon} alt="weather-icon" style={{width:150, padding: 0, margin:0}}/>
                </div>
                {/* <img src={require('../Assets/icons/mist.png')} alt="Hello" /> */}
                <div className="myGrid">
                {temp?(<h3>{ Math.floor(temp) }°C</h3>): null}
                <h5 className=''>Min:<span>{ Math.floor(min) }°C</span> <span className='mx-3'>|</span> 
                Max:<span>{ Math.floor(max) }°C</span></h5>
                <h5>{description}</h5>
                <h5 className=''>Date: {new Date().toLocaleDateString()}</h5>
                <h5 className='mb-3'>Time: {cTime}</h5>
                </div>

            </div>
            ) : null}

            
        </div>
    )
}

export default Weather
const weatherCity = document.getElementById("weather-city");
const weatherForcast = document.getElementById("weather-forcast");
const weatherIcon = document.getElementById("weather-icon");
const weatherTem = document.getElementById("weather-tem");

const weatherMinTem = document.getElementById("weather-min");
const weatherMaxTem = document.getElementById("weather-max");

const weatherFeelsLike = document.getElementById("feels-like");
const weatherHumidity = document.getElementById("humidity");
const weatherWind = document.getElementById("wind");
const weatherPressure = document.getElementById("pressure");

const apiKey = "d8f10f0caa3d5906d54efdc9cdab25d4"
let city = "shibchar" ;

const getCountry = (code)=>{
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}

document.getElementById("input-form"),addEventListener("submit",(e)=>{
    e.preventDefault();
    const inputField = document.getElementById("input-field");
    city = inputField.value ;
    fetchApi();
    inputField.value = "";
})


const fetchApi = async ()=>{
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{
       const response = await fetch(apiUrl);
       const data = await response.json();
    
       const {name , sys , main, weather , wind ,} = data ;

       weatherCity.innerText = `${name}, ${getCountry(sys.country)}`;

       const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

       weatherIcon.src= iconUrl ;

       weatherForcast.innerText = weather[0].main;

       weatherTem.innerText = `${main.temp}°C`;

       weatherMinTem.innerText = `Min: ${main.temp_min.toFixed()}°C`;
       weatherMaxTem.innerText = `Max: ${main.temp_max.toFixed()}°C`;

       weatherFeelsLike.innerText = `${main.feels_like}°C` ;
       weatherHumidity.innerText = `${main.humidity} %` ;
       weatherWind.innerText = `${wind.speed} m/s` ;
       weatherPressure.innerText = `${main.pressure} hpa` ;


    }catch(error){
       console.log(`faild to fetch`);
    }
}



window.addEventListener("load", fetchApi());
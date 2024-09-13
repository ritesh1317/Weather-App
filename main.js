//state
let currCity = 'Tokyo';
let units = 'metric'

//selectors
let city = document.querySelector('.weather_city');
let datetime = document.querySelector('.weather_datetime');
let weatherForecast = document.querySelector('.weather_forecast');
let weatherTemp = document.querySelector('.weather_temperature');
let weatherIcon = document.querySelector('.weather_icon');
let weatherMinmax = document.querySelector('.weather_minmax');
let weatherRealFeel = document.querySelector('.weather_realfeel');
let weatherHumidity = document.querySelector('.weather_humidity');
let weatherWind = document.querySelector('.weather_wind');
let weatherPressure = document.querySelector('.weather_pressure');


//search
document.querySelector('.weather_search').addEventListener('submit', e => {
    let search = document.querySelector('.weather_searchform')
    //prevent default action
    e.preventDefault();
    //change default city
    currCity = search.value;
    getWeather();
    search.value=""
})

//units
document.querySelector('.weather_unit_celsius').addEventListener('click',() => {
    if(units !== 'metric'){
        //change to metric
        units = 'metric'
        //get weather forecast
        getWeather();
    }
})

document.querySelector('.weather_unit_farenheit').addEventListener('click',() => {
    if(units !== 'imperial'){
        //change to imperial 
        units = 'imperial'
        //get weather forecast
        getWeather();
    }
})

//convert time stamp
function convertTimeStamp(timestamp, timezone){
    const convertTimezone = timezone/3600;

    const date = new Date(timestamp*1000);

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timezone:  `Etc/GMT${convertTimezone >= 0 ? '-' : '+'}${Math.abs(convertTimezone)}`,
        hour12: true
    }

    return date.toLocaleDateString('en-US', options)
}
//country code to name
function convertCountrycode(country)
{
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    return regionNames.of(country)
}


function getWeather() {
    const API_KEY = 
    'b5a04b247953a6a97daa3792d6316af8'

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`).then
    (res => res.json()).then
    (data => {
        city.innerHTML = `${data.name}, ${convertCountrycode(data.sys.country)}`
        datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
        weatherForecast.innerHTML = `<p>${data.weather[0].main}`
        weatherTemp.innerHTML = `${data.main.temp.toFixed()}&#176`
        weatherIcon.innerHTML = ` <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`
        weatherMinmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
        weatherRealFeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
        weatherWind.innerHTML = `${data.wind.speed} ${units === 'imperial' ? 'mph' : 'm/s'} `
        weatherHumidity.innerHTML = `${data.main.humidity}%`
        weatherPressure.innerHTML = `${data.main.pressure} hPa`
    })
}

document.addEventListener('DOMContentLoaded', function() {
    getWeather();
});

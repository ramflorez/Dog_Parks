// Mobile Menu Function
const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");

burgerIcon.addEventListener("click", () => {
    navbarMenu.classList.toggle("is-active");
});

// GeoLocation API -- Permission Panel Asking User for Actual Position/Location
const successCallback = (position) => {
    console.log(position);
};
// If Permission is Denied, Unavailable or Timeout
const errorCallback = (error) => {
    console.error(error);
};
// Allows Updates as Users Position Changes
const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);

//Listening Click results

const handleSearchClick=() => {
    const city=document.querySelector("#autocomplete").value.trim();
    if(!city) return;
    getWeatherAndLocation(city);

};
const getWeatherAndLocation =(city) =>{
    const apiKey="f1c6d934c46c2d1b26eb5e6679298844";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(res=>res.json())
    .then(gotWeatherAndLoction);
};
const gotWeatherAndLoction=(data)=>{
    const lat=data.coord.lat;
    const lon=data.coord.lon;
    const weather=data.weather[0].descritption
    const city=data.name;
    document.querySelector('#results').innerHTML=`
        <h2>${city}</h2>
        <h3>weather: ${weather}</h3>
        <h3>Nearby Dog Parks:</h3>
    `;
    getDogParks(lat,lon);
};
const getDogParks=(lat,lon)=>{
    const apiKey="AIzaSyCMmdje65wLBytkWa2A13D58MkT9PiyhdQ";
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&location=${lat},${lon}&radius=1000&keyword=dog+parks`)
    .then(res=>res.json())
    .then(gotDogParks);
};
const gotDogParks=(data)=>{
    console.log(data);
    let HTML="<ol>";
    for(let park of data.results){
        HTML+=`
            <li>${park.name} <small>rating: ${park.rating} of ${park.user_ratings_total} ratings</small></li>   
        `;
    }
    HTML+="</ol>";
    document.querySelector('#results').innerHTML+=HTML;
};
document.querySelector("#search-button").addEventListener("click",handleSearchClick);
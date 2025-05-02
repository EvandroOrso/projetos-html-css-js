// Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const emojiParagraph = document.getElementById("emojiParagraph");
const temperatureParagraph = document.getElementById("temperatureParagraph");
const cityParagraph = document.getElementById("cityParagraph");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const smallParagraph = document.querySelectorAll(".smallParagraph");

// Adding event listeners
window.addEventListener("load", async () => {
    const city = await getCity();
    city ? displayWeather(city) : displayWeather("brasilia");
})

searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim().toLowerCase();
    if(city === "") return;
    
    displayWeather(city);
});

// Functions
function getCoordinates() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, () => {
            reject(
                new Error("You didn't autorize the position collection.")
            );
        });
    });
};

async function getCity() {
    const apiKey = "0d4ccd6d0c8b41d789569e6f8c2f546b";
    
    try {
        const { latitude, longitude } = await getCoordinates();
        
        const request = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
        
        if(request.ok) {
            const data = await request.json();
            const components = data.results[0].components;
            const city = components.city;
            return city; 
        } else {
            throw new Error("Error in fetching api data");
        }
    } catch (error) {
        console.error(`Could not get coordinates: ${error}`);
    }
};

async function getDataFromWeatherAPI(city) {
    const apiKey = "ed10a0583d44e47433f768d5460656ac";
    try {
        const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        if(request.ok) {
            const data = await request.json();
            return data;
        } else {
            throw new Error("There was an error in fetching API.");
        }
    }
    catch (error) {
        console.error(`Sorry, there was an unexpected ${error}`);
    }
};

async function displayWeather(city) {
    const data = await getDataFromWeatherAPI(city);
    const temperature = (data.main.temp - 273.15).toFixed(0);
    
    emojiParagraph.textContent = getWeatherEmoji(data.weather[0].id);
    temperatureParagraph.textContent = `${temperature}°C`;
    cityParagraph.textContent = data.name;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${(data.wind.speed * 3.6).toFixed(2)} km/h`;
    
    smallParagraph.forEach(paragraph => {
        paragraph.classList.add("visible");
    });
};

function getWeatherEmoji(weatherId) {

    switch(true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";
    }
};
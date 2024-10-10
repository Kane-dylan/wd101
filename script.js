document.addEventListener("DOMContentLoaded",()=>{
  const cityInput=document.getElementById("city-input")
  const getWeatherBTN=document.getElementById("get-weather-btn")
  const weatherInfo=document.getElementById("weather-info")
  const cityNameDisplay=document.getElementById("city-name")
  const temperatureDisplay=document.getElementById("temperature")
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "ad754cfac320391d7e26d52ae82d3b6e";

  getWeatherBTN.addEventListener("click",async()=>{
    const city=cityInput.value.trim()
    if(!city)return
    
    //it may through some error 
    //server/db is always in another continent

    try {
      const weatherData=await fetchWeatherData(city)
      displayWeatherData(weatherData)
    } catch (error) {
      showError()
    }
    

  })

  async function fetchWeatherData(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url)
    console.log(response);

    if(!response.ok){
      throw new Error(data.message || "Something went wrong")
    }

    const data=await response.json()
    return data
  }

  function displayWeatherData(data){
  
    console.log(data);
    const {name, main, weather}= data
    cityNameDisplay.textContent=name
    temperatureDisplay.textContent=`Temperature: ${main.temp}°C`
    descriptionDisplay.textContent=`Description: ${weather[0].description}`

    //unhide the weather inf
    weatherInfo.classList.remove("hidden")
    errorMessage.classList.add("hidden")
  }

  function showError(){
    weatherInfo.classList.remove("hidden")
    errorMessage.classList.add("hidden")
  }
})
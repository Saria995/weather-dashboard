//Global Variables

var cityForm= document.querySelector('#city-form');
var searchBtn= document.querySelector('#searchBtn');
var cityName = document.querySelector("#cityName")
var date= document.querySelector('#current-date');
var city= document.querySelector('.city');
var weathericon= document.querySelector('.weather-icon')
var temperature = document.querySelector('.temperature');
var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');
var forecastContainerEl= document.querySelector("#fiveday-container");
var forecastTitle = document.querySelector("#forecast")
var geoLon = 0;
var geoLat = 0;
var cityCode= cityName;
var pastSearchEl = document.querySelector("#searchHistory");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
var searchArray = [];



//Five day forecast- calling API and fetching data
async function getFiveDayForecast(location) {
    const apikey2 = '67569cfb459f2b4e8c98d6bfb682cbff'
    const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apikey2}&units=metric`
    try {
      const res = await fetch(url2)
      const data = await res.json()
      //console.log(data);
      const forecast = data.list.filter((reading) => reading.dt_txt.includes("12:00:00")).slice(0, 5)
      //console.log(forecast);
      return forecast;
    } catch (error) {
      console.error(error)
    }
  }


//Function to render weather and dispaly in results container
function renderWeather(Currentweather) {
  console.log(Currentweather);
  var resultsContainer = document.querySelector("#result-container")
  city.textContent = Currentweather.name;
  date.textContent = dayjs().format('(DD/MM/YYYY)');
  wind.textContent = "Wind Speed: " + Currentweather.wind.speed + "mph";
  humidity.textContent = "Humidity: " + Currentweather.main.humidity + "%";
  temperature.textContent = "Temp: " + Currentweather.main.temp + "°C";
  var weatherIcon = document.createElement("img")
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${Currentweather.weather[0].icon}@2x.png`);
  $(weatherIcon).addClass("weatherImg");
  //console.log(Currentweather.weather[0].icon);
  resultsContainer.appendChild(weatherIcon);

  
 
}

//Function to fetch weather details by city using OpenWeather API
async function fetchWeather (event) {
  event.preventDefault()
  var query = cityName.value
  console.log(query)
  searchArray.push(query)
  localStorage.setItem("city", JSON.stringify(searchArray))
  var cityE1= localStorage.getItem("city")
  var cityE2= JSON.parse(cityE1)
  pastSearchEl.textContent = ""

  cityE2.forEach(city => pastSearchEl.innerHTML += 
    `<div><button>${city}</button></div>`

    );


  var forecastRes= await getFiveDayForecast(query)
  //console.log(getFiveDayForecast(query))
  var apiURL= 'https://api.openweathermap.org/data/2.5/weather?q=' + 
  query + 
  '&units=metric&appid=67569cfb459f2b4e8c98d6bfb682cbff';
  console.log("inside fetch")
  fetch(apiURL)
  .then((response) => response.json()) 
  .then((data) => {
    renderWeather(data)
    console.log(forecastRes);

    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5-Day Forecast";

    var fiveDay = document.querySelector("#five-day");
    for (var i=0; i < forecastRes.length; i++) {
      console.log(forecastRes[i]);

      var dailyForecast = forecastRes[i];

      var forecastEl =document.createElement("div");
      forecastEl.classList = "card text-white bg-secondary mb-3 text-dark m-2";

      var forecastDate = document.createElement("h5")
      forecastDate.textContent= dayjs.unix(dailyForecast.dt).format("MMM D, YYYY");
      forecastDate.classList = "card-header text-center"
      forecastEl.appendChild(forecastDate);


      //forecast image
      var weatherIcon = document.createElement("img")
      weatherIcon.classList = "card-body text-center";
      weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  
      forecastEl.appendChild(weatherIcon);

      var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = "Temp: "+ dailyForecast.main.temp + " °C";
       forecastEl.appendChild(forecastTempEl);

       var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = "Humidity: "+ dailyForecast.main.humidity + "  %";
       forecastEl.appendChild(forecastHumEl);

       forecastContainerEl.appendChild(forecastEl);

    }
  });


  
  }

  searchBtn.addEventListener('click', fetchWeather);


  pastSearchEl.onclick = function(e){
    var city =e.target.innerText
    console.log(city);
    fetchWeather2(city)

  }

  function fetchWeather2(city) {
    var apiURL= 'https://api.openweathermap.org/data/2.5/weather?q=' + 
    query + 
    '&units=metric&appid=67569cfb459f2b4e8c98d6bfb682cbff';
    console.log("inside fetch")
    fetch(apiURL)
    .then((response) => response.json()) 
    .then((data) => {
      renderWeather(data)
      console.log(forecastRes);
  
      forecastContainerEl.textContent = ""
      forecastTitle.textContent = "5-Day Forecast";
  
      var fiveDay = document.querySelector("#five-day");
      for (var i=0; i < forecastRes.length; i++) {
        console.log(forecastRes[i]);
  
        var dailyForecast = forecastRes[i];
  
        var forecastEl =document.createElement("div");
        forecastEl.classList = "card text-white bg-secondary mb-3 text-dark m-2";
  
        var forecastDate = document.createElement("h5")
        forecastDate.textContent= dayjs.unix(dailyForecast.dt).format("MMM D, YYYY");
        forecastDate.classList = "card-header text-center"
        forecastEl.appendChild(forecastDate);
  
  
        //forecast image
        var weatherIcon = document.createElement("img")
        weatherIcon.classList = "card-body text-center";
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  
        forecastEl.appendChild(weatherIcon);
  
        var forecastTempEl=document.createElement("span");
         forecastTempEl.classList = "card-body text-center";
         forecastTempEl.textContent = "Temp: "+ dailyForecast.main.temp + " °C";
         forecastEl.appendChild(forecastTempEl);
  
         var forecastHumEl=document.createElement("span");
         forecastHumEl.classList = "card-body text-center";
         forecastHumEl.textContent = "Humidity: "+ dailyForecast.main.humidity + "  %";
         forecastEl.appendChild(forecastHumEl);
  
         forecastContainerEl.appendChild(forecastEl);
  
      }
    });
  }

//Storing searched cities under search history (local storage)
//   function getInfo() {
//     var currentList = localStorage.getItem("result-container");
//     if (currentList !== null){
//         freshlist= JSON.parse(currentList);
//         return freshlist;
//     } else {
//         freshlist = [];
//     }
//     return freshlist;
// }

// function addInfo (city) {
//     var addedList = getInfo();

//     if (historyList.includes(cityName) === false) {
//         addedList.push(city);
//     }

//     localStorage.setItem("result-container", JSON.stringify(addedList));
// };

// function renderInfo () {
//     var historyList= getInfo();
//     for (var i = 0; i <historyList.length; i++) {
//         var inputCity= historyList[i];
//         var searchCity =$("<div>") 
//         searchCity.attr('id',inputCity) 
//         searchCity.text(inputCity) 
//         searchCity.addClass("h5")

//         $('#searchHistory').append(searchCity)
//     }
// };
// renderInfo();

/////////////////////////////////////////////////

// var pastSearch = function(pastSearch){
 
//   console.log(pastSearch)

//   pastSearchEl = document.createElement("button");
//   pastSearchEl.textContent = pastSearch;
//   pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
//   pastSearchEl.setAttribute("data-city",pastSearch)
//   pastSearchEl.setAttribute("type", "submit");

//   pastSearchButtonEl.prepend(pastSearchEl);
// }

// var pastSearchHandler = function(event){
//   var city = event.target.getAttribute("data-city")
//   if(city){
//       fetchWeather(event);
//       renderWeather(Currentweather);
//   }
// }

// pastSearchButtonEl.addEventListener("click", renderInfo);
// cityForm.addEventListener("submit", renderInfo);
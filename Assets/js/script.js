//Global Variables

// var searchCity = document.querySelector('#cityName');
 var cityForm= document.querySelector('#city-form');
var searchBtn= document.querySelector('#searchBtn');
var cityName = document.querySelector("#cityName")
// var date= document.querySelector('.current-date');
  var city= document.querySelector('.city');
// var weathericon= document.querySelector('.weather-icon');
   var temperature = document.querySelector('.temperature');
   var humidity = document.querySelector('.humidity');
   var wind = document.querySelector('.wind');
   var uv= document.querySelector('.uv');

//Function to render weather and dispaly in results container
function renderWeather(weather) {
  console.log(weather);
  var resultsContainer = document.querySelector("#result-container")
  city.textContent = weather.name;
  wind.textContent = "Wind Speed: " + weather.wind.speed + "mph";
  humidity.textContent = "Humidity: " + weather.main.humidity + "%";
  temperature.textContent = "Temp: " + weather.main.temp + "°";

}
//Function to fetch weather details by city using OpenWeather API
function fetchWeather (event) {
  event.preventDefault()
  var query = cityName.value
  var apiURL= 'https://api.openweathermap.org/data/2.5/weather?q=' + 
  query + 
  '&units=metric&appid=67569cfb459f2b4e8c98d6bfb682cbff';
  //console.log("inside fetch")
  fetch(apiURL)
  .then((response) => response.json()) 
  .then((data) => renderWeather(data));
  
  }

  searchBtn.addEventListener('click', fetchWeather);

//Storing searched cities under search history (local storage)
  function getInfo() {
    var currentList = localStorage.getItem("result-container");
    if (currentList !== null){
        freshlist= JSON.parse(currentList);
        return freshlist;
    } else {
        freshlist = [];
    }
    return freshlist;
}

function addInfo (n) {
    var addedList = getInfo();

    if (historyList.includes(inputCity) === false) {
        addedList.push(n);
    }

    localStorage.setItem("result-container", JSON.stringify(addedList));
};

function renderInfo () {
    var historyList= getInfo();
    for (var i = 0; i <historyList.length; i++) {
        var inputCity= historyList[i];
        var searchCity =$("<div>") 
        searchCity.attr('id',inputCity) 
        searchCity.text(inputCity) 
        searchCity.addClass("h5")

        $('#searchHistory').append(searchCity)
    }
};

renderInfo();

  













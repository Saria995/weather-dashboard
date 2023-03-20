//when i search for a city, i am presented with current and future conditions

//function that collects user input and displays in search history

function addResult() {
    inputCity = document.getElementById("cityName").value;
    historyList= getInfo();
    var searchCity = $("<div>")
    searchCity.attr('id', inputCity)
    searchCity.text(inputCity)
    searchCity.addClass("h4")

    if (historyList.includes(inputCity) === false) {
        $("#searchHistory").append(searchCity)
        }
       $(".subtitle").attr("style", "display:inline")
       addInfo(inputCity); 
};

//Add event listener to search history
$("#searchHistory").on('click', function(event){
    event.preventDefault();
    $("#searchHistory").attr("style", "display:inline")
    document.getElementById("cityName").value = event.target.id;
    getResult();
});

//add event lister to search button
document.getElementById("searchBtn").addEventListener("click", addResult);
//document.getElementById("seachBtn").addEventListener("click", getResult);

//When i search for a city, I am presented with the city name, the date, an icon for weather conditions, the temp, humidity, wind speed and UV index

function getResult(){

    $("#result-container").empty();
    $(".forecast-day").empty();

    inputCity = document.getElementById("cityName").value;
    var cityCode= inputCity;
    var geoLon;
    var geoLat;

    var city= document.querySelector("#city")
    var temp = document.querySelector("#temperature")
    var wind = document.querySelector("#wind")
    var humidity = document.querySelector("#humidity")
    //var uvIndex = docuemnt.querySelector("#uv")
    var iconE = document.querySelector("#weather-icon")
    var date= document.querySelector("#current-date")

    var geoURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityCode + '&limit=5&appid=67569cfb459f2b4e8c98d6bfb682cbff'

    console.log(geoURL);
    //use Fetch method to call for API to request/receive info

    fetch(geoURL)
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        geoLon = data[0].lon;
        geoLat = data[0].lat;

        var weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + geoLat + "&lon="+ geoLon + "&units=metric&appid=67569cfb459f2b4e8c98d6bfb682cbff";
        
        fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            iconE= data.current.weather[0].icon;
            imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
            icon.attr('src', imgSrc)
            temp.textContent = "Temperature: " + data.current.temp + "°C";
            humidity.textContent = "Humidity: " + data.current.humidity + "%";
            wind.textContent = "Wind Speed: " + data.wind_speed + "mph";
            uvIndex.textContent= "UV Index: ";

            if (data.current.uvi < 3){
                uvIndex.attr("style","background-color:green; color:black; margin-left: 5px")
            } else if (data.current.uvi < 6){
                uvIndex.attr("style","background-color:yellow; color:black; margin-left: 5px")
            } else if (data.current.uvi < 8){
                uvIndex.attr("style","background-color:orange; color:black; margin-left: 5px")
            } else if (data.current.uvi < 11) {
                uvIndex.attr("style","background-color:red; color:black; margin-left: 5px")
            } else {
                uvIndex.attr("style","background-color:purple; color:black; margin-left: 5px")
            }

            for (var i=1;i<6;i++){

                var blueContainer = $("<div>")
                this["futureDate"+i] = $("<h>")
                this["futureIcon"+i] = $("<img>")
                this["futureTemp"+i] = $("<div>")
                this["futureWind"+i] = $("<div>")
                this["futureHumidity"+i] = $("<div>")
                //translate utc to date
                this["forecastDay"+i] = new Date(data.daily[i].dt * 1000);     
     
                (this["futureDate"+i]).text(((this["forecastDay"+i]).getMonth()+1) + "/" + (this["forecastDay"+i]).getDate() + "/" + (this["forecastDay"+i]).getFullYear());
                (this["futureTemp"+i]).text("Temperature: "+ data.daily[i].temp.day + " F");
                (this["futureWind"+i]).text("Wind: "+ data.daily[i].wind_speed+ " MPH");
                (this["futureHumidity"+i]).text("Humidity: " + data.daily[i].humidity + " %");
                (this["weatherIcon"+i])= data.daily[i].weather[0].icon;
        
                DateimgSrc = "https://openweathermap.org/img/wn/" + (this["weatherIcon"+i]) + ".png";  
                (this["futureIcon"+i]).attr('src',DateimgSrc)

                $(".five-day").append(blueContainer)
                blueContainer.append((this["futureDate"+i]));
                blueContainer.append((this["futureIcon"+i]));
                blueContainer.append((this["futureTemp"+i]));
                blueContainer.append((this["futureWind"+i]));
                blueContainer.append((this["futureHumidity"+i]));

                blueContainer.addClass("weather-card")
            }
        
    })
})
};


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
        searchCity.addClass("h4")

        $('#searchHistory').append(searchCity)
    }
};

renderInfo();
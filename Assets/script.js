$(document).ready(function () {
    // VARIABLES
    // =======================================================================================

    // global api key
    var apiKey = "&appid=463e991c43d34445395b82d02c5b4287"
    // city search array
    var cityHist = JSON.parse(localStorage.getItem("cityHistory")) || [];
    // var declared moment.js date  format
    var date = moment().format('MM/DD/YYYY')


    // LISTENERS
    // =======================================================================================

    // search button listener 
    $("#searchBtn").on("click", function (event) {
        event.preventDefault()
        var citySearch = $("#city-search").val()
        // pevernt from local storing same city multiple times
        if (!cityHist.includes(citySearch)) {
            // pushes new search to the front/top
            cityHist.unshift(citySearch)
            //converts cityHist array to string and setItem in storage   
            localStorage.setItem("cityHistory", JSON.stringify(cityHist))
            displayPastCities();
        }

        // cityWeather function(line 40) call
        cityWeather(citySearch)
        // forecastWeather function(line 110 call)
        forecastWeather(citySearch)

    })

    // FUNCTIONS
    // =======================================================================================

    // cityWeather function
    function cityWeather(city) {
        // this is the built url we can  query
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
        // console.log(queryURL)

        // running ajax call to the openweather API
        $.ajax({
            url: queryURL,
            method: "GET"
            // storing all the retrieved data inside function called "weatherRes"
        }).then(function (weatherRes) {
            // retrieving temp and  converting it from Kelvin to fahrenheit 
            var temp = ((weatherRes.main.temp - 273.15) * 1.80 + 32).toFixed(0);
            // retrieveing lat and lon coodinates
            var lon = weatherRes.coord.lon;
            var lat = weatherRes.coord.lat;
            // using lat, lon coordinates to obtain IV index
            cityUV(lat, lon)
            // retrieving city name for display
            var cityName = weatherRes.name;

            // tranfering content to HTML
            $(".city-name").text(weatherRes.name + "(" + date + ")");
            $(".city-name").append(`<img src="http://openweathermap.org/img/wn/${weatherRes.weather[0].icon}@2x.png"/>`)
            $(".temp").text("Temperature: " + temp + "°F");
            $(".humidity").text("Humidity: " + weatherRes.main.humidity + "%");
            $(".wind-speed").text("Wind Speed: " + weatherRes.wind.speed + "MPH");

        });
    }

    // cityUV function with query url of  openweather uvi api
    function cityUV(lat, lon) {
        var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + apiKey;
        // console.log(queryURL)
        // running ajax call to the openweather API
        $.ajax({
            url: queryURL,
            method: "GET"
            // storing all the retrieved data inside function called "coordRes"
        }).then(function (coordRes) {
            // retrieveing uvindex value
            var uvIndex = coordRes.value
            // tranfering content to HTMLKS
            $(".uv-index").text("UV Index: " + uvIndex)
        })
    }

    // dispaly searched cities
    function displayPastCities() {
        // for loop to go though all cities searched for and create button
        var allCities = "";
        for (var i = 0; i < cityHist.length; i++) {
            allCities += `<div class = "row"><button class="city-button">${cityHist[i]}</button></div>`;
        }
        // add cities creacted to html
        $("#cities-searched-display").html(allCities);
        // display city weather contect when city button is clicked
        $(".city-button").on("click", function () {
            var cityList = this.textContent;
            // cityWeather function(line 40) call
            cityWeather(cityList)
            // forecastWeather function(line 110 call)
            forecastWeather(cityList)
        })
    }
    // displayPastCities function(line 89) call
    displayPastCities();

    // forcast weather function
    function forecastWeather(forecast) {
        // this is the built url we can  query
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + forecast + apiKey;
        // console.log(queryURL)

        // running ajax call to the openweather API
        $.ajax({
            url: queryURL,
            method: "GET"
            // storing all the retrieved data inside function called "forecastRes"
        }).then(function (forecastRes) {
            // empting weather forecast icons after appending them
            $("#icon1").empty()
            $("#icon2").empty()
            $("#icon3").empty()
            $("#icon4").empty()
            $("#icon5").empty()
            for (var i = 1; i < 6; i++) {
                var icon = forecastRes.list[i].weather[0].icon;
                // retrieving temp and  converting it from Kelvin to fahrenheit 
                var temp = ((forecastRes.list[i].main.temp - 273.15) * 1.80 + 32).toFixed(0);
                var humidity = forecastRes.list[i].main.humidity;
                var tomorrowDate = moment().add(i, "days").format("l")
                console.log(icon)
                // console.log(temp)
                // console.log(humidity)

                //tranfering content to HTML
                $(".forecast-title").text("5-Day Forecast: ")
                $("#" + "date" + i).text(tomorrowDate);
                $("#" + "icon" + i).append(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png"/>`);
                $("#" + "temp" + i).text("Temp: " + temp);
                $("#" + "humidity" + i).text("Humidity:" + humidity);
            }

        });
    }
});



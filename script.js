$(document).ready(function () {
    // VARIABLES
    // =======================================================================================

    // global api key
    var apiKey = "&appid=463e991c43d34445395b82d02c5b4287"

    
    // LISTENERS
    // =======================================================================================

    // search button listener 
    $("#searchBtn").on("click", function (event) {
        var citySearch = $("#city-search").val()
        // cityWeather function call
        cityWeather(citySearch)
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
            $(".city-name").html("<h2>" + weatherRes.name + "<h2>");
            $(".temp").text("Temperature: " + temp + "°F");
            $(".humidity").text("Humidity: " + weatherRes.main.humidity + "%");
            $(".wind-speed").text("Wind Speed: " + weatherRes.wind.speed + "MPH");


        })

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
            // tranfering content to HTML
            $(".uv-index").text("UV Index: " + uvIndex)
        })



    }







});



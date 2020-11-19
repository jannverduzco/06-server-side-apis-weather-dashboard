$(document).ready(function () {


    // VARIABLES
    // =======================================================================================


    // LISTENERS
    // =======================================================================================
    $("#searchBtn").on("click", function (event) {
        event.preventDefault()
        var citySearch = $("#city-search").val()
        // console.log(citySearch)
        cityWeather(citySearch)
    })

    // FUNCTIONS
    // =======================================================================================

    function cityWeather(city) {
        var apiKey = "&appid=463e991c43d34445395b82d02c5b4287"
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
        // console.log(queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (weatherRes) {

            var temp = ((weatherRes.main.temp - 273.15) * 1.80 + 32).toFixed(2);
            // console.log(temp)
            var humidity = weatherRes.main.humidity;
            // console.log(humidity)
            var windSpeed = weatherRes.wind.speed;
            // console.log(windSpeed)
            var lon = weatherRes.coord.lon;
            // console.log(location)
            var lat = weatherRes.coord.lat;
            // console.log(lat)
            cityUV(lat, lon)

             $(".temp").text(temp);
             $(".humidity").text(humidity);
             $(".wind-speed").text(windSpeed);
             

        })
        
    }

    function cityUV(lat, lon) {
        var apiKey = "&appid=463e991c43d34445395b82d02c5b4287"
        var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + apiKey;
        // console.log(queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (coordRes) {
            // console.log(coordRes)
            var uvIndex = coordRes.value;
            // console.log(uvIndex)
            $(".uv-index").text(uvIndex)
        })

        

    }



    



});



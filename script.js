$(document).ready(function() {


// VARIABLES
// =======================================================================================


// LISTENERS
// =======================================================================================
$("#searchBtn").on("click", function(event) {
    event.preventDefault();
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
      }).then(function(cityWeather) {
        console.log(queryURL)


    
      });
    
} 



});



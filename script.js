$(document).ready(function() {


// VARIABLES
// =======================================================================================


// LISTENERS
// =======================================================================================
$("#searchBtn").on("click", function(event) {
    event.preventDefault()
    var citySearch = $("#city-search").val()
    console.log(citySearch)
    cityWeather(citySearch)
})

// FUNCTIONS
// =======================================================================================

function cityWeather(city) {
    var queryURL ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=37849e55e443f85f3dcbbc367fbd40e9";
    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET" 
    }).then(function(weatherRes){
        console.log(weatherRes)
    })
    
} 



});



var weatherAPIKey = "c27e17b2075378ac79414f96f80ea46b"
// remember to take out charlotte and make an empty city array
var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=charlotte&appid=" + weatherAPIKey
// remember to take out charlottes lat and lon and make an empty array for lat and lon
// http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
// http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=c27e17b2075378ac79414f96f80ea46b&lat=35.23&lon=-80.84"

$.ajax({
    url: weatherQueryURL,
    method: "GET"
}).then(function (response) {
    console.log(weatherQueryURL)
    console.log(response)
    console.log(uvURL)

    var city = $(".city")
    city.text(response.name)

    var temp = $(".temp")
    var far = (response.main.temp - 273.15) *1.80 + 32
    temp.text("Temperature: " + far.toFixed(2) + "℉")

    var humidity = $(".humidity");
    humidity.text("Humidity: " + response.main.humidity + "%")

    var windspeed = $(".windspeed");
    windspeed.text("Windspeed: " + response.wind.speed + "mph")

    // ask about this
    var uvIndex = $(".uv");
    uvIndex.text("UV Index: " + response.main.value)



});
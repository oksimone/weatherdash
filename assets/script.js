// http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
// http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
// var cityName = [];
function searchCity(city){
    var weatherAPIKey = "c27e17b2075378ac79414f96f80ea46b";
    var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherAPIKey
    console.log(weatherQueryURL)
    var cityName = []
    $(".card-deck").empty();
    var li = $("<li>").addClass("oldCity").text(city);
    $("#oldcities").append(li)

    
    $.ajax({
        url: weatherQueryURL,
        method: "GET",
    }).then(function (response) {
        
        var results = response.data;
        console.log(weatherQueryURL)
        
        var far = (response.main.temp - 273.15) * 1.80 + 32
        $(".city").text(city.toUpperCase() + " " + (moment().format("M/D/YYYY")));
        $(".temp").text("Temperature " + far.toFixed(2))
        $(".humidity").text("Humidity: " + response.main.humidity)
        $(".windspeed").text("Windspeed: " + response.wind.speed)
        // var cityName = []
        var lat = response.coord.lat
        var lon = response.coord.lon
        var iconMain = "http://api.openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        $("#iconMain").attr("src", iconMain);
        
        function uvI() {
            var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=c27e17b2075378ac79414f96f80ea46b&lat=" + lat + "&lon=" + lon;
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response2) {
                console.log(uvURL)
                var uv = response2.value;
                $(".uv").text("UV Index " + uv);
                $(".uv").css("color", "red")
                
            })
        }
        uvI()
    }
    );
    
    $.get("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + weatherAPIKey)
    .then(function (res) {
        var k = 1;
        for (var i = 0; i < res.list.length; i++) {
            var curr = res.list[i]
            if (curr.dt_txt.includes("12:00")) {
                var cardDiv = $("<div>").attr("class", "card card bg-primary text-white");
                $(".card-deck").append(cardDiv);
                var date = $("<h6>").text((moment().add(k, "days").format("MM/DD/YYYY")));
                cardDiv.append(date);
                k++;
                var far2 = (curr.main.temp - 273.15) * 1.80 + 32
                var p1 = $("<p>").text("Temperature " + far2.toFixed(2))
                cardDiv.append(p1)
                var p2 = $("<p>").text("Humidity " + curr.main.humidity)
                cardDiv.append(p2);
                var img2 = $("<img>").attr("src", "http://api.openweathermap.org/img/w/" + curr.weather[0].icon + ".png");
                img2.css('width', '50px')
                img2.css('height', '50px')
                
                
                cardDiv.append(img2)
                
                console.log(curr)
                //   curr.push(cards)
                
                
            }
        }
        
    })
}

$("#find-city").on("click", function (event) {
    event.preventDefault();
    var x = $("#city-search").val();
    searchCity(x);
   
    
    
});
$("#oldcities").on("click", "li", function (){
    searchCity($(this).text());
    console.log($(this).text());
})





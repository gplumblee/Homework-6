let d = new Date()
let date = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
console.log(date);

$("button").on("click", function () {
    let city = $("#search-value").val();
    $(".history").append(`<button class="list-group-item-action">${city}</button>`);

    const APIKey = "166a433c57516f51dfab1f7edaed8413";
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    // let lat = 37.75;
    // let lon = -122.37;

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            console.log(response);
            appendWeather(response)
        })

    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

    $.ajax({
            url: forecastURL,
            method: "GET"
        })
        .then(function (response) {
            console.log(response);
            appendForecast(response)
        })

    $("#search-value").val("");
})

function appendWeather(data) {
    $("#today").html(`<div id="main" class="row" style="float:left; width:100%">
        <h1 style="float:left">${data.name} (${date})</h1><img style="float:left" src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>
        <div style="width:100%">Temperature: ${Math.round((data.main.temp - 273.15) * 1.8 + 32)}° F</div>
        <div style="width:100%">Humidity: ${data.main.humidity}</div>
        <div style="width:100%">Wind Speed: ${data.wind.speed}</div>
        <div id="UV"></div>
    </div>
        <div class="row" style="padding-top: 30px; padding-bottom: 0px"><h2>5-Day Forecast:</h2></div>`);
    lat = data.coord.lat;
    lon = data.coord.lon;
    appendUVIndex(lat, lon)
}

function appendForecast(data) {
    $("#forecast").html("");
    for (let i = 0; i < 40; i += 8) {
        $("#forecast").append(`<div class="col-2">
      <p style="font-size: 18px; margin-bottom: 0px">${new Date(data.list[i].dt_txt).toLocaleDateString()}</>
      <img class="owf owf-803" src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png"/>
      <p style="font-size: 14px; margin-bottom: 0px">Temp: ${Math.round((data.list[i].main.temp - 273.15) * 1.8 + 32)}° F</p>
      <p style="font-size: 14px; margin-bottom: 0px">Humidity: ${data.list[i].main.humidity}</p>
    </div>`);
    }
}

function appendUVIndex(lat, lon) {
    let APIKey = "166a433c57516f51dfab1f7edaed8413";
    let UVIndexURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

    $.ajax({
            url: UVIndexURL,
            method: "GET"
        })
        .then(function (response) {
            console.log(response);
            // appendUVIndex(response)
            $("#UV").text(`UV Index: ${response.value}`);
            if (response.value >= 1 && response.value < 3) {
                $("#UV").css("background-color", "green");
            } else if (response.value >= 3 && response.value < 5) {
                $("#UV").css("background-color", "yellow");
                $("#UV").css("color", "black");
            } else if (response.value >= 6 && response.value < 7) {
                $("#UV").css("background-color", "orange");
            } else if (response.value >= 8 && response.value < 10) {
                $("#UV").css("background-color", "red");
            } else if (response.value >= 11) {
                $("#UV").css("background-color", "violet");
            }
        })
}

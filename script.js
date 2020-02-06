let getDate = new Date()
let date = getDate.getMonth() + "/" + getDate.getDay() + "/" + getDate.getFullYear();
console.log(date);

$("button").on("click", function() {
  let city = $("#search-value").val();
  $(".history").append(`<li class="list-group-item">${city}</li>`);
  

  let APIKey = "166a433c57516f51dfab1f7edaed8413";
  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    console.log(response);
    appendWeather(response)
  })
})

function appendWeather(data){
$("#today").html(`<h1 style="float:left">${data.name} (${date})</h1><img style="float:left" 
src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>`);
$("#today").append(`<div  class="row" style="float:left; width:100%">
<div style="width:100%">Temperature: ${Math.round((data.main.temp - 273.15)*1.8 +32)}° F</div>
<div style="width:100%">Humidity: ${data.main.humidity}</div>
<div style="width:100%">Wind Speed: ${data.wind.speed}</div>
<div id="UV" style="width:100%">UV Index: </div>
<br>
<h2>5-Day Forecast:</h2>
</div>`);

for(let i = 0; i<5;i++){
  $("#forecast").append(`<div class="col-2">
    <p>${date}</>
    <img class="owf owf-803" src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>
    <p>Temp: ${Math.round((data.main.temp - 273.15)*1.8 +32)}° F</p>
    <p>Humidity: ${data.main.humidity}</p>
  </div>`);
}
}

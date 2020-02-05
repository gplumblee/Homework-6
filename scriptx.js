// This is our API key
    let APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we get the input from the user
    let request = $("#search-value").val();

    // Here we are building the URL we need to query the database
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?" + request + "&apikey" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        let createRow = function(data) {
          // Create a new table row element
          let tRow = $("<tr>");
        
          // Methods run on jQuery selectors return the selector they we run on
          // This is why we can create and save a reference to a td in the same statement we update its text
          let date = $("<td>").text(response.date);
          let temp = $("<td>").text(response.main.temp);
          let humidity = $("<td>").text(response.main.humidity);
          let wind = $("<td").text(response.wind.speed);
            
          // Append the newly created table data to the table row
          tRow.append(request, date, temp, humidity, wind);
          // Append the table row to the table body
          $("tbody").append(tRow);
        };

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        $("#today").text("<h1>" + response.request + " (" + response.date + ")</h1>");
        $("#today").text("Wind Speed: " + response.wind.speed);
        $("#today").text("Humidity: " + response.main.humidity);
        $("#today").text("Temperature (F) " + response.main.temp);

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
      });

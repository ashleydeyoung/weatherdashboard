var searchInput = $("#searchtext");
var submitBtn = $("#submit-btn");
var searchList = $("#search-list");

//searchArray for search history
var searchArray = [];

init();

function displayWeatherInfo() {
  var lat = 0
  var lon = 0

  var search = searchArray[searchArray.length -1]

  
  var queryURL =  "https://api.openweathermap.org/data/2.5/weather?q=" + search  + "&units=imperial&appid=a433785d6c40d7591842a50a08b4a776"


  // Creates AJAX call for current weather
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
   
    // Creates a div to hold the current weather
    var newDiv = $("<div>")
    newDiv.addClass("search-div")
    newDiv.prependTo("#result-page")

    $("<h1>").addClass("current-city").text(response.name).appendTo(newDiv)
    $("<h2>").text("Current Temp: " + Math.round(response.main.temp) + " \xB0 F").appendTo(newDiv)
    $("<p>").text("Humidity: " + response.main.humidity + "%").appendTo(newDiv)
    $("<p>").text("Wind: " + response.wind.speed + " MPH").appendTo(newDiv)
    $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png").appendTo(".current-city")

   lat = response.coord.lat;
   lon = response.coord.lon;

   var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=a433785d6c40d7591842a50a08b4a776&lat=" + lat + "&lon=" +lon
   //creates AJAX call for UV index
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
     var date = response.date_iso
     var res = date.slice(0,10)
    $("<h3>").text("Today's Date: " + res).prependTo(newDiv)
    $("<p>").addClass("uv-index").text("UV Index: ").appendTo(newDiv)
    $("<button>").addClass("uv-button").appendTo((".uv-index"))
    //color change based on uv index value
    if (JSON.parse(response.value) > 7) {
      $(".uv-button").css("background-color", "red").text(response.value) 
    }; 
    if (JSON.parse(response.value) < 4) {
      $(".uv-button").css("background-color", "green").text(response.value) 

    }; 
    if (JSON.parse(response.value) >=4 && JSON.parse(response.value <=7)) {
      $(".uv-button").css("background-color", "yellow").text(response.value) 
   
    }
   }
   )
  
  });

  
  //AJAX for 5 day forecast
  var search = searchArray[searchArray.length -1]
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&units=imperial&appid=a433785d6c40d7591842a50a08b4a776"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
   
    //index for each day at 12:00, put into array
    randomArray= [3, 11, 19, 27, 35];

    for (var i = 0; i < randomArray.length; i++) {
      //dynamically displaying 5day forecast
      $("<div>").addClass("col fiveday").attr('id', 'day' + i).html("<h6>" + (response.list[randomArray[i]].dt_txt).slice(0,10) + "</h4>").appendTo("#forecast");
      $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[randomArray[i]].weather[0].icon + "@2x.png").appendTo("#day" + i )
      $("<p>").text("Temp: " + Math.round(response.list[randomArray[i]].main.temp) + "\xB0  F").appendTo("#day" + i )
      $("<p>").text("Humidity: " + response.list[randomArray[i]].main.humidity + "%").appendTo("#day" + i )
      
    }
  });

}
// function creating search history
function renderSearch() {
  // Clear List element 
  searchList.empty();


  for (var i = 0; i < searchArray.length; i++) {

    // It then creates a new div .
    var newSearchDiv = $("<div>")
    newSearchDiv.addClass("search").attr("data-name", searchArray[i]);
    newSearchDiv.html(searchArray[i])
    //adds this new div to the search div.
    searchList.prepend(newSearchDiv);
  }
  
}


function init() {
  // Get stored search from localStorage
  // Parsing the JSON string to an object
  var storedSearch = JSON.parse(localStorage.getItem("search"));
  
  // If search were retrieved from localStorage, update the search array to it
  if (storedSearch !== null) {
    searchArray = storedSearch;
  }
  
  // Render search to the DOM
  renderSearch();
  displayWeatherInfo()
}


function storeSearch() {
  // Stringify and set "search" key in localStorage to search array
  localStorage.setItem("search", JSON.stringify(searchArray));
}

// When form is submitted...
$("#search-form").on("submit", function (event) {
  event.preventDefault();
  $(".search-div").empty();
  $("#forecast").empty();

  var searchText = searchInput.val().trim();
  
  // Return from function early if submitted Text is blank
  if (searchText === "") {
    return;
  }

  // Add new Text to search array, clear the input
  searchArray.push(searchText);
  searchInput.empty()
  

  // Store updated search in localStorage, re-render the list
  storeSearch();
  renderSearch();
  displayWeatherInfo();
});

$(document).on("click", ".search", function searchClick() {
  $(".search-div").empty();
  $("#forecast").empty();
  searchArray.push($(this).attr("data-name"))
  localStorage.setItem("search", JSON.stringify(searchArray))
  renderSearch();
  displayWeatherInfo();
 
  
      
      
});

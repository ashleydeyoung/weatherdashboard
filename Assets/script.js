var searchInput = $("#searchtext");
var submitBtn = $("#submit-btn");
var searchList = $("#search-list");

var searchArray = [];

init();

function displayWeatherInfo() {
  var lat = 0
  var lon = 0

  var search = searchArray[searchArray.length -1]

  console.log(search)
  var queryURL =  "https://api.openweathermap.org/data/2.5/weather?q=" + search  + "&units=imperial&appid=a433785d6c40d7591842a50a08b4a776"


  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
   console.log(response)
    // Creates a div to hold the movie
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
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
    console.log(response)
    $("<p>").text("UV Index: " + response.value ).appendTo(newDiv)
   })
    
  });

  

  var search = searchArray[searchArray.length -1]
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&units=imperial&appid=a433785d6c40d7591842a50a08b4a776"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
   console.log(response)

  
    console.log(response.list[0].dt_txt);

    randomArray= [3, 11, 19, 27, 35];

    for (var i = 0; i < randomArray.length; i++) {
      console.log(i)
     
      $("<div>").addClass("col fiveday").attr('id', 'day' + i).html("<h6>" + (response.list[randomArray[i]].dt_txt) + "</h4>").appendTo("#forecast");
      $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[randomArray[i]].weather[0].icon + "@2x.png").appendTo("#day" + i )
      $("<p>").text("Temp: " + Math.round(response.list[randomArray[i]].main.temp) + "\xB0  F").appendTo("#day" + i )
      $("<p>").text("Humidity: " + response.list[randomArray[i]].main.humidity + "%").appendTo("#day" + i )
      
      
      
    }

  

  });

}

function renderSearch() {
  // Clear List element 
  searchList.empty();

  // Render a new li for each list
  // $.each(searchArray, function(i, search) {
  //   searchList.append("<div>" + search + "</div>");
  // });

  for (var i = 0; i < searchArray.length; i++) {

    // It then creates a new div .
    var newSearchDiv = $("<div>")
    newSearchDiv.addClass("search").attr("data-name", searchArray[i]);
    newSearchDiv.html(searchArray[i])
    // It then adds this new div to the search div.
    searchList.prepend(newSearchDiv);
  }
  
 
  // for (var i = 0; i < searchArray.length; i++) {
  //   var search = searchArray[i];

  //   var li = document.createElement("li");
  //   li.textContent = search;
  //   // li.setAttribute("data-index", i);
  //   searchList.appendChild(li);
  // }
}


function init() {
  // Get stored search from localStorage
  // Parsing the JSON string to an object
  var storedSearch = JSON.parse(localStorage.getItem("search"));
  
  // If search were retrieved from localStorage, update the search array to it
  if (storedSearch !== null) {
    searchArray = storedSearch;
  }
  // console.log(searchArray)
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
  // console.log(searchText);

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
 
  // var search = $(this).attr("data-name")

 
  // var queryURL =  "https://api.openweathermap.org/data/2.5/weather?q=" + search  + "&units=imperial&appid=a433785d6c40d7591842a50a08b4a776"


  // // Creates AJAX call for the specific movie button being clicked
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function(response) {
  //  console.log(response)
  //   // Creates a div to hold the movie
  //   var newDiv = $("<div>")
  //   newDiv.addClass("search-div")
  //   newDiv.prependTo("#result-page")

  //   $("<h1>").addClass("current-city").text(response.name).appendTo(newDiv)
  //   $("<h2>").text("Current Temp: " + Math.round(response.main.temp) + " \xB0 F").appendTo(newDiv)
 
  //   $("<p>").text("Humidity: " + response.main.humidity + "%").appendTo(newDiv)
  
  //   $("<p>").text("Wind: " + response.wind.speed + " MPH").appendTo(newDiv)
   
  //   $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png").appendTo(".current-city")
    
    
  // });

  // var search = searchInput.val().trim()
  // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&units=imperial&appid=a433785d6c40d7591842a50a08b4a776"
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function(response) {
  //  console.log(response)

  
  //   console.log(response.list[0].dt_txt);

  //   randomArray= [3, 11, 19, 27, 35];

  //   for (var i = 0; i < randomArray.length; i++) {
  //     console.log(i)
     
  //     $("<div>").addClass("col fiveday").attr('id', 'day' + i).html("<h6>" + (response.list[randomArray[i]].dt_txt) + "</h4>").appendTo("#forecast");
  //     $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[randomArray[i]].weather[0].icon + "@2x.png").appendTo("#day" + i )
  //     $("<p>").text("Temp: " + Math.round(response.list[randomArray[i]].main.temp) + "\xB0  F").appendTo("#day" + i )
  //     $("<p>").text("Humidity: " + response.list[randomArray[i]].main.humidity + "%").appendTo("#day" + i )
      
      
      
});
// // Create function for when city is clicked

// $(document).on("click", ".search", searchClick())

// function searchClick() {
//   $(".search-div").empty();
//   $("#forecast").empty();
//   searchInput = $(this).attr("data-name");

// })});
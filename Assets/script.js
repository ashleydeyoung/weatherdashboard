var searchInput = $("#searchtext");
var submitBtn = $("#submit-btn");
var searchList = $("#search-list");

var searchArray = [];

init();

function displayWeatherInfo() {

  var search = searchInput.val().trim()

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

    // Retrieves the Rating Data
    // Creates an element to have the rating displayed
    // Displays the rating
    $("<p>").text(response.name).appendTo(newDiv)
    // Retrieves the release year
    // Creates an element to hold the release year
    // Displays the release year
    $("<p>").text(response.main.humidity).appendTo(newDiv)
    // Retrieves the plot
    // Creates an element to hold the plot
    // Appends the plot
    $("<p>").text(response.main.feels_like).appendTo(newDiv)
    // Creates an element to hold the image
    // Appends the image
    // $("<img>").attr("src", response.Poster).appendTo(newDiv)
    
  });

}
// displayWeatherInfo();

function renderSearch() {
  // Clear todoList element and update todoCountSpan
  searchList.empty();

  // Render a new li for each list
  // $.each(searchArray, function(i, search) {
  //   searchList.append("<div>" + search + "</div>");
  // });

  for (var i = 0; i < searchArray.length; i++) {

    // It then creates a new div for each drink. Note we create divs and add the content in the same line.
    var newSearchDiv = $("<div>")
    newSearchDiv.addClass("search");
    newSearchDiv.html(searchArray[i])
    // It then adds this new div to the search div.
    searchList.append(newSearchDiv);
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
}

function storeSearch() {
  // Stringify and set "search" key in localStorage to search array
  localStorage.setItem("search", JSON.stringify(searchArray));
}

// When form is submitted...
$("#search-form").on("submit", function (event) {
  event.preventDefault();
  $(".search-div").empty();

  var searchText = searchInput.val().trim();
  // console.log(searchText);

  // Return from function early if submitted Text is blank
  if (searchText === "") {
    return;
  }

  // Add new Text to search array, clear the input
  searchArray.push(searchText);
  searchInput.value = "";
  

  // Store updated search in localStorage, re-render the list
  storeSearch();
  renderSearch();
  displayWeatherInfo();
});
// $(document).on("click", ".search", displayWeatherInfo);
// // Create function for when city is clicked
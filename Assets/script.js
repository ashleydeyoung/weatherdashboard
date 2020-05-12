var searchInput = $("#searchtext");
var submitBtn = $("#submit-btn");
var searchList = $("#search-list");

var searchArray = [];

init();

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
  console.log(searchArray)
  // Render search to the DOM
  renderSearch();
}

function storeSearch() {
  // Stringify and set "search" key in localStorage to search array
  localStorage.setItem("search", JSON.stringify(searchArray));
}

// When form is submitted...
$(submitBtn).click( function(event) {
  event.preventDefault();

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
});

// Create function for when city is clicked
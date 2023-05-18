var searchEl = document.querySelector(".search");

function handleSearchSubmit(event) {
  event.preventDefault();

  var searchInput = document.querySelector("#search");
  var formatInput = document.querySelector("#format");

  if (!searchInput) {
    console.error("Please enter a search parameter.");
    return;
  }

  var queryString =
    "./search-results.html?q=" + searchInput + "&format=" + formatInput;

  location.assign(queryString);
}

searchEl.addEventListener("submit", handleSearchSubmit);

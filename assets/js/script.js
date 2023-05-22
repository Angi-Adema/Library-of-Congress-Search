var searchEl = document.querySelector(".search");

function handleSearchSubmit(event) {
  event.preventDefault();

  var searchInput = document.querySelector("#search").value;
  var formatInput = document.querySelector("#format").value;

  if (!searchInput) {
    console.error("Please enter a search parameter.");
    return;
  }

  var queryString =
    "./search-pg.html?q=" + searchInput + "&format=" + formatInput;

  location.replace(queryString);
}

searchEl.addEventListener("submit", handleSearchSubmit);

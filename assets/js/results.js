var resultTextEl = document.querySelector("#result-text");
var resultContentEl = document.querySelector("#result-content");
var searchEl = document.querySelector(".search");

function searchParams() {
  var searchParamsArr = document.location.search.split("&");

  var query = searchParamsArr[0].split("=").pop();
  var format = searchParamsArr[1].split("=").pop();

  searchApi(query, format);
}

function results(resultObj) {
  console.log(resultObj);

  var resultCard = document.createElement("div");
  resultCard.classList.add("card", "bg-lightGray", "text-dark", "mb-3", "p-3");

  var resultBody = document.createElement("div");
  resultBody.classList.add("card-body");
  resultCard.append(resultBody);

  var titleEl = document.createElement("h3");
  titleEl.textContent = resultObj.title;

  var bodyContent = document.createElement("p");
  bodyContent.innerHTML = "<strong>Date:</strong>" + resultObj.date + "<br/>";

  if (resultObj.subject) {
    bodyContent.innerHTML +=
      "<strong>Subjects:</strong>" + resultObj.subject.join(", ") + "<br/>";
  } else {
    bodyContent.innerHTML += "<strong>Subjects:</strong> No subject found.";
  }

  if (resultObj.description) {
    bodyContent.innerHTML +=
      "<strong>Description:</strong>" + resultObj.description[0];
  } else {
    bodyContent.innerHTML +=
      "<strong>Description:</strong> No description found.";
  }

  var moreButtonEl = document.createElement("a");
  moreButtonEl.textContent = "Read More";
  moreButtonEl.setAttribute("href", resultObj.url);
  moreButtonEl.classList.add("btn", "btn-info");

  resultBody.append(titleEl, bodyContent, moreButtonEl);

  resultContentEl.append(resultCard);
}

function searchApi(query, format) {
  var queryUrl = "https://www.loc.gov/search/?fo=json";

  if (format) {
    queryUrl = "https://www.loc.gov/" + format + "/?fo=json";
  }

  queryUrl = queryUrl + "&q=" + query;

  fetch(queryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (urlResponse) {
      resultTextEl.textContent = urlResponse.search.query;

      console.log(urlResponse);

      if (!urlResponse.results.length) {
        console.log("No results found.");
        resultContentEl.innerHTML =
          "<h3>No results found, try your search again.</h3>";
      } else {
        resultContentEl.textContent = "";
        for (var i = 0; i < urlResponse.results.length; i++) {
          results(urlResponse.results[i]);
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function handleFormSubmit(event) {
  event.preventDefault();

  var searchInput = document.querySelector("#search").value;
  var formatInput = document.querySelector("#format").value;

  if (!searchInput) {
    console.error("Please enter a search value.");
    return;
  }

  searchApi(searchInput, formatInput);
}

searchEl.addEventListener("submit", handleFormSubmit);

searchParams();

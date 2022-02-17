const browserUrl = window.location.search;
const urlParams = new URLSearchParams(browserUrl);

const decade = urlParams.get("decade");
const country = urlParams.get("country");

let url = "";

// set correct URL according to URL parameters
if (decade) {
  url = `https://keaprojects-3e08.restdb.io/rest/movieposters?q={"decade": "${decade}"}`;
} else if (country) {
  url = `https://keaprojects-3e08.restdb.io/rest/movieposters?q={"country": "${country}"}`;
} else {
  url = `https://keaprojects-3e08.restdb.io/rest/movieposters`;
}

const options = {
  headers: {
    "x-apikey": "620b850034fd6215658585da",
  },
};

fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    showPosters(data);
  })
  .catch((e) => {
    console.error("An error occurred: ", e.message);
  });

function showPosters(posters) {
  //hide spinner when we get the posters
  let spinner = document.querySelector(".spinner");
  spinner.classList.add("hide");

  //set correct header
  handleHeader(posters);

  //show posters
  posters.forEach(showPoster);
}

function handleHeader() {
  const header = document.querySelector("h1");

  //setting the correct header
  if (decade) {
    header.textContent = decade + " posters";
  } else if (country) {
    if (country == "U.S.A") {
      header.textContent = "U.S.A" + " posters";
    } else if (country == "Poland") {
      header.textContent = "Polish" + " posters";
    } else if (country == "Russia") {
      header.textContent = "Russian" + " posters";
    } else if (country == "France") {
      header.textContent = "French" + " posters";
    }
  } else {
    header.textContent = "All posters";
  }
}

//show the posters after fetching the data
function showPoster(poster) {
  //selecting the template and cloning it
  const template = document.querySelector("#poster-list-template").content;
  const clone = template.cloneNode(true);

  //setting correct data for each poster
  clone.querySelector("img").src = poster.poster_url;
  clone.querySelector("img").alt = poster.title + " poster";
  clone.querySelector("h2").textContent = poster.title;
  clone.querySelector("p").textContent =
    poster.country + ", " + poster.release_year;
  clone.querySelector("a").href = `single.html?_id=${poster._id}`;

  //selecting the parent and appending the cloned template
  const parent = document.querySelector(".poster-list-container");
  parent.appendChild(clone);
}

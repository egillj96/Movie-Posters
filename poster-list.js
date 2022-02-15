const url = "https://keaprojects-3e08.restdb.io/rest/movieposters";

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
  posters.forEach(showPoster);
}

function showPoster(poster) {
  const template = document.querySelector("#poster-list-template").content;
  const clone = template.cloneNode(true);

  clone.querySelector("img").src = poster.poster_url;
  clone.querySelector("img").alt = poster.title + " poster";

  clone.querySelector("h2").textContent = poster.title;
  clone.querySelector("p").textContent =
    poster.country + ", " + poster.release_year;

  clone.querySelector("a").href = `poster/?_id=${poster._id}`;

  const parent = document.querySelector(".poster-list-container");
  parent.appendChild(clone);
}

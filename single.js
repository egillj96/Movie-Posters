// fetching the data
const browserUrl = window.location.search;
const urlParams = new URLSearchParams(browserUrl);
const id = urlParams.get("_id");


const url = `https://keaprojects-3e08.restdb.io/rest/movieposters?q={"_id":"${id}"}`;
console.log(url);

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
    showPoster(data);
  })
  .catch((e) => {
    console.error("An error occurred: ", e.message);
  });


//   displaying posters

function showPoster(poster) {
  console.log(poster);
    document.querySelector(".info h2").textContent = poster[0].title;
    document.querySelector(".poster img").src = poster[0].poster_url;
    document.querySelector(".poster img").alt = poster[0].title;
    document.querySelector(".movie_genre").textContent = poster[0].genre;
    document.querySelector(".year").textContent = poster[0].release_year;
    document.querySelector(".designer").textContent = "Designer: " + poster[0].poster_designer;
    document.querySelector(".country").textContent = poster[0].country;
    document.querySelector(".imdb button").href = poster[0].imdb_link;
}

const url2 = "https://keaprojects-3e08.restdb.io/rest/movieposters";


fetch(url2, options)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    addTemplate(data);
  })
  .catch((e) => {
    console.error("An error occurred: ", e.message);
  });

// template for "see also"

function addTemplate(see) {

  for (i = 0; i < 4; i++) {
    const template = document.querySelector("#see_poster").content;
    const clone = template.cloneNode(true);

    const rNum = Math.floor(Math.random() * see.length);

    clone.querySelector("article img").src = see[rNum].poster_url;
    clone.querySelector("article a").href = `poster.html?_id=${see[rNum]._id}`;
    document.querySelector("main .random_posters").appendChild(clone);
  }

}
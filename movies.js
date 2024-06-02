const apiKey = "04c35731a5ee918f014970082a0088b1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const moviesblog = document.querySelector("#movies");
const moviesdetail = document.querySelector(".posters");
const searchtextt = document.querySelector("#searchtext");
const searchbutton = document.querySelector("#searchbutton");

async function fetchrandom() {
    try {
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.results;
    } catch (error) {
        console.log("error in Fetching Data", error);
    }
}

searchbutton.addEventListener("click", async () => {
    const moviename = searchtextt.value.trim();
    if (moviename !== "") {
        try {
            const results = await fetchmovies(moviename);
            disppalymovies(results);
        } catch (error) {
            console.log("error in searching movies", error);
        }
    }
});

async function fetchmovies(moviename) {
    try {
        const apiUrl = `https://api.themoviedb.org/3/search/movie?&api_key=${apiKey}&query=${moviename}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log("error in Fetching Data", error);
    }
}

function disppalymovies(results) {
    moviesblog.innerHTML = "";
    results = results.filter(result => result.overview);
    results.forEach((result) => {
        
        const imagePath = result.poster_path === null ? "img/image-missing.png" : IMGPATH + result.poster_path;

        const trunkeddes=result.overview.length > 120 ? result.overview.slice(0,120)+"....." : result.overview;

        const moviesss = document.createElement("div");
        moviesss.classList.add("movieone");
        moviesss.innerHTML = `
            <img src="${imagePath}" alt="" />
            <div class="title">
                <h2>${result.original_title}</h2>
                <span>${result.vote_average}</span>
            </div>
            <h3>Overview:</h3>
            <p>${trunkeddes}</p>
        `;
        moviesss.addEventListener("click", () => {
            window.open(constructDetailsUrl(result), '_blank');
        });
      
        moviesblog.appendChild(moviesss);
    });
}

function constructDetailsUrl(result) {
    const url = new URL('moviedetail.html', window.location.origin);
    url.searchParams.set('poster_path', result.poster_path ? IMGPATH + result.poster_path : "img/image-missing.png");
    url.searchParams.set('original_title', result.original_title);
    url.searchParams.set('vote_average', result.vote_average);
    url.searchParams.set('overview', result.overview);
    return url.href;
}

(async () => {
    try {
        const results = await fetchrandom();
        disppalymovies(results);
    } catch (error) {
        console.log("Error in async function", error);
    }
})();

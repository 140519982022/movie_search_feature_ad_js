const apiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imageApiPAth = "https://image.tmdb.org/t/p/w1280";
const searchApi = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const movieBox = document.querySelector('#get_movies');

const getApiArr = async(url) => {
    const fetchApi = await fetch(url);
    const apiArr = await fetchApi.json();
    // console.log(apiArr);

    getMovieList(apiArr);
}

getApiArr(apiUrl);


const getMovieList = (apiData) => {

    movieBox.innerHTML = "";
    apiData.results.forEach( (result) => {
        
        // console.log(result.original_title);
        const imagePath = result.poster_path === null ? "images/image-missing.png" : imageApiPAth + result.poster_path;
        const box = document.createElement("div")
        
        box.classList.add("box")
        box.innerHTML = `
            <img src="${imagePath}" alt="" />
            <div class="overlay">
            <div class="title"> 
                <h2> ${result.original_title}  </h2>
                <span> ${result.vote_average} <span>
            </div>
            <h3>Overview:</h3>
            <p> 
                ${result.overview}
            </p>
            </div>`

        movieBox.appendChild(box)
        
    });
}

document.querySelector('#movie_srch').addEventListener("keyup",
    function (event) {

        if (event.target.value != "") {

            getApiArr(searchApi + event.target.value);
            
        }else{

            getApiArr(apiUrl);


        }
        
    }

)
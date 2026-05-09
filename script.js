document.getElementById('searchButton').addEventListener('click', buscarPeliculas)

let apiKey = 'b72be3ad14d3fc9dd7cca6e2bf32748e'
let urlBase = 'https://api.themoviedb.org/3/search/movie'
let urlImg = 'https://image.tmdb.org/t/p/w500'


function buscarPeliculas() {
    let resultsDiv = document.getElementById('results')
    let searchInput = document.getElementById('searchInput').value;

    resultsDiv.innerHTML = `<img src="loading.gif" class="loading">`;
    fetch(`${urlBase}?api_key=${apiKey}&query=${searchInput}`)
        .then(response => response.json())
        .then(response => setTimeout(() => { mostrarPeliculas(response.results) }, 700))
}

function mostrarPeliculas(movies) {

    let resultsDiv = document.getElementById('results')
    resultsDiv.innerHTML = ''

    if (movies.length === 0) {
        resultsDiv.innerHTML = '<p>No se encontraron resultados</p>'
        return
    }

    movies.forEach(movie => {

        let movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')

        let title = document.createElement('h2')
        title.textContent = movie.title

        let releaseDate = document.createElement('p')
        releaseDate.textContent = `Fecha de lanzamiento: ${movie.release_date}`

        let overview = document.createElement('p')
        overview.textContent = movie.overview

        let posterPath = urlImg + movie.poster_path

        let poster = document.createElement('img')
        poster.src = posterPath
        poster.alt = `${movie.title} poster`

        if (movie.poster_path === null) {
            poster.src = 'not-found-image.jpg'
        } else {
            poster.src = `${urlImg}${movie.poster_path}` 
        }

        if (movie.release_date === '') {
            releaseDate.textContent = 'Fecha de lanzamiento: Desconocida'
        } else {            
            releaseDate.textContent = `Fecha de lanzamiento: ${movie.release_date}`
        }

        if (movie.overview === '') {
            overview.textContent = 'Sin descripción disponible'
        } else {
            overview.textContent = movie.overview
        }

        if (movie.title === '') {
            title.textContent = 'Título desconocido'
        } else {
            title.textContent = movie.title
        }
        movieDiv.appendChild(poster)

        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)

        resultsDiv.appendChild(movieDiv)
    });
}
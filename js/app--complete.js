// SLOPPY FETCH - Promise Hell

// Get the data
var request = superagent
request._data = {}

// Fetch top rated
request
  .get('https://api.themoviedb.org/3/movie/top_rated?api_key=b21e4e4688626d2b454b9bf55959a588')
  .then(function fetch2ndBestMovie(serverRes){
    console.log(serverRes.body)
    let theList = serverRes.body.results

    //access 2nd index of the list
    let movieId = theList[1].id
    let movieTitle = theList[1].title

    // print movie title to DOM
    document.querySelector('.movie-title mark').innerHTML = movieTitle

    // fetch movie id of 2nd index
    request.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=b21e4e4688626d2b454b9bf55959a588`)
      .then(function renderSecondBestToPage(serverRes2){
        console.log(serverRes2.body)

        // print to # to DOM
        document.querySelector('.cast-count mark').innerHTML = serverRes2.body.cast.length
      })
  })

// Clean up


// ¡NICE! FETCH - Promise Hell

function fetchTopRatedMovies(){
  return request.get('https://api.themoviedb.org/3/movie/top_rated?api_key=b21e4e4688626d2b454b9bf55959a588')
}

function fetch2ndBestMovie(serverRes){
  console.log(serverRes.body)
  let theList = serverRes.body.results
  let movieId = theList[1].id
  let movieTitle = theList[1].title
  request._data.movieTitle = movieTitle
  return request.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=b21e4e4688626d2b454b9bf55959a588`)
}

function renderDataToDom(serverRes2){
  let castCount = serverRes2.body.cast.length
  document.querySelector('.movie-title mark').innerHTML = request._data.movieTitle
  document.querySelector('.cast-count mark').innerHTML = castCount
}

fetchTopRatedMovies()
  .then(fetch2ndBestMovie)
  .then(renderDataToDom)

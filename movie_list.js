
const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

var movieCates = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}

const data = []

const dataPanel = document.getElementById('data-panels')
const dataPanelMov = document.getElementById('movie-list')
const dataPanelNav = document.getElementById('nav-list')


function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

function addCategoryItems(movies, category) {
  localStorage.clear()
  var list = JSON.parse(localStorage.getItem('CategoryMovies')) || []
  // var list = []
  var cateId = getKeyByValue(movieCates, category)
  // const movie = data.find(item => item.id === Number(id))
  // console.log("############# cateId is : ", cateId)

  movies.forEach(function (mov, index) {
    // console.log("^^^^^^^^^^^^^^^^" + mov.genres.indexOf(Number(cateId)))
    if (mov.genres.indexOf(Number(cateId)) !== -1) {
      // if (mov.genres.includes(cateId)) {
      // var movie = data.find(item => item.genres.indexOf(number(cateId)) === 2)
      var movie = mov

      // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")

      if (list.some(item => item.id === Number(movie.id))) {
        console.log(`${movie.title} is already in your list.`)
      } else {
        console.log("########### the movie to be added is : " + movie.title)
        list.push(movie)
        // alert(`Added ${movie.title} to your favorite list!`)
      }
    }
    else {
      return
    }

  })

  localStorage.setItem('CategoryMovies', JSON.stringify(list))
  return list
}

function displayMovieList(data) {
  let htmlContent = ''
  data.forEach(function (item, index) {
    htmlContent += `
      <div class="col-3">
        
          <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">

          <div class="card-body movie-item-body">
            <h6 class="card-title">${item.title}</h5>
          </div>

          <div class="card-body movie-tags">
          `

    item.genres.forEach(function (element) {
      // console.log("@@@@@@@@@@@@@", element)
      htmlContent += `
              <p>${movieCates[element]}</p>
      `
      // console.log('!!!!!!!!!!!!!!', movieCates[element])
    })

    htmlContent += `
          </div>

          <!-- Add the "More" button -->
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal">More infos</button>
            </div>

        
      </div>
    `
  })
  dataPanelMov.innerHTML = htmlContent
}

// <div class="card mb-2"> </div>

function displayNavList(dict) {
  let htmlContent = ''
  for (var key in dict) {
    // check if the property/key is defined in the object itself, not in parent
    if (dict.hasOwnProperty(key)) {
      console.log(key, dict[key])
      htmlContent += `
      <li>
        <a class="nav-link" href="#" data-toggle="pill" data-toggle="pill" role="tab">${dict[key]}</a>
      </li>`
    }
  }
  dataPanelNav.innerHTML = htmlContent
}


// ################ Driven code here!!! ###################### //

displayNavList(movieCates)

// listen to data panel
dataPanel.addEventListener('click', (event) => {
  if (event.target.matches('.nav-link')) {
    var cate = event.target.innerText
    console.log(event.target.innerText)
    axios.get(INDEX_URL).then(response => {
      console.log(response.data.results)
      data.push(...response.data.results)
      list = []
      catemovieList = addCategoryItems(data, cate, list)
      displayMovieList(catemovieList)
      // console.log(response.data)
      // let lyrics = response.data.lyrics
      // console.log(lyrics)
      // displayMovieList(song, lyrics)
    }).catch((err) => console.log(err))
  }
})







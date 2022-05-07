const userSearch = document.getElementById('user-search')
const searchBtn = document.getElementById('search-btn')
const allPokemon = document.getElementById('all-pokemon')

// search button eventListener
searchBtn.addEventListener("click", (event) => {
    event.preventDefault()
    userInput = userSearch.value.trim()
    // takes userInput to search a specific pokemon
    fetchSearchedPokemon(userInput)
    // renderPokemon(userInput)
})

// displays all kanto pokemon
allPokemon.addEventListener("click", (event) => {
    event.preventDefault()
    fetchKantoPokemon()
})


// Allow the user to view a list of pokemon (extra points for using pagination).
// !!! Needs pagination
function fetchKantoPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then(function (allPokemon) {
      allPokemon.results.forEach(function (pokemonData) {
        fetchPokemonData(pokemonData);
      });
    });
}



// Allow the user to search that list of pokemon by the pokemon's name.
function fetchSearchedPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
    .then((response) => response.json())
    .then(function(pokemonData) {
        console.log(pokemonData)
        debugger
        let singlePokemonId = pokemonData.id

        fetchSinglePokemonData(singlePokemonId)
    })
    
}

function fetchSinglePokemonData(pokemonId){
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => response.json())
      .then(function(singlePokemonData){
      console.log(singlePokemonData)
      console.log(singlePokemonData.name)
      })
    }




 
// fetchKantoPokemon()


// function renderPokemon(singlePokemonData) {


//     let pokemonName = singlePokemonData.name
//     let pokemonNo = pokemonData.id
//     let pokemonHeight = pokemonData.height
//     // let pokemonImg = pokemonData.sprites.home.front_default

//     console.log(pokemonName)

//     const pokemonCard = document.createElement("div")
//     const pokemonNameEl = document.createElement("h2")
//     const pokemonNoEl = document.createElement("p")
//     const pokemonHeightEl = document.createElement("p")
//     // const pokemonImgEl = document.createElement("img")

//     // set styling attributes

//     // pokemonImgEl.setAttribute("src", pokemonImg)

//     pokemonNameEl.textContent = pokemonName
//     pokemonNoEl.textContent = pokemonNo
//     pokemonHeightEl.textContent = pokemonHeight

//     pokemonCard.append(
//         pokemonNameEl,
//         pokemonNoEl,
//         // pokemonImgEl,
//         pokemonHeightEl
//     )

//     document.getElementById('pokemon-container').appendChild(pokemonCard)


// }




// Allow the user to view a pokemon's details and statistics.


// Compare two pokemon's statistics together, side-by-side.


// Allow the user to maintain a list of their favourite Pokemon (extra points for data persistence (e.g. local storage)).
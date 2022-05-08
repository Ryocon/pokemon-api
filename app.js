const userSearch = document.getElementById("user-search");
const searchBtn = document.getElementById("search-btn");
const allPokemon = document.getElementById("all-pokemon");
const loadMoreBtn = document.getElementById("load-more-btn");
const favourites = document.getElementById("favourites")

let counter = 0;
let limit = 0;
let favouritePokemon = document.getElementsByClassName("favorite")

// search button eventListener
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  userInput = userSearch.value.trim().toLowerCase();
  // takes userInput to search a specific pokemon
  fetchSearchedPokemon(userInput);
});

// Allow the user to search that list of pokemon by the pokemon's name.
function fetchSearchedPokemon() {
  fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
    .then((response) => response.json())
    .then(function (pokemonData) {
      console.log(pokemonData);
      let singlePokemonId = pokemonData.id;

      fetchSinglePokemonData(singlePokemonId);
    });
}

// parses pokemon id to retrieve data
function fetchSinglePokemonData(pokemonId) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((response) => response.json())
    .then(function (singlePokemonData) {
      console.log(singlePokemonData);
      console.log(singlePokemonData.name);
      renderPokemon(singlePokemonData);
    });
}

// type helper function
function pokemonTypeCreator(types, ul) {
  types.forEach(function (type) {
    let typesLi = document.createElement("li");

    typesLi.innerText = type["type"]["name"];

    ul.append(typesLi);
  });
}

// function to render single search pokemon
function renderPokemon(singlePokemonData) {
  let pokemonName = singlePokemonData.name;
  let pokemonNo = singlePokemonData.id;
  let pokemonHeight = singlePokemonData.height;
  let pokemonWeight = singlePokemonData.weight;
  let pokemonImg = singlePokemonData.sprites.front_default;

  const pokemonCard = document.createElement("div");
  const pokemonNameEl = document.createElement("h2");
  const pokemonNoEl = document.createElement("p");
  const pokemonHeightEl = document.createElement("p");
  const pokemonWeightEl = document.createElement("p");
  const pokemonImgEl = document.createElement("img");
  // iterating
  const pokemonTypesEl = document.createElement("ul");
  const favIcon = document.createElement("button")

  // helper function to loop through types
  pokemonTypeCreator(singlePokemonData.types, pokemonTypesEl);

  // set styling attributes

  pokemonImgEl.setAttribute("src", pokemonImg);
  favIcon.setAttribute("class", "material-icons notFavourite btn")

  favIcon.innerHTML = "favorite_border"

  pokemonNameEl.textContent = pokemonName;
  pokemonNoEl.textContent = "Pokemon No: " + pokemonNo;
  pokemonHeightEl.textContent = "Height: " + pokemonHeight;
  pokemonWeightEl.textContent = "Weight: " + pokemonWeight;


// toggles favourite icon
// !!! ONLY TOGGLES ON
  favIcon.addEventListener("click", (event) => {
      event.preventDefault()
      if (favIcon) {
          favIcon.removeAttribute("notFavourite")
          favIcon.setAttribute("class", "favorite material-icons btn")
          favIcon.innerHTML = "favorite"
          storageSetter(pokemonNo, pokemonName)
      } 

    //   if (favIcon.innerHTML === "favorite") {
    //     favIcon.removeAttribute("favorite")
    //     favIcon.setAttribute("class", "notFavorite material-icons btn")
    //     favIcon.innerHTML = "favorite_border"
    //   }
  })



  pokemonCard.append(
    pokemonNameEl,
    pokemonNoEl,
    pokemonImgEl,
    favIcon,
    pokemonHeightEl,
    pokemonWeightEl,
    pokemonTypesEl,
    
  );

  document.getElementById("pokemon-container").appendChild(pokemonCard);
}

// Allow the user to view a pokemon's details and statistics.

// Compare two pokemon's statistics together, side-by-side.



// displays all kanto pokemon
allPokemon.addEventListener("click", (event) => {
  event.preventDefault();
  counter = 0;
  limit = 20;
  fetchKantoPokemon();
});

// Allow the user to view a list of pokemon (extra points for using pagination).
// has variable limit and offset for pagination
function fetchKantoPokemon() {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${counter}`)
    .then((response) => response.json())
    .then(function (allPokemon) {
      allPokemon.results.forEach(function (pokemonData) {
        console.log(pokemonData);
        fetchKantoPokemonData(pokemonData);
      });
    });
}

// fetches all pokemon data
function fetchKantoPokemonData(pokemonData) {
  let url = pokemonData.url;
  fetch(url)
    .then((response) => response.json())
    .then(function (pokemonData) {
      console.log(pokemonData);
      renderKantoPokemon(pokemonData);
    });
}

// renders all pokemon
function renderKantoPokemon(pokemonData) {
  let pokemonName = pokemonData.name;
  let pokemonNo = pokemonData.id;
  let pokemonHeight = pokemonData.height;
  let pokemonWeight = pokemonData.weight;
  let pokemonImg = pokemonData.sprites.front_default;

  const pokemonCard = document.createElement("div");
  const pokemonNameEl = document.createElement("h4");
  const pokemonNoEl = document.createElement("p");
  const pokemonHeightEl = document.createElement("p");
  const pokemonWeightEl = document.createElement("p");
  const pokemonImgEl = document.createElement("img");
  const pokemonTypesEl = document.createElement("ul");
  const favIcon = document.createElement("button")

  pokemonImgEl.setAttribute("src", pokemonImg);

  favIcon.setAttribute("class", "material-icons notFavourite btn")

  favIcon.innerHTML = "favorite_border"

  pokemonCard.setAttribute("class", "col p-4");

  pokemonNameEl.textContent = pokemonName;
  pokemonNoEl.textContent = "Pokemon No: " + pokemonNo;
  pokemonHeightEl.textContent = "Height: " + pokemonHeight;
  pokemonWeightEl.textContent = "Weight: " + pokemonWeight;

  pokemonTypeCreator(pokemonData.types, pokemonTypesEl);

  // toggles favourite icon
// !!! ONLY TOGGLES ON
favIcon.addEventListener("click", (event) => {
    event.preventDefault()
    if (favIcon) {
        favIcon.removeAttribute("notFavourite")
        favIcon.setAttribute("class", "favorite material-icons btn")
        favIcon.innerHTML = "favorite"
        storageSetter(pokemonNo, pokemonName)
    } 

  //   if (favIcon.innerHTML === "favorite") {
  //     favIcon.removeAttribute("favorite")
  //     favIcon.setAttribute("class", "notFavorite material-icons btn")
  //     favIcon.innerHTML = "favorite_border"
  //   }
})

  pokemonCard.append(
    pokemonNameEl,
    pokemonNoEl,
    pokemonImgEl,
    favIcon,
    pokemonHeightEl,
    pokemonWeightEl,
    pokemonTypesEl
  );

  document.getElementById("pokemon-container").appendChild(pokemonCard);
}

// loadmorebutton for all pokemon search
loadMoreBtn.addEventListener("click", function () {
  // counter += 20
  // wibbly code - still goes past 151 then loops back to 0

  if (counter < 151) {
    counter += 20 % 151;
  } else {
    counter = 0;
    loadMoreBtn.setAttribute("class", "display: none");
  }

  if (limit < 151) {
    limit === 20 % 151;
  } else {
    limit = 0;
  }

  fetchKantoPokemon();
});




//    let fav = document.getElementsByClassName("notFavourite")

//    fav.addEventListener("click", (event) => {
//        event.preventDefault()
//        if (fav) {
//            fav.removeAttribute("notFavourite")
//            fav.setAttribute("class", "favourite material-icons")
//            fav.innerHTML = favourite
//        }
//    })



// Allow the user to maintain a list of their favourite Pokemon (extra points for data persistence (e.g. local storage)).
function storageSetter(pokemonId, favouritePokemon) {

    let storageParams = {pokemonId, favouritePokemon }

    let favouriteStorage = JSON.parse(localStorage.getItem("favourite-pokemon")) || []

    favouriteStorage.push(storageParams)

    localStorage.setItem(
        "favourite-pokemon",
        JSON.stringify(favouriteStorage)
    )
}

function storageGetter() {
    return JSON.parse(localStorage.getItem("favourite-pokemon"))
}

function storageAppender() {

    let storedFavourites = storageGetter()

    for (i = 0; i < storedFavourites.length; i++) {
        let favId = storedFavourites[i].pokemonId
        fetchSinglePokemonData(favId)
    }

}

favourites.addEventListener("click", (event) => {
    storageAppender()
})
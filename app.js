const userSearch = document.getElementById("user-search");
const searchBtn = document.getElementById("search-btn");
const allPokemon = document.getElementById("all-pokemon");

// search button eventListener
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  userInput = userSearch.value.trim();
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

function fetchSinglePokemonData(pokemonId) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((response) => response.json())
    .then(function (singlePokemonData) {
      console.log(singlePokemonData);
      console.log(singlePokemonData.name);
      renderPokemon(singlePokemonData);
    });
}

// fetchKantoPokemon()

// type helper function
function pokemonTypeCreator(types, ul) {
  types.forEach(function (type) {
    let typesLi = document.createElement("li");

    typesLi.innerText = type["type"]["name"];

    ul.append(typesLi);
  });
}

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

  // helper function to loop through types
  pokemonTypeCreator(singlePokemonData.types, pokemonTypesEl);

  // set styling attributes

  pokemonImgEl.setAttribute("src", pokemonImg);

  pokemonNameEl.textContent = pokemonName;
  pokemonNoEl.textContent = "Pokemon No: " + pokemonNo;
  pokemonHeightEl.textContent = "Height: " + pokemonHeight;
  pokemonWeightEl.textContent = "Weight: " + pokemonWeight;

  pokemonCard.append(
    pokemonNameEl,
    pokemonNoEl,
    pokemonImgEl,
    pokemonHeightEl,
    pokemonWeightEl,
    pokemonTypesEl
  );

  document.getElementById("pokemon-container").appendChild(pokemonCard);
}

// Allow the user to view a pokemon's details and statistics.

// Compare two pokemon's statistics together, side-by-side.

// Allow the user to maintain a list of their favourite Pokemon (extra points for data persistence (e.g. local storage)).

// displays all kanto pokemon
allPokemon.addEventListener("click", (event) => {
  event.preventDefault();
  fetchKantoPokemon();
});

// Allow the user to view a list of pokemon (extra points for using pagination).
// !!! Needs pagination
function fetchKantoPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then(function (allPokemon) {
      allPokemon.results.forEach(function (pokemonData) {
        console.log(pokemonData);
        fetchKantoPokemonData(pokemonData);
      });
    });
}

function fetchKantoPokemonData(pokemonData) {
  let url = pokemonData.url;
  fetch(url)
    .then((response) => response.json())
    .then(function (pokemonData) {
      console.log(pokemonData);
      renderKantoPokemon(pokemonData);
    });
}

function renderKantoPokemon(pokemonData) {
  let pokemonName = pokemonData.name;
  let pokemonNo = pokemonData.id;
  let pokemonHeight = pokemonData.height;
  let pokemonWeight = pokemonData.weight;
  let pokemonImg = pokemonData.sprites.front_default;


  const pokemonCard = document.createElement("div");
  const pokemonNameEl = document.createElement("h2");
  const pokemonNoEl = document.createElement("p");
  const pokemonHeightEl = document.createElement("p");
  const pokemonWeightEl = document.createElement("p");
  const pokemonImgEl = document.createElement("img");
  const pokemonTypesEl = document.createElement("ul");

  pokemonImgEl.setAttribute("src", pokemonImg);

  pokemonNameEl.textContent = pokemonName;
  pokemonNoEl.textContent = "Pokemon No: " + pokemonNo;
  pokemonHeightEl.textContent = "Height: " + pokemonHeight;
  pokemonWeightEl.textContent = "Weight: " + pokemonWeight;


  pokemonTypeCreator(pokemonData.types, pokemonTypesEl);

  pokemonCard.append(
    pokemonNameEl,
    pokemonNoEl,
    pokemonImgEl,
    pokemonHeightEl,
    pokemonWeightEl,
    pokemonTypesEl
  );

  document.getElementById("pokemon-container").appendChild(pokemonCard);
}

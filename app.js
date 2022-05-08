const userSearch = document.getElementById("user-search");
const searchBtn = document.getElementById("search-btn");
const allPokemon = document.getElementById("all-pokemon");
const mainSearch = document.getElementById("main-search")
const kantoDisplay = document.getElementById("kanto-display")
const loadMoreBtn = document.getElementById("load-more-btn");
const favourites = document.getElementById("favourites");
const compare = document.getElementById("compare");
const pokemonCompareContainer = document.getElementById("pokemon-compare");
const compareOne = document.getElementById("compare-one");
const compareTwo = document.getElementById("compare-two");
const compareOneBtn = document.getElementById("compare-one-btn");
const compareTwoBtn = document.getElementById("compare-two-btn");
const pokemonContainer = document.getElementById("pokemon-container")

let counter = 0;
let limit = 0;
let favouritePokemon = document.getElementsByClassName("favorite");

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
  const favIcon = document.createElement("button");

  // helper function to loop through types
  pokemonTypeCreator(singlePokemonData.types, pokemonTypesEl);

  // set styling attributes

  pokemonImgEl.setAttribute("src", pokemonImg);
  favIcon.setAttribute("class", "material-icons notFavourite btn");

  favIcon.innerHTML = "favorite_border";

  pokemonNameEl.textContent = pokemonName;
  pokemonNoEl.textContent = "Pokemon No: " + pokemonNo;
  pokemonHeightEl.textContent = "Height: " + pokemonHeight;
  pokemonWeightEl.textContent = "Weight: " + pokemonWeight;

  // toggles favourite icon
  // !!! ONLY TOGGLES ON
  favIcon.addEventListener("click", (event) => {
    event.preventDefault();
    if (favIcon) {
      favIcon.removeAttribute("notFavourite");
      favIcon.setAttribute("class", "favorite material-icons btn");
      favIcon.innerHTML = "favorite";
      storageSetter(pokemonNo, pokemonName);
    }

    //   if (favIcon.innerHTML === "favorite") {
    //     favIcon.removeAttribute("favorite")
    //     favIcon.setAttribute("class", "notFavorite material-icons btn")
    //     favIcon.innerHTML = "favorite_border"
    //   }
  });

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
  const favIcon = document.createElement("button");

  pokemonImgEl.setAttribute("src", pokemonImg);

  loadMoreBtn.removeAttribute("class", "hide");
  loadMoreBtn.setAttribute("class", "btn btn-danger align-self-center d-flex align-self-center")

  favIcon.setAttribute("class", "material-icons notFavourite btn");

  favIcon.innerHTML = "favorite_border";

  pokemonCard.setAttribute("class", "col p-4");

  pokemonNameEl.textContent = pokemonName;
  pokemonNoEl.textContent = "Pokemon No: " + pokemonNo;
  pokemonHeightEl.textContent = "Height: " + pokemonHeight;
  pokemonWeightEl.textContent = "Weight: " + pokemonWeight;

  pokemonTypeCreator(pokemonData.types, pokemonTypesEl);

  // toggles favourite icon
  // !!! ONLY TOGGLES ON
  favIcon.addEventListener("click", (event) => {
    event.preventDefault();
    if (favIcon) {
      favIcon.removeAttribute("notFavourite");
      favIcon.setAttribute("class", "favorite material-icons btn");
      favIcon.innerHTML = "favorite";
      storageSetter(pokemonNo, pokemonName);
    }

    //   if (favIcon.innerHTML === "favorite") {
    //     favIcon.removeAttribute("favorite")
    //     favIcon.setAttribute("class", "notFavorite material-icons btn")
    //     favIcon.innerHTML = "favorite_border"
    //   }
  });

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
    loadMoreBtn.setAttribute("class", "hide");
  }

  if (limit < 151) {
    limit === 20 % 151;
  } else {
    limit = 0;
  }
  fetchKantoPokemon();
});


// Allow the user to maintain a list of their favourite Pokemon (extra points for data persistence (e.g. local storage)).
function storageSetter(pokemonId, favouritePokemon) {
  let storageParams = { pokemonId, favouritePokemon };

  let favouriteStorage =
    JSON.parse(localStorage.getItem("favourite-pokemon")) || [];

  favouriteStorage.push(storageParams);

  localStorage.setItem("favourite-pokemon", JSON.stringify(favouriteStorage));
}

function storageGetter() {
  return JSON.parse(localStorage.getItem("favourite-pokemon"));
}

function storageAppender() {
  let storedFavourites = storageGetter();

  for (i = 0; i < storedFavourites.length; i++) {
    let favId = storedFavourites[i].pokemonId;
    fetchSinglePokemonData(favId);
  }
}

// eventlistener for adding to favourites
favourites.addEventListener("click", (event) => {
  event.preventDefault();
  storageAppender();
  pokemonCompareContainer.setAttribute("class", "hide")
  pokemonContainer.innerHTML=""
  kantoDisplay.innerHTML=""
  // let favIcon = document.getElementsByClassName("favorite")
  // favIcon.setAttribute("class", "hide")
  // might need to go in storageappdner?
});

// event listener to reveal compare searches
compare.addEventListener("click", (event) => {
  event.preventDefault();
  mainSearch.innerHTML=""
  kantoDisplay.innerHTML=""
  pokemonContainer.innerHTML=""

  pokemonCompareContainer.removeAttribute("class", "hide");
});

// compare one button
compareOneBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let userInput = compareOne.value.trim().toLowerCase();
  fetchComparePokemon(userInput);
});

// compare two button
compareTwoBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let userInput = compareTwo.value.trim().toLowerCase();
  fetchComparePokemon(userInput);
});

// compare fetcher
function fetchComparePokemon(userInput) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
    .then((response) => response.json())
    .then(function (pokemonData) {
      console.log(pokemonData);
      let comparePokemonId = pokemonData.id;
      fetchComparePokemonData(comparePokemonId);
    });
}

// parses pokemon id to retrieve data to compare
function fetchComparePokemonData(pokemonId) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((response) => response.json())
    .then(function (comparePokemonData) {
      console.log(comparePokemonData);
      console.log(comparePokemonData.name);
      renderComparePokemon(comparePokemonData);
    });
}

// renders detailed pokemon stats for compare
function renderComparePokemon(comparePokemonData) {
  let pokemonName = comparePokemonData.name;
  let pokemonNo = comparePokemonData.id;
  let pokemonHeight = comparePokemonData.height;
  let pokemonWeight = comparePokemonData.weight;
  let pokemonImg = comparePokemonData.sprites.front_default;
  // stats

  let pokemonHp = comparePokemonData.stats[0].base_stat;
  let pokemonAttack = comparePokemonData.stats[1].base_stat;
  let pokemonDefense = comparePokemonData.stats[2].base_stat;
  let pokemonSpecialAttack = comparePokemonData.stats[3].base_stat;
  let pokemonSpecialDefense = comparePokemonData.stats[4].base_stat;
  let pokemonSpeed = comparePokemonData.stats[5].base_stat;

  const pokemonCard = document.createElement("div");
  const pokemonNameEl = document.createElement("h4");
  const pokemonNoEl = document.createElement("p");
  const pokemonHeightEl = document.createElement("p");
  const pokemonWeightEl = document.createElement("p");

  // stats
  const pokemonHpEl = document.createElement("p");
  const pokemonAttackEl = document.createElement("p");
  const pokemonDefenseEl = document.createElement("p");
  const pokemonSpecialAttackEl = document.createElement("p");
  const pokemonSpecialDefenseEl = document.createElement("p");
  const pokemonSpeedEl = document.createElement("p");

  const pokemonImgEl = document.createElement("img");
  const pokemonTypesEl = document.createElement("ul");

  pokemonImgEl.setAttribute("src", pokemonImg);

  pokemonCard.setAttribute("class", "col p-4");

  pokemonNameEl.textContent = pokemonName;
  pokemonNoEl.textContent = "Pokemon No: " + pokemonNo;
  pokemonHeightEl.textContent = "Height: " + pokemonHeight;
  pokemonWeightEl.textContent = "Weight: " + pokemonWeight;

  //   stats
  pokemonHpEl.textContent = "HP: " + pokemonHp;
  pokemonAttackEl.textContent = "Attack: " + pokemonAttack;
  pokemonDefenseEl.textContent = "Defence: " + pokemonDefense;
  pokemonSpecialAttackEl.textContent =
    "Special Attack: " + pokemonSpecialAttack;
  pokemonSpecialDefenseEl.textContent =
    "Special Defense: " + pokemonSpecialDefense;
  pokemonSpeedEl.textContent = "Speed: " + pokemonSpeed;

  pokemonTypeCreator(comparePokemonData.types, pokemonTypesEl);

  pokemonCard.append(
    pokemonNameEl,
    pokemonNoEl,
    pokemonImgEl,
    pokemonHeightEl,
    pokemonWeightEl,
    pokemonHpEl,
    pokemonAttackEl,
    pokemonDefenseEl,
    pokemonSpecialAttackEl,
    pokemonSpecialDefenseEl,
    pokemonSpeedEl,
    pokemonTypesEl
  );

  document.getElementById("side-one").appendChild(pokemonCard);
}

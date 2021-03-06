const userSearch = document.getElementById("user-search");
const searchBtn = document.getElementById("search-btn");
const allPokemon = document.getElementById("all-pokemon");
const mainSearch = document.getElementById("main-search");
const kantoDisplay = document.getElementById("kanto-display");
const loadMoreBtn = document.getElementById("load-more-btn");
const favourites = document.getElementById("favourites");
const compare = document.getElementById("compare");
const pokemonCompareContainer = document.getElementById("pokemon-compare");
const compareOne = document.getElementById("compare-one");
const compareTwo = document.getElementById("compare-two");
const compareOneBtn = document.getElementById("compare-one-btn");
const compareTwoBtn = document.getElementById("compare-two-btn");
const pokemonContainer = document.getElementById("pokemon-container");
const homeLink = document.getElementById("home-link")

// variables used to dynamically generate limit and offset for the list of pokemon
let counter = 0;
let limit = 0;
let favouritePokemon = document.getElementsByClassName("favorite");

homeLink.addEventListener("click", (event) => {
  window.location.reload(true)
  pokemonContainer.innerHTML=""
  pokemonCompareContainer.innerHTML=""
})

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
// iterates through pookemon type data and returns it as a list
function pokemonTypeCreator(types, ul) {
  types.forEach(function (type) {
    let typesLi = document.createElement("li");

    typesLi.innerText = "Type: " + type["type"]["name"];

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
  const pokemonNameEl = document.createElement("h6");
  const pokemonNoEl = document.createElement("p");
  const pokemonHeightEl = document.createElement("p");
  const pokemonWeightEl = document.createElement("p");
  const pokemonImgEl = document.createElement("img");
  // iterating list
  const pokemonTypesEl = document.createElement("ul");
//   favourite icon
  const favIcon = document.createElement("button");

  // helper function to loop through types
  pokemonTypeCreator(singlePokemonData.types, pokemonTypesEl);

//   source setting for each pokemon image
  pokemonImgEl.setAttribute("src", pokemonImg);

//   source for favourite icon from google icons
  favIcon.setAttribute("class", "material-icons notFavourite btn");

// required to set the icon type
  favIcon.innerHTML = "favorite_border";

  pokemonNameEl.textContent = pokemonName;
  pokemonNoEl.textContent = "No: " + pokemonNo;
  pokemonHeightEl.textContent = "Height: " + pokemonHeight;
  pokemonWeightEl.textContent = "Weight: " + pokemonWeight;

  // toggles favourite icon
  // !!! ONLY TOGGLES ON
//   FUTURE UPDATE - make this work to show already favourited pokemon and to remove from local storage
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

//   styling for the data to be appended to the DOM
  pokemonCard.setAttribute(
    "class",
    "pokemon-card d-flex flex-column justify-items-center align-items-center m-1 px-1 bg-light border border-rounded"
  );

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
// uses counter and limit to dynamically generate the amount to be iterated through and pulled from the API
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
  const pokemonNameEl = document.createElement("h6");
  const pokemonNoEl = document.createElement("p");
  const pokemonHeightEl = document.createElement("p");
  const pokemonWeightEl = document.createElement("p");
  const pokemonImgEl = document.createElement("img");
  const pokemonTypesEl = document.createElement("ul");
  const favIcon = document.createElement("button");

  pokemonImgEl.setAttribute("src", pokemonImg);

  loadMoreBtn.removeAttribute("class", "hide");
  loadMoreBtn.setAttribute(
    "class",
    "btn btn-danger align-self-center d-flex align-self-center"
  );

  favIcon.setAttribute("class", "material-icons notFavourite btn");

  favIcon.innerHTML = "favorite_border";

  pokemonCard.setAttribute(
    "class",
    "pokemon-card d-flex flex-column justify-items-center align-items-center m-1 pt-1 px-1 bg-light border border-rounded"
  );

  pokemonNameEl.textContent = pokemonName;
  pokemonNoEl.textContent = "No: " + pokemonNo;
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
//   FUTURE UPDATE - make the search stop at 151

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

// retrieves from local storage
function storageGetter() {
  return JSON.parse(localStorage.getItem("favourite-pokemon"));
}

// appends to the DOM
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
  loadMoreBtn.setAttribute("class", "hide");
  pokemonCompareContainer.setAttribute("class", "hide");
  pokemonContainer.innerHTML = "";
  kantoDisplay.innerHTML = "";
  // let favIcon = document.getElementsByClassName("favorite")
  // favIcon.setAttribute("class", "hide")
  // FUTURE UPDATE - figure out how to remove the favourite icon
});

// event listener to reveal compare searches
compare.addEventListener("click", (event) => {
  event.preventDefault();
  mainSearch.innerHTML = "";
  kantoDisplay.innerHTML = "";
  pokemonContainer.innerHTML = "";
  loadMoreBtn.setAttribute("class", "hide");

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
  const pokemonNameEl = document.createElement("h6");
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

  pokemonCard.setAttribute(
    "class",
    "d-flex flex-column justify-items-center align-items-center m-1 px-1 bg-light border border-rounded"
  );

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

  document.getElementById("compare-render").appendChild(pokemonCard);
}

let apiURL = "https://rickandmortyapi.com/api/character/";
let prevPageURL = null;
let nextPageURL = null;


async function getCharacters() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    displayCharacters(data.results);
    prevPageURL = data.info.prev;
    nextPageURL = data.info.next;
  } catch (error) {
    console.error("Error:", error);
  }
}


function displayCharacters(characters) {
  const characterList = document.getElementById("character-list");
  characterList.innerHTML = "";
  characters.forEach((character) => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}">
      <p>${character.species}</p>
    `;
    characterList.appendChild(card);
  });
}

getCharacters();

document.getElementById("filter-button").addEventListener("click", function () {
  const nameFilter = document.getElementById("name-filter").value;
  const statusFilter = document.getElementById("status-filter").value;
  const speciesFilter = document.getElementById("species-filter").value;
  apiURL = `https://rickandmortyapi.com/api/character/?name=${nameFilter}&status=${statusFilter}&species=${speciesFilter}`;
  getCharacters();
});

document.getElementById("reset-button").addEventListener("click", function () {
  document.getElementById("name-filter").value = "";
  document.getElementById("status-filter").value = "";
  document.getElementById("species-filter").value = "";
  apiURL = "https://rickandmortyapi.com/api/character/";
  getCharacters();
});

document.getElementById("prev-page").addEventListener("click", function () {
  if (prevPageURL) {
    apiURL = prevPageURL;
    getCharacters();
  }
});
document.getElementById("next-page").addEventListener("click", function () {
  if (nextPageURL) {
    apiURL = nextPageURL;
    getCharacters();
  }
});

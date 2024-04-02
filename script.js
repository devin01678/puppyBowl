import { createCard } from "./utils.js";

const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2401-ftb-et-web-pt";
// Use the APIURL variable for fetch requests
const baseURL =
  "https://fsa-puppy-bowl.herokuapp.com/api/2401-ftb-et-web-pt/players";

// creating a state as an object
const state = {
  puppies: [],
  messages: "This object is not in the database.",
  isError: false,
};

// I am receiving an array of API data, retrieving and converting to json
async function getPuppies() {
  const response = await fetch(`${baseURL}`);
  const result = await response.json();

  if (!result.success) {
    throw new Error(json.error);
  }
  console.log(result.data);

  state.puppies = [...result.data.players];

  render();
}

//rendering:
function render() {
  state.puppies.forEach((puppy) => {
    createCard(puppy);
  });
}

// // initialization
// async function init() {
//   await getPuppies();
// }

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${baseURL}`);
    const json = await response.json();

    // if (!json.success) {
    //   throw new Error(json.data.error);
    // }
    // console.log(json.data);
    return json.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (puppyId) => {
  try {
    const response = await fetch(`${baseURL}/${puppyId}`);
    const json = await response.json();
    if (json.success) {
      return json.data.player;
    }
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${puppyId}!`, err);
  }
};

async function createPuppy(puppy) {
  const response = await fetch(`${baseURL}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(puppy),
  });
  const json = await response.json();

  if (!json.success) {
    throw new Error(json.error.message);
  }

  return json.data;
}

const addNewPuppy = async (playerObj) => {
  try {
    const puppiesElement = document.getElementById("events");
    const elem = document.createElement("div");
    elem.classList.add("event");

    const nameElem = document.createElement("div");
    nameElem.classList.add("name");
    nameElem.append(puppy.name);

    const breedElem = document.createElement("div");
    breedElem.classList.add("breed");
    breedElem.append(puppy.breed);

    const statusElem = document.createElement("div");
    statusElem.classList.add("status");
    statusElem.append(puppy.status);

    const locationElem = document.createElement("div");
    locationElem.classList.add("image");
    locationElem.append(puppy.imagen);

    elem.append(nameElem);
    elem.append(breedElem);
    elem.append(statusElem);
    elem.append(locationElem);

    puppiesElement.append(elem);
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

const form = document.getElementById("new-player-form");
form.addEventListener("submit", async (puppy) => {
  puppy.preventDefault();

  const name = document.getElementById("name");
  const breed = document.getElementById("breed");
  const status = document.getElementById("status");
  const image = document.getElementById("image");

  const puppyArray = {
    name: name.value,
    breed: breed.value,
    status: status.value,
    image: image.value,
  };

  try {
    const newPuppy = await createPuppy(puppyArray);
    // add the new recipe to the screen
    addNewPuppy(newPuppy);
  } catch (err) {
    console.error(err);
  }
});

const removePuppy = async (playerId) => {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: "delete",
    });

    if (response.status === 204) {
      return true;
    }
    render();
  } catch (error) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
  try {
    const grid = document.querySelector(".content_grid");
    playerList.forEach((player) => {
      const card = createCard(player);

      const footerElement = card.lastChild;
      footerElement.lastChild.addEventListener("click", async (event) => {
        const selectedCard = event.target.closest(".card");
        const id = selectedCard.dataset.id;
        const result = await fetchSinglePlayer(id);
        const bodyElement = footerElement.previousSibling;

        bodyElement.innerHTML = `
        <p> Breed: ${result.breed} </p>
        <p> Status: ${result.status} </p>
        `;
      });
      grid.appendChild(card);
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

// function handleDetailsClick(puppy) {
//   const selectedCard = puppy.target.closest(".card");
//   const id = selectedCard.dataset.id;
//   const result = await fetchSinglePlayer(id);
//   console.log(id);
// }

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

init();

getPuppies();

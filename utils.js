//create a function that creates cards
export function createCard(puppy) {
  //Should create 4 things : card, card-header, card-body, card-footer
  const card = document.createElement("div");
  card.className = "card";
  //create card header
  const header = createCardHeader(puppy.name, puppy.imageUrl);
  //create card body
  const cardBodyBreed = document.createElement("div");
  const cardBodyStatus = document.createElement("div");
  //create card footer
  const cardFooter = createCardFooter();

  //append all elements to the card
  card.appendChild(header);
  card.appendChild(cardBodyBreed);
  card.appendChild(cardBodyStatus);
  card.appendChild(cardFooter);
  card.setAttribute("data-id", puppy.id);

  return card;
}

function createCardFooter() {
  const cardFooter = document.createElement("div");
  const deleteButton = document.createElement("button");
  const deleteButtonText = document.createTextNode("Remove");
  const seeDetailsButton = document.createElement("div");
  const seeDetailsButtonText = document.createTextNode("See Details");

  cardFooter.className = "card-footer";
  deleteButton.className = "btn";
  seeDetailsButton.className = "btn";

  deleteButton.appendChild(deleteButtonText);
  cardFooter.appendChild(deleteButton);

  seeDetailsButton.appendChild(seeDetailsButtonText);
  cardFooter.appendChild(seeDetailsButton);

  deleteButton.addEventListener("click", async (event) => {
    const selectedCard = event.target.closest(".card");
    const id = selectedCard.dataset.id;
    const result = await removePuppy(id);
    // re-draw my state
    if (result) {
      selectedCard.remove();
    }
  });

  seeDetailsButton.addEventListener("click", handleDetailsClick);
  return cardFooter;
}

function handleDetailsClick(puppy) {
  const selectedCard = puppy.target.closest(".card");
  const id = selectedCard.dataset.id;
}

function createCardBodyBreed(breed) {
  const cardBodyBreed = document.createElement("div");
  const breedText = document.createTextNode(breed);
  cardBodyBreed.className = "cardBodyBreedDescription";
  cardBodyBreed.appendChild(breedText);

  return cardBodyBreed;
}

function createCardBodyStatus(status) {
  const cardBodyStatus = document.createElement("div");
  const statusText = document.createTextNode(status);
  cardBodyStatus.className = "cardBodyStatusDescription";
  cardBodyStatus.appendChild(statusText);

  return cardBodyStatus;
}

// function createCardBodyImage(imageUrl) {
//   const cardBodyImageUrl = document.createElement("div");
//   //   const imageText = document.createTextNode(image);
//   //   cardBodyImage.appendChild(imageText);
//   cardBodyImageUrl.className = "cardBodyImageUrlDescription";
//   const img = document.createElement("img");
//   img.src = imageUrl;
//   cardBodyImageUrl.appendChild(img);

//   return cardBodyImageUrl;
// }

function createCardHeader(name, imageUrl) {
  const header = document.createElement("div");
  const h1 = document.createElement("h1");
  const text = document.createTextNode(name);

  header.className = "card-header card-image";

  h1.append(text);
  header.appendChild(h1);

  const cardBodyImageUrl = document.createElement("div");
  //   const imageText = document.createTextNode(image);
  //   cardBodyImage.appendChild(imageText);
  cardBodyImageUrl.className = "cardBodyImageUrlDescription";
  const img = document.createElement("img");
  img.src = imageUrl;
  cardBodyImageUrl.appendChild(img);
  header.appendChild(cardBodyImageUrl);

  return header;
}

export function addDetailsToCard() {}

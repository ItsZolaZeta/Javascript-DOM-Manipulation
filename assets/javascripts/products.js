
// -------------------------------------------- Hats -------------------------------------------- //

let hat = {
  name: "hat1",
  price: 5.99,
  color: "blue",
  imageHref: "someURL",
  toString: function() {
    let text = this.name + ', color: ' + this.color + ', price: ' + this.price + ', image: ' + this.imageHref;
    return text;
  }
}

//console.log(hat.toString());

function Accessory(name, price, color, imageHref) {
  this.name = name;
  this.price = price;
  this.color = color;
  this.imageHref = imageHref;
}

Accessory.prototype.toString = function() {
  let text = this.name + ', color: ' + this.color + ', price: ' + this.price + ', image: ' + this.imageHref;
  return text;
}

// let testHat = new Hat("testHat", 3.99, "red", "urlimage");
// console.log(testHat.toString());

let hatArray = [
  new Accessory("Baseball cap", 11.99, "red", "./assets/images/red/hats/1.png"),
  new Accessory("Baseball cap", 11.99, "blue", "./assets/images/blue/hats/1.png"),
  new Accessory("Baseball cap", 11.99, "yellow", "./assets/images/yellow/hats/1.png"),
  new Accessory("Baseball cap", 11.99, "green", "./assets/images/green/hats/1.png"),
  new Accessory("Beanie", 17.99, "red", "./assets/images/red/hats/2.png"),
  new Accessory("Beanie", 17.99, "blue", "./assets/images/blue/hats/2.png"),
  new Accessory("Beanie", 17.99, "green", "./assets/images/green/hats/2.png"),
  new Accessory("Straw hat", 10.99, "yellow", "./assets/images/yellow/hats/3.png"),
  new Accessory("Straw hat", 10.99, "blue", "./assets/images/blue/hats/3.png"),
  new Accessory("Trilby", 10.99, "red", "./assets/images/red/hats/4.png"),
  new Accessory("Trilby", 10.99, "blue", "./assets/images/blue/hats/4.png"),
  new Accessory("Trilby", 10.99, "yellow", "./assets/images/yellow/hats/4.png"),
]

function displayHat(hat) {
  let products = document.getElementById("products");

  let component = document.createElement('div');
  component.setAttribute('class', 'accessory col-sm-4');

  let card = document.createElement('div');
  card.setAttribute('class', 'card my-3');

  let currency = document.createElement('div');
  currency.setAttribute('class', 'currency btn btn-light disabled');
  currency.textContent = hat.price;

  let image = document.createElement('img');
  image.setAttribute('class', 'card-img-top');
  image.setAttribute('src', hat.imageHref);
  image.setAttribute('alt', "Image of " + hat.name);

  let card_body = document.createElement('div');
  card_body.setAttribute('class', 'card-body text-center');

  let card_title = document.createElement('h5');
  card_title.setAttribute('class', 'card-title');
  card_title.textContent = hat.name;

  let card_text = document.createElement('p');
  card_text.setAttribute('class', 'card-text');
  card_text.textContent = "Color: ";

  let em = document.createElement('em');
  em.textContent = hat.color;
  card_text.appendChild(em);

  let button = document.createElement('button');
  button.setAttribute('class', 'btn btn-outline-primary');
  button.textContent = "Add to wishlist!";

  card_body.appendChild(card_title);
  card_body.appendChild(card_text);
  card_body.appendChild(button);
  card.appendChild(currency);
  card.appendChild(image);
  card.appendChild(card_body);
  component.appendChild(card);
  products.appendChild(component);
}

function renderHats(hats) {
  let products = document.getElementById("products");
  while (products.firstChild) {
    products.removeChild(products.firstChild);
  }
  for(let i = 0; i < hats.length; i++) {
    displayHat(hats[i]);
  }
}

let accessories = [];
accessories = hatArray

renderHats(accessories);

// -------------------------------------------- Filter by color -------------------------------------------- //

const highlightSelectedFilter = (e) => {
  let buttons = document.querySelector('.btn-group');

  for(let i = 0; i<buttons.children.length; i++) {
    if(buttons.children[i].getAttribute('class').includes('active')){
      buttons.children[i].classList.remove('active');
    }
  }

  e.target.classList.add('active');
}

let buttons = document.querySelector('.btn-group');
for(let i = 0; i<buttons.children.length; i++) {
  buttons.children[i].addEventListener('click', highlightSelectedFilter)
}

function addColorClass(accessoriesArray) {
  let products = document.getElementById("products");
  for(let i = 0; i<products.children.length; i++) {
    products.children[i].classList.add(accessoriesArray[i].color);
  }
} 
addColorClass(hatArray);

function filterHatsByColor(e) {
  let products = document.getElementById("products");
  for(let i = 0; i<products.children.length; i++) {
    products.children[i].style.display = "none";
  }

  for(let i = 0; i<products.children.length; i++) {
    if (products.children[i].classList.contains(e.target.textContent.toLowerCase())) {
      products.children[i].style.display = "block";
    } 
  } 

  if(e.target.textContent == 'All'){
    for(let i = 0; i<products.children.length; i++) {
      products.children[i].style.display = "block";
    }
  }
}

for(let i = 0; i<buttons.children.length; i++) {
  buttons.children[i].addEventListener('click', filterHatsByColor);
}

let allButton = document.createElement('button');
allButton.setAttribute('type', 'button');
allButton.setAttribute('class', 'btn btn-outline-secondary');
allButton.textContent = 'All';
buttons.appendChild(allButton);

allButton.addEventListener('click', filterHatsByColor);

// -------------------------------------------- Socks and sunglasses -------------------------------------------- //

let navbar = document.querySelectorAll('.nav-link');

for(let i = 0; i<navbar.length; i++) {
  if(navbar[i].textContent != 'Hats') {
    navbar[i].addEventListener('click', loadRemoteAccessories);
  } else {
    navbar[i].addEventListener('click', loadHats);
  }
}

function loadRemoteAccessories(e) {
  let search = e.target.textContent.toLowerCase();
  let data;
  accessories = [];

  let request = new XMLHttpRequest();
  request.open('GET', search + '.json'); 
  request.onload = () => {
    data = JSON.parse(request.responseText);

    //clear current displayed accessories
    let products = document.getElementById("products");
    while (products.firstChild) {
      products.removeChild(products.firstChild);
    }

    //create Accessory objects
    for(let i = 0; i<data.length; i++) {
      let newItem = new Accessory(data[i].name, data[i].price, data[i].color, data[i].imageHref);
      accessories.push(newItem);
    }

    renderHats(accessories);
    addColorClass(accessories);
    addWishlistListeners();
  }
  request.send(); 
}

function loadHats(e) {
  accessories = hatArray;
  renderHats(accessories);
  addColorClass(accessories);
  addWishlistListeners();
}

// -------------------------------------------- Gloves -------------------------------------------- //

function addGloveButton() {
  let navbar = document.querySelector('.navbar-nav');

  let navItem = document.createElement('li');
  navItem.setAttribute('class', 'nav-item');
  let button = document.createElement('button');
  button.setAttribute('class', 'nav-link btn btn-outline-secondary mr-3');
  button.textContent = 'Gloves';
  button.addEventListener('click', loadRemoteAccessories);

  navItem.appendChild(button);
  navbar.appendChild(navItem);
}
addGloveButton();

// -------------------------------------------- Wishlist -------------------------------------------- //

function addToWishlist(accessory) { 
  accessoryJSON = JSON.stringify(accessory);

  if (sessionStorage.getItem('accessory1') == null) {
    sessionStorage.setItem('accessory1', accessoryJSON);
  } else {
    if (sessionStorage.getItem('accessory2') == null){
      sessionStorage.setItem('accessory2', accessoryJSON);
    } else {
      if (sessionStorage.getItem('accessory3') == null) {
        sessionStorage.setItem('accessory3', accessoryJSON);
      } else {
        alert("Oops, your wishlist is full.");
      }
    }
  }
}

function addWishlistListeners() {
  let wishlist = document.querySelectorAll('.card-body');
  for(let i = 0; i<wishlist.length; i++) {
    wishlist[i].lastChild.addEventListener('click', function(){addToWishlist(accessories[i])});
  }
}

addWishlistListeners();

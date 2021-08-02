
// -------------------------------------------- Hats --------------------------------------------

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

function Hat(name, price, color, imageHref) {
  this.name = name;
  this.price = price;
  this.color = color;
  this.imageHref = imageHref;
}

Hat.prototype.toString = function() {
  let text = this.name + ', color: ' + this.color + ', price: ' + this.price + ', image: ' + this.imageHref;
  return text;
}

// let testHat = new Hat("testHat", 3.99, "red", "urlimage");
// console.log(testHat.toString());

let hatArray = [
  new Hat("Baseball cap", 11.99, "red", "./assets/images/red/hats/1.png"),
  new Hat("Baseball cap", 11.99, "blue", "./assets/images/blue/hats/1.png"),
  new Hat("Baseball cap", 11.99, "yellow", "./assets/images/yellow/hats/1.png"),
  new Hat("Baseball cap", 11.99, "green", "./assets/images/green/hats/1.png"),
  new Hat("Beanie", 17.99, "red", "./assets/images/red/hats/2.png"),
  new Hat("Beanie", 17.99, "blue", "./assets/images/blue/hats/2.png"),
  new Hat("Beanie", 17.99, "green", "./assets/images/green/hats/2.png"),
  new Hat("Straw hat", 10.99, "yellow", "./assets/images/yellow/hats/3.png"),
  new Hat("Straw hat", 10.99, "blue", "./assets/images/blue/hats/3.png"),
  new Hat("Trilby", 10.99, "red", "./assets/images/red/hats/4.png"),
  new Hat("Trilby", 10.99, "blue", "./assets/images/blue/hats/4.png"),
  new Hat("Trilby", 10.99, "yellow", "./assets/images/yellow/hats/4.png"),
]

function displayHat(hat) {
  let products = document.getElementById("products");
  //console.log(products);
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

renderHats(hatArray);

// -------------------------------------------- Filter by color --------------------------------------------
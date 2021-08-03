let wishlist = [];

function retrieveWishlist() {
  for(let i = 1; i<4; i++) {
    let newWish = sessionStorage.getItem('accessory'+i);
    if(newWish != null) {
      newWish = JSON.parse(newWish);
      wishlist.push(newWish);
    }
  }
}

function displayWishlist() {
  clearWishlistDisplay();
  
  for(let i = 0; i<wishlist.length; i++) {
    displayProduct(wishlist[i]);
  }

}

function clearWishlistDisplay() {
  let products = document.getElementById("products");
  while (products.firstChild) {
    products.removeChild(products.firstChild);
  }
}

function displayProduct(accessory) {
  let products = document.getElementById("products");

  let component = document.createElement('div');
  component.setAttribute('class', 'col-sm-4');
  
  let card = document.createElement('div');
  card.setAttribute('class', 'card my-3');
  
  let currency = document.createElement('div');
  currency.setAttribute('class', 'currency btn btn-light disabled');
  currency.textContent = accessory.price;
  
  let image = document.createElement('img');
  image.setAttribute('class', 'card-img-top');
  image.setAttribute('src', accessory.imageHref);
  image.setAttribute('alt', "Image of " + accessory.name);
  
  let card_body = document.createElement('div');
  card_body.setAttribute('class', 'card-body text-center');
  
  let card_title = document.createElement('h5');
  card_title.setAttribute('class', 'card-title');
  card_title.textContent = accessory.name;
  
  let card_text = document.createElement('p');
  card_text.setAttribute('class', 'card-text');
  card_text.textContent = "Color: ";
  
  let em = document.createElement('em');
  em.textContent = accessory.color;
  card_text.appendChild(em);
  
  let button = document.createElement('button');
  button.setAttribute('class', 'btn btn-outline-danger');
  button.textContent = "Remove";
  
  card_body.appendChild(card_title);
  card_body.appendChild(card_text);
  card_body.appendChild(button);
  card.appendChild(currency);
  card.appendChild(image);
  card.appendChild(card_body);
  component.appendChild(card);
  products.appendChild(component);
}

function removeFromWishlist(key, htmlComponent) {
  sessionStorage.removeItem(key);
  htmlComponent.remove();
}

retrieveWishlist();
displayWishlist();

let removeButtons = document.querySelectorAll('.btn-outline-danger');
let products = document.getElementById('products');

for(let i = 0; i < removeButtons.length; i++) {
  let index = i+1;
  removeButtons[i].addEventListener('click', function() {removeFromWishlist('accessory'+index, products.children[i])});
}


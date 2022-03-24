

let productId = window.location.search.replace("?id=", "");
let product = [];
// Je récupére mon produit depuis mon API
const fetchById = async () => {
  await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((data) => (product = data));
};

// Je modifie les éléments de la page par rapport au produit séléctionné
const addArticle = async () => {
  await fetchById();
 
  let image = document.querySelector('.item__img img');  // ajout du html de manière dynamique
  image.src = product.imageUrl;
  image.alt = product.altText; 
  
  document.getElementById("title").textContent = product.name;

  document.getElementById("price").textContent = product.price;

  document.getElementById("description").textContent = product.description;
  
  const inputColor = document.querySelector('select');      // ajout de la selection des couleurs
    let optionColor;
    for (color of product.colors) {
      optionColor = document.createElement('option');
      optionColor.setAttribute('value', color);
      optionColor.textContent = color;
        inputColor.appendChild(optionColor);
    }

};
addArticle();

const addCart = document.getElementById('addToCart');

addCart.addEventListener('click',(event) => {
  event.preventDefault();

const itemCart = {

  id: product._id,
  name: product.name,
  quantity: quantity.value,
  color: document.getElementById('colors').value,
  price: product.price, 
  img: product.imageUrl,
  alt: product.altTxt,
  
}


let localItems = JSON.parse(localStorage.getItem('itemToCart'));

console.log(localItems);

if(localItems) {

  let newQuantity = parseInt(itemCart.quantity);

  for(i = 0; i < localItems.length; i++) {                                                
      
      if(localItems[i].id == itemCart.id && localItems[i].color == itemCart.color) {     
          newQuantity += parseInt(localItems[i].quantity);                                                                
          localItems.splice(i,1);                                                                                         
      }
      
  }
  if (newQuantity > 0) {
    localItems.push(itemCart);
            }
            localStorage.setItem('itemToCart', JSON.stringify(localItems));

            console.log(localItems);
            alert ('Votre produit a bien été ajouté au panier.');
          }else {
            localItems = [];

            // Stockage de l'array dans le localStorage.

            localItems.push(itemCart);
            localStorage.setItem('itemToCart', JSON.stringify(localItems))

            console.log(localItems);
            alert ('Votre produit a bien été ajouté au panier.');
        } 
      });

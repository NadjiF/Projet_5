
main() 

async function main() { 
    const productId =  newProductId()               
    const product = await fetchById(productId)
    displayProduct(product)
}




function newProductId() { 
    return new URL(location.href).searchParams.get('id')  //URL pour chaque produit
}


 function fetchById(productId) { 
      return   (`http://localhost:3000/api/products/${productId}`)
        .then(function(response) {
            return response.json()
        })
        .then(function(products) {
            return products
        })
        .catch (function(err) {
            alert(err)
        })
}
fetchById().then(product => {
  product;
  displayProduct(product);
});
//afficher les caractérisqtiques du produit dans le dom
//displayproduct
function displayProduct(product) {
  
  let titlePage = document.querySelector("title");         //nom de la page selon le produit
  titlePage.innerHTML = "Kanap -  " + product.name;
  
  
  let image = document.querySelector('.item__img img');  // ajout du html de manière dynamique
  image.src = product.imageUrl;
  image.alt = product.altText; 
  
  document.getElementById("title").textContent = product.name;

  document.getElementById("price").textContent = product.price;

  document.getElementById("description").textContent = product.description;
  
  const selectElt = document.querySelector('select');      // ajout de la selection des couleurs
    let optionElt;
    for (color of product.colors) {
        optionElt = document.createElement('option');
        optionElt.setAttribute('value', color);
        optionElt.textContent = color;
        selectElt.appendChild(optionElt);
    }


///////

const addCart = document.getElementById('addToCart');

addCart.addEventListener('click',(event) => {
  event.preventDefault();

const itemCart = {

  id: product.id,
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
}
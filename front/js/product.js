//object request by Id
async function fetchById() {
  try {
    const queryStringUrlId = window.location.search;
    //recupération de la chaine de requête dans l'url
    const urlParams = new URLSearchParams(queryStringUrlId);
    const productId = urlParams.get("id"); //recuperer id

    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`);
    const product = await response.json();
    return product;
  } catch (error) {
    console.log("error");
  }
}
//displayproduct
fetchById().then(product => {
  product;
  displayProduct(product);
});
//afficher les caractérisqtiques du produit dans le dom
function displayProduct(product) {
  
  let titlePage = document.querySelector("title");
  titlePage.innerHTML = "Kanap -  " + product.name;
  
  
  let image = document.querySelector('.item__img');  
  image.src = product.imageUrl;
  image.alt = product.altText; 
  
  document.getElementById("title").textContent = product.name;

  document.getElementById("price").textContent = product.price;

  document.getElementById("description").textContent = product.description;
  
  const selectElt = document.querySelector('select');
    let optionElt;
    for (color of product.colors) {
        optionElt = document.createElement('option');
        optionElt.setAttribute('value', color);
        optionElt.textContent = color;
        selectElt.appendChild(optionElt);
    }
}

///////

const sendToCart = document.getElementById('addToCart');

sendToCart.addEventListener('click',(event) => {
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
  console.log(itemCart);
})


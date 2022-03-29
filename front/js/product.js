//création d'une nouvelle URL récupération de l'id selon le produit 

let params = (new URL(document.location)).searchParams;
let productId = params.get('id');
let product = [];
// récupération du produit depuis l'API
const fetchById = async () => {
  await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((data) => (product = data));
};

// ajout du html de manière dynamique
const addArticle = async () => {
  await fetchById();
  let titlePage =document.querySelector('title'); //Titre de la page en fonction du produit (nom du produit)
  titlePage.innerHTML  = product.name;
  //image
  let image = document.querySelector('.item__img');  
  image.innerHTML = `<img src='${product.imageUrl}' alt='${product.altTxt}'></img>`;
   
  
  document.getElementById('title').textContent = product.name; //nom du produit

  document.getElementById('price').textContent = product.price; //prix total

  document.getElementById('description').textContent = product.description; //description du produit
  
  const inputColor = document.querySelector('select');      // ajout de la selection des couleurs (input)
    let optionColor;
    for (color of product.colors) {
      optionColor = document.createElement('option');
      optionColor.setAttribute('value', color);
      optionColor.textContent = color;
        inputColor.appendChild(optionColor);
    }

};
addArticle();

const addCart = document.getElementById('addToCart'); //input "ajouter aux panier"

addCart.addEventListener('click',(event) => {
  event.preventDefault();

const itemCart = {  //info de la fiche produit

  id: product._id,
  name: product.name,
  quantity: quantity.value,
  color: document.getElementById('colors').value,
  price: product.price, 
  img: product.imageUrl,
  alt: product.altTxt,
  
}

//Ajout des élements au panier
    let localItems = JSON.parse(localStorage.getItem('itemToCart'));
      
    if(localItems) {
    
      let newQuantity = parseInt(itemCart.quantity);
    
      for(i = 0; i < localItems.length; i++) {                                                
          //message alerte couleur et quantité (indiquer la couleur et la quantité)
        if (itemCart.color == null || itemCart.color === '' || itemCart.quantity == null || itemCart.quantity === '0') {
          alert('SVP choisissez une couleur et la quantité');
          return;
      }
         else if (localItems[i].id == itemCart.id && localItems[i].color == itemCart.color) {     
              newQuantity += parseInt(localItems[i].quantity);                                                                
              localItems.splice(i,1);                                                                                         
          }
       
      }
      
      if (newQuantity > 0) {
        localItems.push(itemCart);
                }
                localStorage.setItem('itemToCart', JSON.stringify(localItems));
    
                alert ('Votre produit a bien été ajouté au panier.');
              }else {
                localItems = [];
    
                // Stockage de l'array dans le localStorage si les "conditions" sont remplies
    
                localItems.push(itemCart);
                localStorage.setItem('itemToCart', JSON.stringify(localItems))
    
                alert ('Votre produit a bien été ajouté au panier.');
            } 
          });
  
  


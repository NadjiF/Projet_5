//object request by Id
async function fetchById() {
  try {
    const queryStringUrlId = window.location.search;
    //recupération de la chaine de requête dans l'url
    const urlParams = new URLSearchParams(queryStringUrlId);
    const productId = urlParams.get("id"); //recuperer id

    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`
    );
    const idProduct = await response.json();
    return idProduct;
  } catch (error) {
    console.log("error");
  }
}
//displayproduct
fetchById().then((idProduct) => {
  idProduct;
  displayProduct(idProduct);
});
//afficher les caractérisqtiques du produit dans le dom
function displayProduct(idProduct) {
  
  let titlePage = document.querySelector("title");
  titlePage.innerHTML = "Kanap -  " + idProduct.name;
  let imgProd = document.querySelector(".item__img img");
  imgProd = idProduct.imageUrl;
  imgProd = idProduct.altTxt;

  document.getElementById("title").textContent = idProduct.name;
  document.getElementById("price").textContent = idProduct.price;
  document.getElementById("description").textContent = idProduct.description;
 console.log(idProduct);
}


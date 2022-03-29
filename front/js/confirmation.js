// récupèration de l'id produit depuis l'Url avec URLSearchParams
let params = (new URL(document.location)).searchParams;
let orderId = params.get('id');


//Affiche numéro de commande
const displayOrderId = document.getElementById("orderId");
displayOrderId.textContent = orderId;
//suppression des informations stockées dans le local storage
function clearStorage() {
  localStorage.removeItem("orderId");
}
clearStorage();
// récupèration de l'id produit depuis l'Url avec URLSearchParams
let params = (new URL(document.location)).searchParams;
let orderId = params.get('id');


//Affiche numéro de commande
const displayOrderId = document.getElementById("orderId");
displayOrderId.textContent = orderId;
localStorage.clear();

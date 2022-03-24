// Affichage du numéro de commande sur la page
function displayOrder() {
    const orderId = JSON.parse(localStorage.getItem("orderId"));
  
    const displayId = document.querySelector("#orderId");
    const errorMsg = document.querySelector(".confirmation p");
  
  
    if (orderId) {
      displayId.textContent = String(orderId);
    } else {
      errorMsg.innerHTML = "Votre commande est vide !";
    }
  } 
  
  displayOrder();
  
  
  // vide le Local Storage
  function clearStorage() {
    localStorage.removeItem("orderId");
  }
  clearStorage();
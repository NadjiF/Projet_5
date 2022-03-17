// Affichage du numéro de commande sur la page
function displayOrder() {
    const orderId = JSON.parse(localStorage.getItem("orderId"));
  
    const displayId = document.querySelector("#orderId");
    const errMsg = document.querySelector(".confirmation p");
  
  
    if (orderId) {
      displayId.textContent = String(orderId);
    } else {
      errMsg.textContent = "Votre commande est vide !";
    }
  }
  
  displayOrder();
  
  
  // on vide le Local Storage
  function clearStorage() {
    localStorage.removeItem("orderId");
  }
  clearStorage();
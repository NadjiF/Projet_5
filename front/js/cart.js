//récupération des élements panier  

let panier = JSON.parse(localStorage.getItem('itemToCart'));

//function qui affiche les produits sélectionnés (description : HTML Dynamique)

function addArticle() {
    //message : le panier est vide 
    if (panier == null || panier == 0) {
        document.getElementById('totalQuantity').innerText = 0;  //panier vide si le prix total et la quantité = 0
        document.getElementById('totalPrice').innerText = 0;
        document.getElementById('cart__items').innerHTML += 
        `<h2 style="text-align:center; margin-bottom:80px;">Vous n'avez aucun article dans votre panier</h2>`
    }

    else {
        for (let article of panier) {
            //Fonction qui récupère les produits depuis l'API grâce à leur Id
            function fetchApiProduct() {
                fetch(`http://localhost:3000/api/products/` + article.id)
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                    })
                    .then((data) => {
                        //caractéristiques des produits 
                        createElements(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            fetchApiProduct();

            //création d'une fonction pour récupérer tout les produits
            
            function createElements(kanap) {
                let restProduct = {
                    id: article.id,
                    name: kanap.name,
                    imageUrl: kanap.imageUrl,
                    altText: kanap.altText,
                    quantity: article.quantity,
                    colors: article.color,
                    price: kanap.price,
                }

            let cartItem = document.getElementById("cart__items");

            cartItem.innerHTML +=
                `<article class="cart__item" data-id="${restProduct.id}" data-color="${restProduct.colors}">
                <div class="cart__item__img">
                  <img src="${restProduct.imageUrl}" alt="${restProduct.altText}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${restProduct.name}</h2>
                    <p>${restProduct.colors}</p>
                    <p>${restProduct.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${restProduct.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
        //function modifQuantité
              function modifyQuantity() {
    
                quantityProduct = document.querySelectorAll(".itemQuantity");

                quantityProduct.forEach((item) => {
                    let cart = item.closest("article");
                    let idDelete = cart.dataset.id;                        //récupération de l'id et la couleur  stocké dans "cart"
                    let colorDelete = cart.dataset.color;
                    let newQuantity = "";                                   //Var new quantity

                    item.addEventListener("change", (event) => {             //ajout ecoute à l'item = changement
                        event.preventDefault();
                        newQuantity = Number(item.value);

                        // boucle produit selon l'id et couleur
                        for (let j = 0; j < panier.length; j++) {
                            if (panier[j].id == idDelete && panier[j].colors == colorDelete) {
                                panier[j].quantity = newQuantity;
                            }
                        }
                        totalPrice();
                        localStorage.setItem('itemToCart', JSON.stringify(panier));
                    })
                })
            }
            
            modifyQuantity();
            //fonction total du prix
            function totalPrice() {
                let quantityProduct = document.getElementsByClassName("itemQuantity");
                let productTotalQuantity = document.getElementById("totalQuantity");
                let priceDiv = document.querySelectorAll(".cart__item__content__description p:last-child");
                let productTotalPrice = document.getElementById("totalPrice");

                //J'initialise mes variables de quantités totales
                let totalQtt = 0;
                let totalPrice = 0;

                //boucle quantity produit
                for (let m = 0; m < quantityProduct.length; ++m) {
                    let quantity = quantityProduct[m].valueAsNumber;
                    let price = priceDiv[m].innerText.replace('€', '');

                    //convertission price en nombre
                    let priceNumber = Number(price);              

                    totalQtt += quantity;
                    totalPrice += priceNumber * quantity;
                }

                productTotalQuantity.innerText = totalQtt;
                productTotalPrice.innerText = totalPrice;
            }
            totalPrice();

            function removeItem() {
                const removeButton = document.querySelectorAll('.deleteItem');
                // Boucle pour l'application à tous les élements contenus dans le panier
                for(let m = 0; m < removeButton.length; m++) {
                    // ajour event click au boutton "supprimer"
                    removeButton[m].addEventListener('click', (event) => {
                        event.preventDefault();
                        let removeId = panier[m].id;
                        let removeColor = panier[m].color;
                        panier = panier.filter( el => el.id !== removeId || el.color !== removeColor );
                        localStorage.setItem('itemToCart', JSON.stringify(panier));
            
                        // page reload après supression d'un produit
                        window.location.reload();
                        
                    });
                    
                }
            }removeItem();
        }
    }
}
}
                
            
//FORM//
validForm = false;
addEventListener('change', () => {

    function validFirstName() {
        let firstNameDat = document.querySelector('#firstName').value;      //function Form (prénom, nom, adresse, ville, mail)
        let textValid = document.getElementById('firstNameErrorMsg');       //function prénom
        let firstReg = new RegExp('^[A-Za-z\é\è\ê\ç\-]+$', 'g');
        
        if (firstNameDat.length == 0) {
            textValid.innerHTML = "Votre prénom n'est pas renseigné" ;     //message erreur
            textValid.style.color = 'red';
          }
        else if (firstNameDat.match(firstReg)) {
            textValid.innerHTML = '';
            return firstNameDat;
        } else {
            textValid.innerHTML = 'Veuillez entrer un prénom valide';    //message erreur
            textValid.style.color = 'red';
        }
    }

    function validLastName() {                                             //function nom
        let lastNameDat = document.querySelector('#lastName').value;
        let textValid = document.getElementById('lastNameErrorMsg');
        let lastReg = new RegExp('^[A-Za-z\é\è\ê\ç\-]+$', 'g');
        
        if (lastNameDat.length == 0) {
            textValid.innerHTML = "Votre nom n'est pas renseigné ";       //message erreur
            textValid.style.color = 'red';
          }
       else if (lastNameDat.match(lastReg)) {
            textValid.innerHTML = '';
            return lastNameDat;            
        } else {
            textValid.innerHTML = 'Veuillez entrer un nom valide';       //message erreur
            textValid.style.color = 'red';
        }
    }
    
    function validAddress() {                                               //function adresse
        let addressDat = document.querySelector('#address').value;
        let textValid = document.getElementById('addressErrorMsg');
        let adresseReg =  new RegExp('^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+', 'g');
        
        if (addressDat.length == 0) {
            textValid.innerHTML = "L'adresse n'est pas renseignée";        //message erreur
            textValid.style.color = 'red';
          }
       else if (addressDat.match(adresseReg)) {
            textValid.innerHTML = '';
            return addressDat;
        } else {
            textValid.innerHTML = 'Veuillez entrer une adresse valide';    //message erreur
            textValid.style.color = 'red';
        } 
    }
               
    function validCity() {                                                  //function ville
        let cityDat = document.querySelector('#city').value;
        let textValid = document.getElementById('cityErrorMsg');
        let cityReg = new RegExp('^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$', 'g');

        if (cityDat.length == 0) {
            textValid.innerHTML = "La ville n'est pas renseigné ";        //message erreur
            textValid.style.color = 'red';
          }
       else if (cityDat.match(cityReg)) {
            textValid.innerHTML = '';
          
            return cityDat;
        } else {
            textValid.innerHTML = 'Veuillez entrer un nom de ville valide.';   //message erreur
            textValid.style.color = 'red';
        }
    }

    function validEmail() {                                                          //function mail
        let emailDat = document.querySelector('#email').value;
        let textValid = document.getElementById('emailErrorMsg');
        let mailReg = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

        if (validEmail.length == 0) {
            textValid.innerHTML = "Le mail n'est pas renseigné ";           //message erreur
            textValid.style.color = 'red';
          }
        if (emailDat.match(mailReg)) {
            textValid.innerHTML = '';
         
            return emailDat;
        } else {
            textValid.innerHTML = 'Veuillez entrer une adresse mail valide.';    //message erreur
            textValid.style.color = 'red';
        }
    }

    validFirstName();
    validLastName();
    validAddress();
    validCity();
    validEmail();


    // Fonction récupération des données de la commande et leur envoi.
    function orderData() {
        // Const boutton "Commander !".
        const orderInput = document.getElementById('order');
        orderInput.addEventListener('click', (event) => {
            event.preventDefault();
            // Stockage des données du formulaires accompagnées des id produit.
            let produitId = [];
            for(let n = 0; n < panier.length; n++) {
                produitId.push(panier[n].id);    
            }
            // Objet contenant les données de la commande.
            let contact = {
                firstName: validFirstName(),
                lastName: validLastName(),
                address: validAddress(),
                city: validCity(),
                email: validEmail(),  
            }
            
            if (
                contact.firstName == undefined ||
                contact.lastName == undefined ||
                contact.address == undefined ||
                contact.city == undefined ||
                contact.email == undefined 
            ) {
                return false     
            }
        //Récupération des information utilisateurs et des Id à l'APi
            const commandeData = {
                contact,
                products: produitId,
            }


            // Récuperation de l'id de l'order
            let commandPost = {
                method: 'POST',
                body: JSON.stringify(commandeData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
            // Envoi des données au serveur.
            fetch(`http://localhost:3000/api/products/order`, commandPost)
            .then(function(response) {
                return response.json();
            })
            .then((dataList) => {
                localStorage.setItem('orderId', JSON.stringify(dataList.orderId));
                document.location.href = `confirmation.html?id=${dataList.orderId}`;
            })
            .catch((error) => {
                console.log(`ERREUR requete POST : ${error}`);
            });    
        })
    }
    orderData();
    
})



addArticle();

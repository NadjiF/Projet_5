
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

    for(j = 0; j < panier.length; j++) {        

   
    const divCartItems = document.getElementById('cart__items');
    const divArticle = document.createElement('article');
    const divImg = document.createElement('div');
    const img = document.createElement('img');
    const itemContent = document.createElement('div');
    const contentDescription = document.createElement('div');
    const nameProduct = document.createElement('h2');
    const colorProduct = document.createElement('p');
    const priceProduct = document.createElement('p');
    const contentSettings = document.createElement('div');
    const settingsQuantity = document.createElement('div');
    const pQuantity = document.createElement('p');
    const inputQuant = document.createElement('input');
    const settingDelete = document.createElement('div');
    const deleteItem = document.createElement('p')


       // ajout des attributs et classes des balises (HTML CART)

    divArticle.classList.add('cart__item');
    divArticle.setAttribute('data-id', `${panier[j].id}`);
    divImg.classList.add('cart__item__img');
    itemContent.classList.add('cart__item__content');
    contentDescription.classList.add('cart__item__content__description');
    contentSettings.classList.add('cart__item__content__settings');
    settingsQuantity.classList.add('cart__item__content__settings__quantity');
    inputQuant.classList.add('itemQuantity');
    inputQuant.setAttribute('type', 'number');
    inputQuant.setAttribute('name', 'itemQuantity');
    inputQuant.setAttribute('min', '1');
    inputQuant.setAttribute('max', '100');
    inputQuant.setAttribute('value', panier[j].quantity);
    settingDelete.classList.add('cart__item__content__settings__delete');
    deleteItem.classList.add('deleteItem');


    //Données stockées dans les balises(statiques et dynamiques)       
    divArticle.appendChild(divImg) + divArticle.appendChild(itemContent);
    divImg.appendChild(img);
    divImg.querySelector('img').src = panier[j].img;
    divImg.querySelector('img').alt = panier[j].alt;
    settingsQuantity.appendChild(inputQuant);
    settingsQuantity.appendChild(colorProduct) + settingsQuantity.appendChild(inputQuant);
    settingsQuantity.querySelector('p').textContent = 'Quantité : ';
    settingDelete.appendChild(deleteItem);
    itemContent.appendChild(contentDescription) + itemContent.appendChild(contentSettings);
    contentSettings.appendChild(settingsQuantity) + contentSettings.appendChild(settingDelete);
    contentDescription.appendChild(nameProduct) + contentDescription.appendChild(priceProduct);
    contentDescription.querySelector('h2').textContent = panier[j].name + " - " + panier[j].color;
    contentDescription.querySelector('p').textContent = panier[j].price + '€';
    deleteItem.textContent = 'Supprimer';
    divCartItems.appendChild(divArticle);
    }
}

// Fonction modification panier
function modifPanier(){
    const modifQuantity = document.querySelectorAll('.itemQuantity');
    // Boucle modif d'element
    for(let l = 0; l < modifQuantity.length; l++) {

        modifQuantity[l].addEventListener('change', (event) => {
            event.preventDefault();
            let modifItem  = parseInt(panier[l].quantity);         
            let modifValue =  parseInt(modifQuantity[l].value);
            let modif = panier.find(el => el.modifValue != modifItem);
            panier[l].quantity = modifValue;
            localStorage.setItem('itemToCart', JSON.stringify(panier));
            // page reload après modif ou supression d'élements
            window.location.reload();
        });
    }
}
// Fonction calcule total prix

function totalPrice() {
    
    const ptotalQuantity = document.getElementById('totalQuantity');
    const ptotalPrice = document.getElementById('totalPrice');
    let totalQuantitynum = 0;
    let totalPricenum = 0;
    
    // Boucle ensemble des produits du panier.
    for(k = 0; k < panier.length; k++) {                                
        totalQuantitynum += parseInt(panier[k].quantity);
        totalPricenum += panier[k].price*panier[k].quantity;
    }
     // Affichage total quantity + price
    ptotalQuantity.textContent = totalQuantitynum;                         
    ptotalPrice.textContent = totalPricenum;                              
}

// Fonction suppression d'élément du panier
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

            // page reload après modif ou supression d'élements
            window.location.reload();
        });
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
totalPrice();
modifPanier();
removeItem();

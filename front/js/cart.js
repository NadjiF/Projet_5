
//récupération des élements panier & Fonction affichage des caractéristiques de l'article (produit)

let localItems = JSON.parse(localStorage.getItem('itemToCart'));

console.log(localItems);


function addChosenArticle() {

    for(j = 0; j < localItems.length; j++) {        

   
    const divCartItems = document.getElementById('cart__items');


 

    const divArticle = document.createElement('article');
    const divImg = document.createElement("div");
    const img = document.createElement("img");
    const itemContent = document.createElement("div");
    const contentDescription = document.createElement("div");
    const nameProduct = document.createElement("h2");
    const colorProduct = document.createElement("p");
    const priceProduct = document.createElement("p");
    const contentSettings = document.createElement("div");
    const settingsQuantity = document.createElement("div");
    const pQuantity = document.createElement("p");
    const inputQuant = document.createElement("input");
    const settingDelete = document.createElement("div");
    const deleteItem = document.createElement("p")


       // ajout des attributs et classes des balises (HTML CART)

    divArticle.classList.add('cart__item');
    divArticle.setAttribute('data-id', `${localItems[j].id}`);
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
    inputQuant.setAttribute('value', localItems[j].quantity);
    settingDelete.classList.add('cart__item__content__settings__delete');
    deleteItem.classList.add('deleteItem');


    //Données stockées dans les balises(statiques et dynamiques)
        //Ajout de l'affichage du prix selon le produit(type)

    divArticle.appendChild(divImg) + divArticle.appendChild(itemContent);
    divImg.appendChild(img);
    divImg.querySelector('img').src = localItems[j].img;
    divImg.querySelector('img').alt = localItems[j].alt;
    settingsQuantity.appendChild(inputQuant);
    settingsQuantity.appendChild(colorProduct) + settingsQuantity.appendChild(inputQuant);
    settingsQuantity.querySelector('p').textContent = 'Quantité : ';
    settingDelete.appendChild(deleteItem);
    itemContent.appendChild(contentDescription) + itemContent.appendChild(contentSettings);
    contentSettings.appendChild(settingsQuantity) + contentSettings.appendChild(settingDelete);
    contentDescription.appendChild(nameProduct) + contentDescription.appendChild(priceProduct);
    contentDescription.querySelector('h2').textContent = localItems[j].name + " - " + localItems[j].color;
    contentDescription.querySelector('p').textContent = localItems[j].price + '€';
    deleteItem.textContent = 'Supprimer';

    
    divCartItems.appendChild(divArticle);

    }
}


// Fonction calcule total prix

function totalPriceProd() {
    
    const ptotalQuantity = document.getElementById('totalQuantity');
    const ptotalPrice = document.getElementById('totalPrice');
    let totalQuantitynum = 0;
    let totalPricenum = 0;
    
    // Boucle pour l'application de la manip à l'ensemble des produits du panier.
    for(k = 0; k < localItems.length; k++) {                                //nouvelle boucle (i et j)
        totalQuantitynum += parseInt(localItems[k].quantity);
        totalPricenum += localItems[k].price*localItems[k].quantity;
    }
     // Affichage de la quantité et du prix total de la commande
    ptotalQuantity.textContent = totalQuantitynum;                         
    ptotalPrice.textContent = totalPricenum;                              
}


// Fonction modification panier

function modifPanier(){

    // Sélection de l'élément à modifier : itemQuantity
    const itemQuantityModif = document.querySelectorAll('.itemQuantity');

    console.log(localItems);

    // Boucle pour l'application des modif sur l'ensemble des éléments du panier disposant d'une quantité à modifier.
    for(let l = 0; l < itemQuantityModif.length; l++) {

        // Suivi du changement de l'input et modification.
        itemQuantityModif[l].addEventListener('change', (event) => {
            event.preventDefault();
            let itemModif  = parseInt(localItems[l].quantity);         
            let modifValue =  parseInt(itemQuantityModif[l].value);
            let modif = localItems.find(el => el.modifValue != itemModif);
            localItems[l].quantity = modifValue;
            localStorage.setItem("itemToCart", JSON.stringify(localItems));

            // page reload après modif ou supression d'élements
            window.location.reload();
        });
    }
}



// Fonction suppression d'élément du panier.

function supprItem() {

   
    const supprButton = document.querySelectorAll('.deleteItem');
    
    // Boucle pour l'application à tous les élements contenus dans le panier.
    for(let m = 0; m < supprButton.length; m++) {

        // ajour event click au boutton "supprimer"
        supprButton[m].addEventListener('click', (event) => {
            event.preventDefault();
            let supprId = localItems[m].id;
            let supprColor = localItems[m].color;
            localItems = localItems.filter( el => el.id !== supprId || el.color !== supprColor );
            localStorage.setItem("itemToCart", JSON.stringify(localItems));

            // page reload après modif ou supression d'élements
            window.location.reload();

        });
    }
}



addEventListener('change', () => {

    function validFirstName() {
        let firstNameDat = document.querySelector('#firstName').value;
        let textValid = document.getElementById('firstNameErrorMsg');
        let firstReg = new RegExp('^[A-Za-z\é\è\ê\ç\-]+$', 'g');

        if (firstNameDat.match(firstReg)) {
          
            return firstNameDat;
        } else {
            textValid.innerHTML = 'Veuillez entrer un prénom valide.';
            textValid.style.color = 'red';
        }
        if (firstName == '') {
            textValid.innerHTML = '';
        }
    }

    function validLastName() {
        let lastNameDat = document.querySelector('#lastName').value;
        let textValid = document.getElementById('lastNameErrorMsg');
        let lastReg = new RegExp('^[A-Za-z\é\è\ê\ç\-]+$', 'g');

        if (lastNameDat.match(lastReg)) {
           
            return lastNameDat;            
        } else {
            textValid.innerHTML = 'Veuillez entrer un nom valide.';
            textValid.style.color = 'red';
        }

        if (lastNameDat == '') {
            textValid.innerHTML = '';
        }
    }
    
    function validAddress() {
        let addressDat = document.querySelector('#address').value;
        let textValid = document.getElementById('addressErrorMsg');
        let adresseReg =  new RegExp('^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+', 'g');

        if (addressDat.match(adresseReg)) {
            
            return addressDat;
        } else {
            textValid.innerHTML = 'Veuillez entrer une adresse valide';
            textValid.style.color = 'red';
        }
        if (addressDat == '') {
            textValid.innerHTML = '';
        }
    }

    function validCity() {
        let cityDat = document.querySelector('#city').value;
        let textValid = document.getElementById('cityErrorMsg');
        let cityReg = new RegExp('^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$', 'g');

        if (cityDat.match(cityReg)) {
          
            return cityDat;
        } else {
            textValid.innerHTML = 'Veuillez entrer un nom de ville valide.';
            textValid.style.color = 'red';
        }
        if (cityDat == '') {
            textValid.innerHTML = '';
        }
    }

    function validEmail() {
        let emailDat = document.querySelector('#email').value;
        let textValid = document.getElementById('emailErrorMsg');
        let mailReg = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

        if (emailDat.match(mailReg)) {
         
            return emailDat;
        } else {
            textValid.innerHTML = 'Veuillez entrer une adresse mail valide.';
            textValid.style.color = 'red';
        }
        if (emailDat == '') {
            textValid.innerHTML = '';
        }
    }

    validFirstName();
    validLastName();
    validAddress();
    validCity();
    validEmail();


    // Fonction récupération des données de la commande et leur envoi.
    function orderData() {
        // Comportement du bouton de validation de commande "Commander !".
        const commanderButt = document.getElementById('order');

        // Suivi du click sur le bouton "Commander !"
        commanderButt.addEventListener('click', (event) => {
            event.preventDefault();

            // Stockage des données du formulaires accompagnées des id produit.
            let produitId = [];
            for(let n = 0; n < localItems.length; n++) {
                produitId.push(localItems[n].id);    
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


            const commandeData = {
                contact,
                products: produitId,
            }


            // Récupération de l'id de l'order par l'API.
            let commandPost = {
                method: 'POST',
                body: JSON.stringify(commandeData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
    

            // Envoi des données de la commande à l'API.
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



addChosenArticle();
totalPriceProd();
modifPanier();
supprItem();

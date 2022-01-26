class cart {
  constructor() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
      this.cart = [];
    } else {
      return JSON.parse(cart);
    }
  }

  save(cart) {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  //fonction ajout de produits(quantité) dans le panier

    add(product) {
    let cart = getCart();
    let founProduct = this.cart.find((p) => p.id == product.id);
    if (founProduct != undefined) {
      founProduct.quantity++;
    } else {
      product.quantity = 1;
      this.cart.push(product);
    }
    this.save();
  }

  //fonction enlever des produits du panier

   remove(product) {
    this.cart = this.cart.filter((p) => p.id != product.id);
    this.save();
}

//fonction pour changer la quantité de produit

 changeQuantity(product, quantity) {
  let foundProduct = this.cart.find((p) => p.id == product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
    if (foundProduct.quantity <= 0) {
      this.remove(product);
    } else {
      this.save();
    }
  }
}

 getNumberProduct() {
  
  let number = 0;
  for (let product of this.cart) {
    number += product.quantity;
  }
  return number;
}
}

/////////////////////////////

function addChosenArticle() {

    for(j = 0; j < localItems.length; j++) { 

const cartItemsBal = document.getElementById('cart__items');


const articleBal = document.createElement('article');
    const divImgBal = document.createElement('div');
    const imgBal = document.createElement('img');
    const divItemContBal = document.createElement('div');
    const divContDescBal = document.createElement('div');
    const hNameBal = document.createElement('h2');
    const pColorBal = document.createElement('p');
    const pPriceBal = document.createElement('p');
    const divContSettings = document.createElement('div');
    const divSettingsQuant = document.createElement('div');
    const pQuantBal = document.createElement('p');
    const inpBal = document.createElement('input');
    const divSettingsDel = document.createElement('div');
    const pDelBal = document.createElement('p');

    articleBal.classList.add('cart__item');
    articleBal.setAttribute('data-id', `${localItems[j].id}`);
    divImgBal.classList.add('cart__item__img');
    divItemContBal.classList.add('cart__item__content');
    divContDescBal.classList.add('cart__item__content__description');
    divContSettings.classList.add('cart__item__content__settings');
    divSettingsQuant.classList.add('cart__item__content__settings__quantity');
    inpBal.classList.add('itemQuantity');
    inpBal.setAttribute('type', 'number');
    inpBal.setAttribute('name', 'itemQuantity');
    inpBal.setAttribute('min', '1');
    inpBal.setAttribute('max', '100');
    inpBal.setAttribute('value', localItems[j].quantity);
    divSettingsDel.classList.add('cart__item__content__settings__delete');
    pDelBal.classList.add('deleteItem');

    articleBal.appendChild(divImgBal) + articleBal.appendChild(divItemContBal);
    divImgBal.appendChild(imgBal);
    divImgBal.querySelector('img').src = localItems[j].img;
    divImgBal.querySelector('img').alt = localItems[j].alt;
    divSettingsQuant.appendChild(inpBal);
    divSettingsQuant.appendChild(pColorBal) + divSettingsQuant.appendChild(inpBal);
    divSettingsQuant.querySelector('p').textContent = 'Quantité : ';
    divSettingsDel.appendChild(pDelBal);
    divItemContBal.appendChild(divContDescBal) + divItemContBal.appendChild(divContSettings);
    divContSettings.appendChild(divSettingsQuant) + divContSettings.appendChild(divSettingsDel);
    divContDescBal.appendChild(hNameBal) + divContDescBal.appendChild(pPriceBal);
    divContDescBal.querySelector('h2').textContent = localItems[j].name + " - " + localItems[j].color;
    let totPriceProdUni = localItems[j].quantity*localItems[j].price;                                       // Prix total par type de produit.
    divContDescBal.querySelector('p').textContent = ' Montant total produit : ' + totPriceProdUni + ' € ' + ' - ' + '(Montant unitaire : ' + localItems[j].price + ' € )' ;
    pDelBal.textContent = 'Supprimer';
    cartItemsBal.appendChild(articleBal);

}
}
function totalPriceProd() {
    
    const ptotalQuantity = document.getElementById('totalQuantity');
    const ptotalPrice = document.getElementById('totalPrice');
    let totalQuantitynum = 0;
    let totalPricenum = 0;
    
    // Boucle pour l'application de la manip à l'ensemble des produits du panier.
    for(k = 0; k < localItems.length; k++) {                                // Nouvelle variable de boucle différente de i et j( précédente) pour éviter les conflits.
        totalQuantitynum += parseInt(localItems[k].quantity);
        totalPricenum += localItems[k].price*localItems[k].quantity;
    }
    
    ptotalQuantity.textContent = totalQuantitynum;                          // Affichage en text de la quantité tot.
    ptotalPrice.textContent = totalPricenum;                                // Affichage en text du prix final.
}
addChosenArticle();
totalPriceProd();
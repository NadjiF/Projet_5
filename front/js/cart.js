
//récupération des élements panier

let localItems = JSON.parse(localStorage.getItem('itemToCart'));

console.log(localItems);

//Fonction affichage des caractéristiques de l'article (produit)

function addArticle() {

    for(j = 0; j < localItems.length; j++) {   //création de boucle(i déjà utilisé dans page product)       
        const itemsBalise = document.getElementById("cart__items");
        //ajout des balises pour les caractéristiques du produit
        const article = document.createElement("article");
        const divImg = document.createElement("div");
        const img = document.createElement("img");
        const itemContent = document.createElement("div");
        const contentDescription = document.createElement("div");
        const nameProduct = document.createElement("h2");
        const colorProduct = document.createElement("p");
        const priceProduct = document.createElement("p");
        const contentSetting = document.createElement("div");
        const quantityProduct = document.createElement("div");
        const pQuantity = document.createElement("p");
        const itemInput = document.createElement("input");
        const settingDelete = document.createElement("div");
        const deleteItem = document.createElement("p")

        // ajout des attributs et classes des balises (HTML CART)

        article.classList.add("cart__item");
        divImg.setAttribute("data-id", `${localItems[j].id}`);
        img.classList.add("cart__item__img");
        itemContent.classList.add("cart__item__content");
        contentDescription.classList.add("cart__item__description");
        nameProduct.classList.add("cart__item__settings");
        quantityProduct.classList.add("cart__item__content__settings__quantity");
        itemInput.classList.add("itemQuantity");
        itemInput.setAttribute("type","number");
        itemInput.setAttribute("name","itemQuantity");
        itemInput.setAttribute("min","1");
        itemInput.setAttribute("value",localItems[j].quantity);
        settingDelete.classList.add("cart__item__content__settings__delete");
        deleteItem.classList.add("deleteItem");

        //Données stockées dans les balises(statiques et dynamiques)
        //Ajout de l'affichage du prix selon le produit(type)

        article.appendChild(divImg) + article.appendChild(itemContent);
        divImg.appendChild(img);
        divImg.querySelector("img").src = localItems[j].img;
        divImg.querySelector("img").alt = localItems[j].alt;
        itemContent.appendChild(contentDescription) + itemContent.appendChild(nameProduct);
        quantityProduct.appendChild(itemInput);
        quantityProduct.appendChild(colorProduct) + quantityProduct.appendChild(itemInput);
        quantityProduct.querySelector('p').textContent = 'quantité : ';
        contentDescription.appendChild(nameProduct) + contentDescription.appendChild(priceProduct);
        contentDescription.querySelector('h2').textContent = localItems[j].name + "-" + localItems[j].color;
        let totalPriceUni = localItems[j].quantity*localItems[j].price;
        contentDescription.querySelector('p').textContent = 'montant total produit : ' + totalPriceUni + ' € ' + ' - ' + '(Montant unitaire : ' + localItems[j].price + ' € )' ;
        settingDelete.appendChild(deleteItem)
        deleteItem.textContent = 'supprimer';

        itemsBalise.appendChild(article);
    }
    
}
addArticle();
// affichage de la quantité et Prix total

//////////////////////////////////////////////////////


let vignettes = document.querySelectorAll(".cart__item");
let suppressions = document.querySelectorAll(".deleteItem");
let quantity = document.querySelectorAll(".itemQuantity");

for (let i = 0; i < vignettes.length; i++) {
  const qty = quantity[i];
  const objet = panier[i];
  qty.addEventListener("change", (e) => {
    //On envoie la quantité selectionnée dans le panier
    objet.quantity = parseInt(e.target.value);
    // // On met à jour le localstorage
    localStorage.setItem("panier", JSON.stringify(panier));
    // on lance la fonction qui va mettre à jour le prix et le total de la page panier
    recalc();
  });
}

for (let i = 0; i < vignettes.length; i++) {
  const suppr = suppressions[i];
  let colorId = panier[i].color;
  let dataId = panier[i].id;
  // let article = panier[i];
  suppr.addEventListener("click", () => {
    // On supprime de notre panier l'élément de la boucle selectionné via splice()
    let filtre = panier.filter(function (article) {
      return article.id != dataId || article.color != colorId;
    });

    panier = filtre;
    console.log(panier);

    // on supprime le code HTML de ce même élément
    document
      .querySelector(
        `[data-id='${dataId}']` && `[data-color='${colorId}']`
      )
      .remove();
    // On met à jour le localstorage
    localStorage.setItem("panier", JSON.stringify(panier));
    // on lance la fonction qui va mettre à jour le prix et le total de la page panier
    recalc();
  });
}
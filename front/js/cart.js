
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
        const itemQuantity = document.createElement("input");
        const settingDelete = document.createElement("div");
        const deleteItem = document.createElement("p")

        // ajout des attributs et classes des balises (HTML CART)

        article.classList.add("cart__item");
        divImg.setAttribute("data-id", `${localItems[j].id}`);
        img.classList.add("cart__item__img");
        itemContent.classList.add("cart__item__content");
        contentDescription.classList.add("cart__item__description");
        contentSetting.classList.add("cart__item__settings");
        quantityProduct.classList.add("cart__item__content__settings__quantity");
        itemQuantity.classList.add("itemQuantity");
        itemQuantity.setAttribute("type","number");
        itemQuantity.setAttribute("name","itemQuantity");
        itemQuantity.setAttribute("min","1");
        itemQuantity.setAttribute("value",localItems[j].quantity);
        settingDelete.classList.add("cart__item__content__settings__delete");
        deleteItem.classList.add("deleteItem");

        //Données stockées dans les balises(statiques et dynamiques)
        //Ajout de l'affichage du prix selon le produit(type)

        article.appendChild(divImg) + article.appendChild(itemContent);
        divImg.appendChild(img);
        divImg.querySelector("img").src = localItems[j].img;
        divImg.querySelector("img").alt = localItems[j].alt;

        itemContent.appendChild(contentDescription) 
        contentDescription.appendChild(nameProduct);
        contentDescription.appendChild(colorProduct);
        contentDescription.appendChild(priceProduct);
        contentDescription.querySelector('h2').textContent = localItems[j].name;
        contentDescription.querySelector('p').textContent = localItems [j].colorProduct;
        
        contentDescription.querySelector('p').textContent = localItems[j].priceProduct;

        contentSetting.appendChild(quantityProduct);
        quantityProduct.appendChild(pQuantity);
        pQuantity.textContent = 'Qté : ';
        itemQuantity.classList.add("itemQuantity");
        itemQuantity.setAttribute("name", "itemQuantity");
        itemQuantity.setAttribute("type", "number");
        itemQuantity.setAttribute("min", "1");
        itemQuantity.setAttribute("max", "100");
        itemQuantity.setAttribute("value", article.quantity);
       
        settingDelete.appendChild(deleteItem);
        deleteItem.textContent = 'supprimer';

        itemsBalise.appendChild(article);
    }
    
}
addArticle();
// affichage de la quantité et Prix total


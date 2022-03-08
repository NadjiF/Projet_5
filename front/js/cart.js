const cart = []                     // []= array

retrieveItemsFromCache()
console.log(cart)
cart.forEach(item => displayItem(item)) //loupe

function retrieveItemsFromCache() {           /// on recupere les items du cache et on les mets dans une variable

    const numberOfItems = localStorage.length
    for (let i = 0;i < numberOfItems; i++) {
        //console.log(i)
        const item = localStorage.getItem(localStorage.key(i)) || ""
        const itemObject = JSON.parse(item)      //JSON.parse: prend une chaine de caractere pour en faire un objet
        cart.push(itemObject)                    //a chaque fois que lon trouve un objet on PUSH ce dernier
    }
}

function displayItem(item) {
    const article = makeArticle(item)
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)

    const cardItemContent = makeCartContent(item)
    article.appendChild(cardItemContent)
    displayArticle(article)
    displayTotalQuantity(item)
    displayTotalPrice(item)
}

function displayTotalQuantity(item) {
    let total = 0
    const totalQuantity = document.querySelector("#totalQuantity")
    cart.forEach(item => {
        const totalUnitQuantity = item.quantity
        total += totalUnitQuantity
    })
    totalQuantity.textContent = total
}

function displayTotalPrice(item) {
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach(item => {
        const totalUnitPrice = item.price * item.quantity
        total += totalUnitPrice
    })
    totalPrice.textContent = total
}


function makeCartContent(item) {
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")
    const description = makeDescription(item)
    const settings = makeSettings(item)

    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
}

function makeSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__content__settings")

    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function deleteItem(item) {
    const itemToDelete = cart.findIndex(
      (product) => product.id === item.id && product.color === item.color
    )
    cart.splice(itemToDelete, 1)
    displayTotalPrice()
    displayTotalQuantity()
    deleteDataFromCache(item)
    deleteArticleFromPage(item)
  }

function deleteArticleFromPage(item) {
    const articleToDelete = document.querySelector(
      `article[data-id="${item.id}"][data-color="${item.color}"]`
    )
    articleToDelete.remove()
}


function addQuantityToSettings(settings, item) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")

    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)

    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item)) // si chgnt

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

function updatePriceAndQuantity(id, newValue, item) {
    const itemToUpdate = cart.find(item => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalQuantity()
    displayTotalPrice()
    deleteDataFromCache(item)
}
function deleteDataFromCache(item) {
    const key = `${item.id}-${item.color}`
    //console.log("on retire cette key", key)

    localStorage.removeItem(key)
}

function saveNewDataToCache(item) {
    const dataToSave = JSON.stringify(item) // JSON.stringify: prend l objet et le transforme en chaine de caractere
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, dataToSave)
}

function makeDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name 

    const p = document.createElement("p")
    p.textContent = item.color

    const p2 = document.createElement("p2")
    p2.textContent = item.price + " €"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("card__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

function makeImageDiv(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}
/*----------------------------------*/
/*-------------FORM------------------*/
/*----------------------------------*/


const orderButton = document.querySelector("#order") // formulaire contatct
orderButton.addEventListener("click", (e) => submitForm(e))

function submitForm(e) {
    e.preventDefault()
    if (cart.length === 0) {
        alert("Please select products to buy")
        return
    }

    if (isFormInvalid()) return
    if (isEmailInvalid()) return
    

    const body = makeRequestBody()

    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type" : "application/json",
        } 
    }) 
        .then((res) => res.json())
        .then((data) => {
            const orderId = data.orderId
            window.location.href = "./confirmation.html" + "?orderId=" + orderId
          })
        .catch((err) => console.error(err)) // afficher l'erreur si présente
        //console.log(form.elements.value)
} 

function isFormInvalid() {          //ALERT: VEUILLEZ REMPLIR TOUS LES CHAMPS
    const form =document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input") // une liste de tous les input
    inputs.forEach((input) => {                 //pr chaque input 
        if (input.value === "") {               // si la value est null
          alert("Please fill all the fields")   // alert " please ..."
          return true
        }
        return false
      })
}

function isEmailInvalid() {         //utilisation REGEX pour entrer un email valide !
    const email = document.querySelector("#email").value    // pr afficher l email dans la console
    console.log(email)
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
        if (regex.test(email) === false) {
            alert("Please enter valid email")
            return true
        }
      return false
}

function makeRequestBody() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const body = { 
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products: getIdsFromCache()
    }
    //console.log(body)
    return body
}

function getIdsFromCache() {
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {
        const key = localStorage.key(i)
        //console.log(key)
        const id = key.split("-")[0] // pr récup juste l ID sans la couleur
        ids.push(id)
    }
    return ids 
}
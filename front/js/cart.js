// array products
let products = [];
console.log(products);
//total price
const totalPrice = [];
//
let cartItems = JSON.parse(localStorage.getItem ("#cart__items"));

function cartStorage() {
    
      if (cartItems == null) {
          console.log("le panier est vide");
          let vide = document.querySelector("#vide");
          vide.style.display = "none";
          
          //
          let emptyPanier = document.querySelector(".panier_vide")
          let i = document.createElement("i");
          i.className = "itex fas fa-shopping-basket";
          emptyPanier.appendChild(i);
          console.log(i);

          //
          let textPanier = document.createElement("p");
          textPanier.textContent = "Le panier est vide";
          textPanier.className = "texte";
          i.appendChild(textPanier);
        
      } else {
          for (i =0; i < cartItems.length; i++) {
              cartDisplay(cartItems);
              cartPrice(cartItems);
              products.push(cartItems[i].idProduit);
          }
        
      }
    }
    cartStorage();


    function cartDisplay(cartItems) {  
        let basket = document.querySelector(".panier_body");
    
        var tr = document.createElement("tr");
        tr.className = "contenu_panier form-row";
        basket.appendChild(tr);
    
        let row1 = document.createElement("td");
        row1.className = "col-4";
        tr.appendChild(row1);
    
        var img = document.createElement("img");
        img.className = "image_panier";
        img.src = cartItems[i].imageProduit;
        img.alt = "appareil photo vintage";
        row1.appendChild(img);
    
        let row2 = document.createElement("td");
        row2.className = "name col-2";
        row2.textContent = cartItems[i].nomProduit;
        tr.appendChild(row2);
       
        let row3 = document.createElement("td");
        row3.className = "lense col-2";
        row3.textContent = cartItems[i].optionProduit;
        tr.appendChild(row3);
    
        let row4 = document.createElement("td");
        row4.className = "quantity col-2";
        row4.textContent = cartItems[i].quantité;
        tr.appendChild(row4);
    
        let row5 = document.createElement("td");
        row5.className = "price col-2";
        row5.textContent = cartItems[i].prix + "€";
        tr.appendChild(row5); 
    }    

    ////
    function cartPrice(cartItems) {
        let priceCanap = cartItems[i].prix;
        totalPrice.push(priceCanap);
    
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const prixTotal = totalPrice.reduce(reducer);
    
        //stockage du prix total pour la page confirmation
        localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
       
        let total = document.querySelector(".total")
        total.textContent = prixTotal + "€";
    }
    /////

    function viderPanier() {
        const vider = document.querySelector(".cart_button_clear");
        vider.addEventListener('click', (e)=>{
            e.preventDefault;
    
            //méthode removeItem pour vider le localStorage
            localStorage.removeItem("element");
            localStorage.removeItem("contact");
            localStorage.removeItem("prixTotal")
    
            //recharge de la page html
            window.location.href = "panier.html";
        })
    }

    ////

    function DataContact () {
        let lastName = document.querySelector("#lastName").value;
        let firstName = document.querySelector("#firstName").value;
        let address = document.querySelector("#address").value;
        let city = document.querySelector("#city").value;
        let email = document.querySelector("#email").value;
        contact = new infoClients(lastName, firstName, address, city, email);
    };
    DataContact();

    /////

    function validateForm() {
        var form = document.querySelector("#formulaire");
        lastName = form.lastName.value;
        firstName = form.firstName.value;
        address = form.address.value;
        city = form.city.value;
        email = form.email.value;
    
        if (/[A-Za-z-]{2,}/.test(lastName) &&
         /[A-Za-z-]{2,}/.test(firstName) &&
         /[a-zA-Z0-9]{2,}/.test(address) &&
         /[A-Za-z-]{2,}/.test(city) && 
         /[a-z 0-9._-]+@[a-z 0-9.-]{2,}[.][a-z]{2,3}/.test(email)) {
            DataContact();
            alert("Valide");
            return true;
        }else{
            alert("Invalide");
            return false;
        }
    }

    ////

    function dataButton() {
        //bouton envoyer formulaire 
        const bouton = document.querySelector(".btn-primary");
    
        bouton.addEventListener('click', (e) => {
            e.preventDefault();
    
            //Vérification des données 
            validateForm();
    
            //Mettre objet dans le localStorage
            localStorage.setItem("contact", JSON.stringify(contact));
            
            //Mettre valeurs à envoyer sur le serveur 
                const update = {
                contact,
                products,
            }
    
            pushData = async () => {
                const location = window.location.hostname;
                //elements de la methode post
                const options = {
                    method: "POST",
                    headers: {
                    "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(update),
                }; 
                try {
                    const res = await fetch("http://localhost:3000/api/produits/order", options);
                    if (res.ok) {
                        let value = await res.json();
                        //Récupération de l'orderId 
                        const orderId = value.orderId;
                        localStorage.setItem("orderId", JSON.stringify(orderId));
                        console.log("données bien envoyées");
                        window.location.href = "confirmation.html";
                    } else { 
                        console.error(err)
                    }
                } catch (err) {
                    console.log("err"); 
                }
            }
    
            //appelle de la fonction 
            pushData();
            }) 
    }
    
    dataButton();
    
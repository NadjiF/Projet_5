let productsData = [];

//api request

const fetchProducts = async () => { 
await fetch("http://localhost:3000/api/products/")
.then((res) => res.json())
    .then((data) => productsData = data);
    
    console.log(productsData);
};
//fonction affichage des produits
const productsDisplay = async () => {    
    await fetchProducts();


  items.innerHTML = productsData
        .map(
            (product) =>
            `
            
            <a href="front/html/product.html?id=${product._id}">
            <article class="card">
            <img src="${product.imageUrl}" />
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
            </article> 
            </a>
            
            `
        )
        .join('');


};
productsDisplay();
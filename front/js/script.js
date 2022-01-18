let productsData = [];

const fetchProducts = async () => { 
await fetch("http://localhost:3000/api/products/")
.then((res) => res.json())
    .then((data) => productsData = data);
    
    console.log(productsData);
};

const productsDisplay = async () => {    
    await fetchProducts();


  items.innerHTML = productsData
        .map(
            (product) =>
            `
            
            <a href="./product.html?id=42"${product._id}>
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
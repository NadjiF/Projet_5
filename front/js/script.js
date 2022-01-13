let products;

//API REQUEST
const fetchProducts = async() => {
    products = await fetch(
        'http://localhost:3000/api/products/').then(res =>res.json());
        console.log(products)
    
        
};

const showProducts = async() => {
    await fetchProducts();


items.innerHTML = (
    
    products
    .filter(product => product.name.toLowerCase())
    .map(product => (
        `
        <article>
        <img src="${product.imageUrl}" />
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
        </article>  

        `
    ))
);
};
showProducts();
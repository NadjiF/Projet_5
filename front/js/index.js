let products;

//API REQUEST
const fetchproducts = async() => {
    products = await fetch(
        'http://localhost:3000/api/products/').then(res =>res.json());
    
        console.log(products);
};

fetchproducts();
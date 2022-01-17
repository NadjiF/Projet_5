const header = documeny.getElementById("header");
const  

//API REQUEST
function getProducts() {
    fetch('http://localhost:3000/api/products/')
    .then((res) => res.json())
    .then ((products) => {
        console.log(products);


    
        
    });
}

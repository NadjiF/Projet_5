//Url pour chaque produit(fonction)
const getProductId = () => {
    return new URL(location.href).searchParams.get('id')
};

//donnée du tableau et comportements
const getProduct = (getProductId) => {
    return fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(products) {
        return products
    })
    .catch (function(err) {
        alert(err)
    })
}
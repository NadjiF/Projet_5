const getProduct = async () => {
  return fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => getOneProduct = data);

};
console.log(getProduct)
let imgProduct = "imgUrl";

console.log(imgProduct);

const { getAllProducts, getSingleProduct, deleteProduct, updateProduct, putProduct, optionsProducts} = require("../controllers/products.controller");

module.exports = function(router) {
    router.options("/products", optionsProducts);      
    router.get("/products", getAllProducts); 
    router.get("/products/:sku", getSingleProduct);
    router.delete("/products/:sku", deleteProduct);
    router.patch("/products/:sku", updateProduct);
    router.post("/products", putProduct);
};
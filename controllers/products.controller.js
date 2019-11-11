const ProductRef = require("../models/product.model");

exports.optionsProducts = function(req, res) {
    res.header("allow", "OPTIONS, GET, POST");  
    res.status(204);
    res.end();
  };

exports.getAllProducts = function(req, res) {
    ProductRef.get().then(docs => {
        const results = [];
        docs.forEach(doc => results.push(doc.data()));
            res.json(results);
    });
};

exports.getSingleProduct = function(req, res) {
    ProductRef.where("sku", "==", req.params.sku).get()
    .then(docs => {
        docs.forEach(doc => res.json(doc.data()))
    });
};

exports.putProduct = function(req, res) {
    req.fields.price = parseFloat(req.fields.price);
    req.fields.weight = parseFloat(req.fields.weight);
    ProductRef.add({ ...req.fields })
    .then(ref => {
        ref.get().then(doc => res.status(201).json(doc.data()))
    })
    .catch(error => res.json(error));
};

exports.deleteProduct = function(req, res) {
    ProductRef.where("sku", "==", req.params.sku).get()
    .then(docs => {
        docs.forEach(doc => doc.ref.delete());
    })
    .catch(error => res.status(500).json({message: error}));
    res.status(204).end();
};

exports.updateProduct =  function(req, res) {
    if (Req.fields.price){
    Req.fields.price = parseFloat(Req.fields.price);
    }
    if(Req.fields.weight){
    Req.fields.weight = parseFloat(Req.fields.weight);
    }

    ProductRef.where("sku", "==", req.params.sku).get()
    .then(docs => {
        docs.forEach(doc => doc.ref.update( { ...req.fields }).get()
            .then(doc => res.json(doc.data()))
        );
    })
};

const ProductRef = require("../models/product.model");
const { log } = require("../middleware/logger");

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


exports.getSingleProduct = async function(req, res) {
    try {
    const docs = await ProductRef.where("sku", "==", req.params.sku).limit(1).get();
        docs.forEach(doc => res.json(doc.data()));
        
    } catch (error) {
        catchError(error);
    }
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

exports.deleteProduct = async function(req, res) {

    try {
        const docs = ProductRef.where("sku", "==", req.params.sku).get()
        docs.forEach(doc => doc.ref.delete());
        res.status(204).end();
    } catch(error) {
        catchError(error);
    }
};

exports.updateProduct = async function(req, res) {
    if (Req.fields.price){
    Req.fields.price = parseFloat(Req.fields.price);
    }
    if(Req.fields.weight){
    Req.fields.weight = parseFloat(Req.fields.weight);
    }
    try {
        const docs = await ProductRef.where("sku", "==", req.params.sku).limit(1).get()
        docs.forEach(async doc => {
            try {
                doc.ref.update({ ...req.fields });
                const result = await doc.ref.get();
                res.json(result.data());
            } catch(error){
            catchError(error);
            }
        });
    } catch(error) {
        catchError(error);
    }
};


function catchError (error) {
    log.error(error.stack);
    res.status(500).end();
}
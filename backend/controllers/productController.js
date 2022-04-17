//product Controller
//import product model
const Product = require('../models/productModel')
//import formidable 
const formidable = require('formidable')
//import loadsh 
const _ = require('lodash')
// import fs
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrHandler')




// create product
exports.createProduct = (req, res) => {
    const form = formidable({});
    form.parse(req, (err, fields, files) => {
        
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        //validate fields
        const { name, description, price, category, quantity, shipping ,sold  } = fields
        if (!name || !description || !price || !category || !quantity || !shipping || !sold ) {
            return res.status(400).json({
                error: "All fields are required"
            })
        }
        let product = new Product(fields);
        // validation photo size
        if (files.photo) {
            if (files.photo.size > 1000000) {      //1mb  = 1000000 bytes
                return res.status(400).json({
                    error: "Image should be less than 1mb"
                })
            }
        }
        if (files.photo) {
            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = files.photo.mimetype;
        }

        product.save((err, result) => {
            if (err) {
                
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};


//get product by id middleware


exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product;
        next();
    })
}



//get product by id
exports.getProductById = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}


//delete product
exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Product deleted successfully"
        })
    })
}

//update product
exports.updateProduct = (req, res) => {
    let form = formidable({});
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        let product = req.product;
        product = _.extend(product, fields)
        // validation photo size
        if (files.photo) {
            if (files.photo.size > 1000000) {      //1mb  = 1000000 bytes
                return res.status(400).json({
                    error: "Image should be less than 1mb"
                })
            }
        }
        if (files.photo) {
            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = files.photo.mimetype;
        }
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
}



// get all products sort by best selling = /products?sortBy=sold&order=desc&limit=4
// get all products sort by price high to low = /products?sortBy=price&order=desc&limit=4
// get all products to low to high = /products?sortBy=price&order=asc&limit=4
// get all products to high to low = /products?sortBy=price&order=desc&limit=4
// get all products by arrival = /products?sortBy=createdAt&order=desc&limit=4

exports.getAllProducts = (req, res) => {

    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                })
            }
            res.json(products);
        })
}   


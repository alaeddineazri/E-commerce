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
            if (files.photo.size > 1000000) {      //1mb
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

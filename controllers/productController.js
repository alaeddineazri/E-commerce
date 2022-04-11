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
        console.log("files",files)
        console.log("fields",fields)
        
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        let product = new Product(fields);
        if (files.photo) {
            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = files.photo.type;
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

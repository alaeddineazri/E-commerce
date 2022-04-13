//category Controller
const { errorHandler } = require('../helpers/dbErrHandler');
const Category = require('../models/categoryModel');


//create category
exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to create category"
            });
        }
        res.json({ category });
    });
}

//crating category by id
exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "category not found"
            });
        }
        req.category = category;
        next();
    });
}


//get category by id
exports.getCategoryById = (req, res) => {
    return res.json(req.category);
}

// update category
exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(updatedCategory);
    });
}

//delete category
exports.deleteCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to delete category"
            });
        }
        res.json({
            message: "category deleted successfully"
        });
    });
}

//get all categories
exports.getAllCategories = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "No categories found"
            });
        }
        res.json(categories);
    });
}




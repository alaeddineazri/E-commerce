//category Controller
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



//create Category model
//model schema for Category
const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4,
        maxlength: 20,
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Category', categorySchema);
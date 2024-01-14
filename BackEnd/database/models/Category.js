const mongoose = require('mongoose');

const CategorySchema =  new mongoose.Schema({
    categoryName: { type: String, required: true },
    subCategory: [{
        subCategoryName:{
            type:String,
        },
        subCategoryID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubCategory"
        }
    }],
});

module.exports = mongoose.model("Category", CategorySchema);
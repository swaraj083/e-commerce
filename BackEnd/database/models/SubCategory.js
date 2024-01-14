const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    subCategoryName: { type: String, required: true },
    products: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
});

module.exports = mongoose.model("SubCategory", SubCategorySchema);
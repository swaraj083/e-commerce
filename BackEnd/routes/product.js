///////////////////
// MODULE IMPORT //
///////////////////
const express = require("express");
const SubCategory = require("../database/models/SubCategory");

///////////////////////////
// DATABASE MODEL IMPORT //
///////////////////////////
const Featured = require("../database/models/Featured");
const Product = require("../database/models/Product");
const Category = require("../database/models/Category");

///////////////////////
// MIDDLEWARE IMPORT //
///////////////////////
const isAdmin = require("../middlewares/isAdmin");

//////////////////
// UTILS IMPORT //
//////////////////
const upload = require("../utils/multer");

///////////////
// FUNCTIONS //
///////////////

/**
 * Finds SubCategory ID
 * @author Omkar Mahangare
 * @param {String} category - Name of the Category Record
 * @param {String} subCategory - Name of the SubCategory Record
 * @returns {Number} SubCategory ID
 */
const getSubCategory = async (category, subCategory) => {
    // Variable Declarations
    let subCategoryID;

    // Find Category
    const categoryrecord = await Category.findOne({ categoryName: category });

    // Find the SubCategory ID using SubCategory Name
    for (let j = 0; j < categoryrecord.subCategory.length; j++) {
        if (categoryrecord.subCategory[j].subCategoryName === subCategory) {
            subCategoryID = categoryrecord.subCategory[j].subCategoryID;
            return subCategoryID
        }
    }

    // Return SubCategory ID
    return subCategoryID;
}

////////////
// ROUTES //
////////////

const router = express.Router();

////////////////////
// REQUEST -> GET //
////////////////////

/**
 * @author Omkar Mahangare
 * @desc Send Featured and Iconic Products
 * @route GET products/getfeatured-and-iconic
 * @access Public
 */
router.get("/getfeatured-and-iconic", async (req, res) => {
    try {
        // Fetch Featured and Iconic Products from Database
        const featured = await Featured.find();
        const iconic = await Product.find({ isIconic: true });

        // Response
        res.status(200).json({ success: true, featured, iconic })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
})

/**
 * @author Omkar Mahangare
 * @desc Send Products from the requested Category
 * @route GET products/getproducts/:category
 * @param {String} category - Name of the Category
 * @access Public
 */
router.get("/getproducts/:category", async (req, res) => {
    try {
        // Fetch the Category from Database
        const category = await Category.findOne({ categoryName: req.params.category });
        let allProducts = [];

        // Category Not Found
        if (!category) {
            return res.status(500).json({ success: false, error: "Category Not Found" });
        }

        // Fetch SubCategory and Products from it
        for (let i = 0; i < category.subCategory.length; i++) {
            let products = [];
            // Fetch SubCategory
            const subCategory = await SubCategory.findById(category.subCategory[i].subCategoryID)

            // SubCategory Not Found
            if (!subCategory) {
                continue;
            }

            // Fetch Products
            for (let j = 0; j < subCategory.products.length; j++) {
                let p = await Product.findById(subCategory.products[j])
                products.push(p);
            }

            // Push Data
            allProducts.push({ subCategoryName: subCategory.subCategoryName, products })
        }

        // Response
        res.status(200).json({ success: true, allProducts })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
})

/**
 * @author Omkar Mahangare
 * @desc Send specific Product
 * @route GET products/get-product/:id
 * @param {String} id - Id of the Product
 * @access Public
 */
router.get("/get-product/:id", async (req, res) => {
    try {
        // Fetch Product Using id
        const product = await Product.findById(req.params.id);

        // Product Not Found
        if (!product) {
            return res.status(500).json({ success: false, message: "Product Does't Exists" });
        }

        // Response
        res.status(200).json({ success: true, product })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
})

/////////////////////
// REQUEST -> POST //
/////////////////////

/**
 * @author Omkar Mahangare
 * @desc Add a Product into the Product Record
 * @route POST products/addproduct
 * @access Private
 */
router.post("/addproduct", isAdmin, upload.single("thumbnail"), async (req, res) => {
    try {
        // Request Body Contents
        const { name, category, subCategory, sizes, isIconic } = req.body;
        const thumbnail = req.file.filename || "";

        // Fetch the SubCategoryID
        const subCategoryID = await getSubCategory(category, subCategory);

        // Parse the Stringified Array of Objects
        const size = JSON.parse(sizes)

        // Create a Product
        const product = await Product.create({
            name, thumbnail, sizes: size, isIconic
        })

        // Get the Subcategory and Push the product in SubCategory->products
        const subCategoryrecord = await SubCategory.findById(subCategoryID);
        subCategoryrecord.products.push(product);

        // Save the changes
        product.save();
        subCategoryrecord.save();

        // Response
        return res.status(200).json({ success: true, product });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
})



module.exports = router
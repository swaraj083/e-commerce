/////////////////////////////
// FOR DEVELOPMENT PURPOSE //
/////////////////////////////


///////////////////
// MODULE IMPORT //
///////////////////
const express = require("express");

///////////////////////////
// DATABASE MODEL IMPORT //
///////////////////////////
const Category = require("../database/models/Category");
const SubCategory = require("../database/models/SubCategory");

///////////////////////
// MIDDLEWARE IMPORT //
///////////////////////
const isAdmin = require("../middlewares/isAdmin");


////////////
// ROUTES //
////////////

const router = express.Router();

////////////////////
// REQUEST -> GET //
////////////////////

/**
 * @author Omkar Mahangare
 * @desc Send all Categories 
 * @route GET categories/getAllCategories
 * @access Public
 */
router.get("/getAllCategories",async(req,res)=>{
    try{
        // Fetch All Categories
        const categories = await Category.find();

        // Response
        res.status(200).json({success:true,categories})

    }catch(e){
        res.status(500).json({success:false,error:e.message})
    }
})

/////////////////////
// REQUEST -> POST //
/////////////////////

/**
 * @author Omkar Mahangare
 * @desc Create a Category
 * @route POST categoires/create-category
 * @access Private
 */
router.post("/create-category",isAdmin,async(req,res)=>{
    try{
        // Request Body Contents -> Category Name , List of SubCategory Names
        const {categoryName,subCategoryList} = req.body;

        // Find the Category
        const category = await Category.findOne({categoryName});

        // Category Already Exists
        if(category){
            return res.status(500).json({success:false,error:"Category Already Exists"})
        }

        // List of Array of SubCategories
        let subCategory = [];

        // Create SubCategories 
        for(let i=0;i<subCategoryList.length;i++){
            const newSubCategory = await SubCategory.create({
                subCategoryName:subCategoryList[i],
                products:[],
            });

            // SAve the created SubCategory
            await newSubCategory.save();
            
            // Push the SubCategory Object
            subCategory.push({subCategoryName:subCategoryList[i],subCategoryID:newSubCategory.id});
        }
        
        // Create the Category
        const newCategory = await Category.create({
            categoryName,
            subCategory
        });

        // Save the created Category
        await newCategory.save();

        // Response
        res.status(200).json({success:true,category:newCategory})
    }catch(e){
        res.status(500).json({success:false,error:e.message})
    }
})

module.exports = router;
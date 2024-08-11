///////////////////
// MODULE IMPORT //
///////////////////
const express = require("express");
const fs = require("fs");

///////////////////////////
// DATABASE MODEL IMPORT //
///////////////////////////
const Featured = require("../database/models/Featured");

///////////////////////
// MIDDLEWARE IMPORT //
///////////////////////
const isAdmin = require("../middlewares/isAdmin");

//////////////////
// UTILS IMPORT //
//////////////////
const upload = require("../utils/multer");

////////////
// ROUTES //
////////////

const router = express.Router();

////////////////////
// REQUEST -> GET //
////////////////////
/**
 * @author Omkar Mahangare
 * @desc Get a Featured from its ID
 * @route GET featured/getByID/:id
 * @access public
 */
router.get("/getByID/:id",async(req,res)=>{
    try
    {
        const {id} = req.params;
        const featured = await Featured.findById(id);
        
        if(featured){
            return res.status(200).json({success:true,featured});
        }

        res.status(404).json({success:false,msg:"Featured Not Found"})
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
})

/////////////////////
// REQUEST -> POST //
/////////////////////

/**
 * @author Omkar Mahangare
 * @desc Add a Featured into the Featured Record
 * @route POST featured/add
 * @access Private
 */
router.post("/add", isAdmin, upload.single("thumbnail"), async (req, res) => {
    try {
        // Request Body Contents - Title, Destination Url, Thumbnail
        const { title, destURL } = req.body;
        const thumbnail = req.file.filename || "";

        // Create Featured
        const featured = await Featured.create({
            title, thumbnail, destURL
        });

        // Save in Database
        await featured.save();

        // Response
        res.status(200).json({ success: true, featured })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
})

////////////////////
// REQUEST -> PUT //
////////////////////
/**
 * @author Omkar Mahangare
 * @desc Update a featured using its ID
 * @route PUT featured/update/:id
 * @access Private
 */
router.put("/update/:id",isAdmin,upload.single("thumbnail"),async(req,res)=>{
    try {   
        const {title,destURL} = req.body;
        const {id} = req.params;
        const thumbnail = req.file?.filename || null;
        
        const featured = await Featured.findById(id);

        if(!featured){
            return res.status(404).json({success:false,message:"Featured Not Found"})
        }

        if(title!=featured.title){
            featured.title = title;
        }
        if(destURL!=featured.destURL){
            featured.destURL = destURL;
        }
        if(thumbnail!==null){
            fs.unlink(`./uploads/${featured.thumbnail}`,(err)=>{
                if(err) throw err;
            })
            featured.thumbnail = thumbnail;
        }

        await featured.save();

        res.status(200).json({success:true,featured});
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
})


///////////////////////
// REQUEST -> DELETE //
///////////////////////

/**
 * @author Omkar Mahangare
 * @desc Delete a Featured from the Featured Record
 * @route DELETE featured/remove/:id
 * @access Private
 */
router.delete("/delete/:id", isAdmin, async (req, res) => {
    try {
        // Fetch the Featured
        let featured = await Featured.findById(req.params.id);

        // Featured does not exists
        if (!featured) { return res.status(404).send("Not Found") }

        // Delete 
        fs.unlink(`./uploads/${featured.thumbnail}`,(err)=>{
            if(err) throw err;
        })
        await Featured.findByIdAndDelete(req.params.id);

        //Response
        res.status(200).json({ success: true,id:req.params.id });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
})

module.exports = router;
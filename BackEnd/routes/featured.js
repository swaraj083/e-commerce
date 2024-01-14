///////////////////
// MODULE IMPORT //
///////////////////
const express = require("express");

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

///////////////////////
// REQUEST -> DELETE //
///////////////////////

/**
 * @author Omkar Mahangare
 * @desc Delete a Featured from the Featured Record
 * @route DELETE featured/remove/:id
 * @access Private
 */
router.delete("/remove/:id", isAdmin, async (req, res) => {
    try {
        // Fetch the Featured
        let featured = await Featured.findById(req.params.id);

        // Featured does not exists
        if (!featured) { return res.status(404).send("Not Found") }

        // Delete 
        await Featured.findByIdAndDelete(req.params.id);

        //Response
        res.status(200).json({ success: true });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
})

module.exports = router;
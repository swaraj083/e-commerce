const express = require("express");
const User = require("../database/models/User");
const dotenv = require("dotenv");
const Product = require("../database/models/Product");
const fetchuser = require("../middlewares/fetchuser");
const Transaction = require("../database/models/Transaction");

dotenv.config()
const router = express.Router();

// Not Finished
router.post("/starttransaction/", fetchuser, async (req, res) => {
    try {
        const Razorpay = require('razorpay');
        var instance = new Razorpay({ key_id: process.env.RAZOR_KEY_ID, key_secret: process.env.RAZOR_KEY_SECRET })

        const { amount } = req.body;

        var options = {
            amount,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        instance.orders.create(options, function (err, order) {
            console.log(order);
            res.status(200).json(order);
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})

router.post("/buyproduct", fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        // const user = await User.findById("659708d3ce0fa02ca7765b14");
        const { name, pID, quantity } = req.body;
        const product = await Product.findById(pID);

        const transaction = await Transaction({
            name, pID, quantity
        })

        user.previousTransactions.push(transaction)
        product.previousTransactions.push(transaction)
        product.quantity -= quantity;

        await user.save();
        await product.save();
        await transaction.save();

        res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})

router.get("/getprevioustransactions/", fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({ success: true, transaction: user.previousTransactions })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})

module.exports = router
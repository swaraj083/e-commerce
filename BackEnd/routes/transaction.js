const express = require("express");
const User = require("../database/models/User");
const dotenv = require("dotenv");
const fetchuser = require("../middlewares/fetchuser");
const Transaction = require("../database/models/Transaction");
const Razorpay = require('razorpay');
const crypto = require('crypto')

dotenv.config()
const router = express.Router();

router.get("/getkey/",async(req,res)=>{
    res.send({success:true,key:process.env.RAZOR_KEY_ID})
})

router.post("/generateorder/",async (req, res) => {
    try {
        var instance = new Razorpay({ key_id: process.env.RAZOR_KEY_ID, key_secret: process.env.RAZOR_KEY_SECRET })
        // Add product List
        const { amount,products } = req.body;

        const amt = Number(amount*100)
        let orderID;

        
        var options = {
            amount:amt,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };

        await instance.orders.create(options, function (err, order) {
            console.log(order)
            orderID = order.id;
            console.log(orderID)
            res.status(200).json({success:true,order});
        });
        
        console.log(orderID)
        const transaction = await Transaction.create({products,orderID})
        transaction.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})

router.post("/verification",fetchuser,async(req,res)=>{
    try{const {razorpay_payment_id, razorpay_order_id,razorpay_signature} = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZOR_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

    if (generated_signature == razorpay_signature) {
        let transaction = await Transaction.findOneAndUpdate({orderID:razorpay_order_id},{paymentID:razorpay_payment_id,signature:razorpay_signature});
        transaction.save();
        const user = await User.findById(req.User.id);
        user.previousTransactions.push(transaction);
        user.save();
        // Deduct the number of items from product quantity
        res.redirect( `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`)
    }else{
        res.send({success:false})
    }
}catch (error) {
    return res.status(500).json({ success: false, message: error.message });
}
})

// router.get("/getprevioustransactions/", fetchuser, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);

//         res.status(200).json({ success: true, transaction: user.previousTransactions })
//     } catch (error) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// })

module.exports = router
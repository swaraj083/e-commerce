const express = require("express");
const User = require("../database/models/User");
const dotenv = require("dotenv");
const fetchuser = require("../middlewares/fetchuser");
const Transaction = require("../database/models/Transaction");
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Product = require("../database/models/Product");

dotenv.config()
const router = express.Router();

router.get("/getkey/",async(req,res)=>{
    res.send({success:true,key:process.env.RAZOR_KEY_ID})
})

router.post("/generateorder/",fetchuser,async (req, res) => {
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
            orderID = order.id;
            res.status(200).json({success:true,order});
        });
        
        const transaction = await Transaction.create({products,orderID,userID:req.user.id})
        transaction.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})

router.post("/verification",async(req,res)=>{
    try{
        const {razorpay_payment_id, razorpay_order_id,razorpay_signature} = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZOR_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

    if (generated_signature == razorpay_signature) {
        let transaction = await Transaction.findOneAndUpdate({orderID:razorpay_order_id},{paymentID:razorpay_payment_id,signature:razorpay_signature});
        transaction.save();
        const user = await User.findById(transaction.userID);
        user.previousTransactions.push(transaction);
        user.save();

        // Deduct the number of items from product quantity
        for(let i=0;i<transaction.products.length;i++){
            const product = await Product.findById(transaction.products[i].pID)
            for(let j=0;j<product.sizes.length;j++){
                if(transaction.products[i].size === product.sizes[j].size){
                    product.sizes[j].quantity -= transaction.products[i].quantity;
                }
            }

            await product.save()
        }


        res.redirect( `${process.env.WEBSITE_URL}/paymentsuccess?reference=${razorpay_payment_id}`)
    }else{
        res.status(500).json({success:false})
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
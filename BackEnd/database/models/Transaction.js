const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    products: [
      {
        name: {
          type: String,
          required: true,
        },
        pID: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentID:{
      type:String,
      required:true
    },
    orderID:{
      type:String,
      required:true
    },
    signature:{
      type:String,
      required:true
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transaction", TransactionSchema);

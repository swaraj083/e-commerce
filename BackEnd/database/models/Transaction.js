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
        size:{
          type:String,
          required:true
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentID:{
      type:String,
      default:""
    },
    orderID:{
      type:String,
      default:""
    },
    signature:{
      type:String,
      default:""
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transaction", TransactionSchema);

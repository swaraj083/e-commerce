const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    sizes: [
      {
        size: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
        }
      }
    ],
    category:{
      type:String,
      required:true
    },
    gender:[
      {
        type:String,
        required:true
      }
    ],
    category:{
      type:String,
      required:true
    },
    isIconic: {
      type: Boolean,
      default: false
    },
    isSports: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", ProductSchema);

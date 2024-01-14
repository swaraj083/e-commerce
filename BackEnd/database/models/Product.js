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
    isIconic: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", ProductSchema);

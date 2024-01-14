const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

// console.log(process.env.DATABASE_URL)

const connectToMongo = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
};

module.exports = connectToMongo;

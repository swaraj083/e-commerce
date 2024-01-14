const mongoose = require("mongoose");

const FeaturedSchema = new mongoose.Schema({
    "title": String,
    "thumbnail": String,
    "destURL": String
});

module.exports = mongoose.model("Featured", FeaturedSchema);
///////////////////
// MODULE IMPORT //
///////////////////
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

///////////////////////////
// DATABASE MODEL IMPORT //
///////////////////////////
const User = require("../database/models/User");



dotenv.config();


////////////
// ROUTES //
////////////

const router = express.Router();

/////////////////////
// REQUEST -> POST //
/////////////////////

/**
 * @author Omkar Mahangare
 * @desc Create a new User
 * @route POST users/createuser
 * @access Public
 */
router.post("/createuser", async (req, res) => {
  try {
    // Request Body Contents
    const { firstName, lastName, email, mobile, password, address, landmark, city, state, country, pincode } = req.body;

    // User Already Exists
    if (await User.findOne({ email })) {
      console.log("User Already exits")
      return res.status(400).json({ success: false, msg: "User already exists" });
    }

    // Password Encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = new User({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword,
      address,
      landmark,
      city,
      state,
      country,
      pincode
    });

    // Save in Database
    user.save();

    // AuthToken
    let data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = await jwt.sign(data, process.env.SECRET_TOKEN);

    // Response
    return res.status(200).json({
      success: true, authtoken, userInfo: {
        firstName,
        lastName,
        email,
        mobile,
        address,
        landmark,
        city,
        state,
        country,
        pincode,
        isAdmin: user.isAdmin,
        previousTransaction: user.previousTransactions
      }
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

/**
 * @author Omkar Mahangare
 * @desc Login User
 * @route POST users/login
 * @access Public
 */
router.post("/login", async (req, res) => {
  try {
    // Request Body Contents
    const { email, password } = req.body;

    // Fetch User from Database
    const user = await User.findOne({ email });

    // User Does not Exists
    if (!user) {
      return res.json({ success: false, msg: "Invalid Credentials" });
    }

    // Hashed Password Check
    const comparepassword = await bcrypt.compare(password, user.password);

    // Password Does not match
    if (!comparepassword) {
      return res.json({ success: false, error: "Invalid Credentials" });
    }

    // AuthToken
    let data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = await jwt.sign(data, process.env.SECRET_TOKEN);

    // Response
    const userInfo = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      address: user.address,
      landmark: user.landmark,
      city: user.city,
      state: user.state,
      country: user.country,
      pincode: user.pincode,
      isAdmin: user.isAdmin,
      previousTransaction: user.previousTransactions
    }

    return res.status(200).json({
      success: true, authtoken, userInfo
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/", (req, res) => {
  return res.send("Login");
});

module.exports = router;

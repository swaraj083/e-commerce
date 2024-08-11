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
const ResetPasswordLink = require("../database/models/ResetPasswordLink");

const fetchuser = require("../middlewares/fetchuser");
const isAdmin = require("../middlewares/isAdmin");



dotenv.config();


////////////
// ROUTES //
////////////

const router = express.Router();

////////////////////
// REQUEST -> GET //
////////////////////

/**
 * @author Omkar Mahangare
 * @desc Get All Users
 * @route GET users/get-users
 * @access Private
 */
router.get("/get-users",isAdmin,async(req,res)=>{
  try {
    const allUsers = await User.find();
    let users = [];

    if(!allUsers){
      return res.status(200).json({success:true,users})
    }

    for(let i=0;i<allUsers.length;i++){
      const {id,firstName,lastName,email,isAdmin} = allUsers[i];

      users.push({id,firstName,lastName,email,isAdmin})
    }

    res.status(200).json({success:true,users})
  } catch (e) {
    return res.status(500).json({ success:false, message: e.message });
  }
})

/**
 * @desc Reset Password Link
 * @route GET users/reset-password-link
 * @access Public
 */
router.get("/reset-password-link/:email",async(req,res)=>{
  try {
      // Request Body Contents
      const {email} = req.params;

      // Find the User to check whether user exists
      const user = await User.findOne({email});

      if(!user){
          return res.json({success:false,msg:"User Does not Exists"});
      }

      // Create a reset Link
      const resetlink = await ResetPasswordLink.create({
          userID:user.id,
      });

      await resetlink.save();

      // Send a mail to user
      await sendLink(email,resetlink.id);
      
      // Send the response
      res.status(200).json({success:true})
  } catch (error) {
      return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
})

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
      return res.status(400).json({ success: false, msg: "User already exists" });
    }

    // Password Encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
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
        id:user.id,
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
      id:user.id,
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

////////////////////
// REQUEST -> PUT //
////////////////////

/**
 * @author Omkar Mahangare
 * @desc Update User details
 * @route POST users/updateuser
 * @access Public
 */
router.put("/update-user/:id",fetchuser,async(req,res)=>{
  try {
    const id = req.user.id;
    const {firstName, lastName, email, mobile, address, landmark, city, state, country, pincode} = req.body;
    const data = {};

    if(firstName!==undefined){
      data.firstName = firstName;
    }
    if(lastName!==undefined){
      data.lastName = lastName;
    }
    if(email!==undefined){
      data.email = email;
    }
    if(mobile!==undefined){
      data.mobile = mobile;
    }
    if(address!==undefined){
      data.address = address;
    }
    if(landmark!==undefined){
      data.landmark = landmark;
    }
    if(city!==undefined){
      data.city = city;
    }
    if(state!==undefined){
      data.state = state;
    }
    if(country!==undefined){
      data.country = country;
    }
    if(pincode!==undefined){
      data.pincode = pincode;
    }


    let user = await User.findByIdAndUpdate(id,data);

    await user.save();

    const userInfo = {
      id:user.id,
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

    res.json({success:true,userInfo})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
})

/**
* @desc Reset Password
* @route PUT users/reset-password/:id
* @access Public
*/
router.put("/reset-password/:id",async(req,res)=>{
  try {
      // Get ResetPasswordLink's id
      const {id} = req.params;

      // Request Body contents
      const {password} = req.body;

      // Check whether the link is valid
      const resetlink = await ResetPasswordLink.findById(id);

      if(!resetlink){
          return res.json({success:false,msg:"Link is not valid"});
      }

      // Hash the Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Update User
      let user = await User.findByIdAndUpdate(resetlink.userID,hashedPassword);
      user.save();

      // Delete the resetlink record from database
      await ResetPasswordLink.findByIdAndDelete(id);

      // Response
      res.status(200).json({success:true});
  } catch (error) {
      return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
})


module.exports = router;

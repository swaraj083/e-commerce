const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const User = require('../database/models/User');

dotenv.config()

class MyError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}


const isAdmin = async(req, res, next) => {
    const token = req.header('authtoken')

    if (!token) {
        res.status(401).json({ success:false,error: "Please authenticate using a valid token" })
    }

    try {
        const data = await jwt.verify(token, process.env.SECRET_TOKEN)
        const isAdmin = await User.findById(data.user.id)

        if (isAdmin.isAdmin) {
            req.user = data.user;
            next()
        }
        else {
            throw new MyError("Not Admin");
        }
    } catch (error) {
        res.status(401).json({ success:false, error: "Please authenticate using a valid token" })
    }
}

module.exports = isAdmin
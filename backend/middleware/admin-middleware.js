const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");


let adminMiddleWare = async (req, res, next) => {
    try {
        let isAdmin = req.user.isAdmin;

        if (!isAdmin) {
            return res.status(403).json({ meesage: "Accees denied  , User is not admin" })
        }
        next() ; 
    } catch (error) {
        next(error);
    }
}

module.exports = adminMiddleWare;

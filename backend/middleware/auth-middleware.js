const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");


let authMiddleWare = async (req, res, next) => {
    let token_fromFrontend = req.header("Authorization");


    // this token is Bearer <Token>

    if (!token_fromFrontend) {
        res.status(500).json({ error: "token from frontend is not provided" });
    }

    let jwtToken_afterRemoveBearer = token_fromFrontend.replace("Bearer ", "").trim();


    try {

        let isVerify = jwt.verify(jwtToken_afterRemoveBearer, process.env.JWT_SECRET_KEY);

        let userData = await User.findOne({ email: isVerify.email }).select({
            password : 0 , 
        })


        req.user = userData  ; 
        req.jwtToken = token_fromFrontend ; 
        req.userId = userData._id

        console.log(userData)


        next();
    } catch (error) {
        res.status(500).json({ error: "invalid token" });

    }


}

module.exports = authMiddleWare;

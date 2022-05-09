const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel");

dotenv.config();

async function auth(req, res, next){
    try{
        let verifiedUser = await jwt.verify(req.cookies.ljwt, process.env.SECRET_KEY);

        try{
            let foundUser = await User.findOne({ email : verifiedUser.email });
            
            if(verifiedUser && foundUser){
                req.isAuth = true;
                req.user = verifiedUser;
                req.token = req.cookies.ljwt;
            }
            else{
                res.clearCookie("ljwt");
                req.isAuth = false;
            }
        }
        catch(error){
            console.log(error);
        }
    }catch(error){
        req.isAuth = false;
    }
    
    next();
}

module.exports = auth;
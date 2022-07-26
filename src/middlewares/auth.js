const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel");

dotenv.config();

async function auth(req, res, next){
    try{
        let verifiedUser = await jwt.verify(req.cookies.ljwt, process.env.SECRET_KEY);

        console.log(verifiedUser.email)
        try{
            let foundUser = await User.findOne({ email : verifiedUser.email });
            console.log(foundUser.email)
            if(verifiedUser && foundUser){
                req.isAuth = true;
                req.user = foundUser;
                req.token = req.cookies.ljwt;
            }
            else{
                res.clearCookie("ljwt");
                req.isAuth = false;
            }
        } catch(error){
            req.isAuth = false;
        }
    }catch(error){
        req.isAuth = false;
    }
    next();
    console.log(req.isAuth, "hello")
}

module.exports = auth;
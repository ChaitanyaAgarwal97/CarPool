const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

async function auth(req, res, next){
    try{
        let verifiedUser = await jwt.verify(req.cookies.ljwt, process.env.SECRET_KEY);
        req.isAuth = true;
        req.user = verifiedUser;
        req.token = req.cookies.ljwt;
    }catch(error){
        req.isAuth = false;
    }
    
    next();
}

module.exports = auth;
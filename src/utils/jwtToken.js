const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

async function generateToken(payload){
    try{
        let token = await jwt.sign(payload, process.env.SECRET_KEY);
        return token;
    }catch(error){
        throw error;
    }

}

module.exports = generateToken;
const User = require("../models/userModel");

async function userAdd(username, email, password){
    const newUser = new User({username, email, password});
    
    try{
        let user = await newUser.save();
        return user;
    }
    catch(error){
        throw error;
    }
}

module.exports = userAdd;
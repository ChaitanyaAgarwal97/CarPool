const User = require("../models/userModel");

async function foundBy(credential){
    let user = await User.findOne(credential);
    return user;
}

module.exports = foundBy;
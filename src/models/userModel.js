const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
require("../db/conn");

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: Number,
        unique: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]
});

UserSchema.pre("save", async function (next){
    if(this.isModified("password")){
        try{
            this.password = await bcryptjs.hash(this.password, 10);
            next();
        }
        catch(error){
            throw error;
        }
    }
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
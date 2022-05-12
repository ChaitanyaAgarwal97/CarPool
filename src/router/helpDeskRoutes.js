const express = require("express");
const dotenv = require("dotenv");
const Help = require("../models/helpDeskModel");
const jwt = require("jsonwebtoken");

dotenv.config();

let router = express.Router();

router.post("/helpDeskSubmit", async (req, res) => {
    try{
        let verifiedUser = await jwt.verify(req.cookies.ljwt, process.env.SECRET_KEY);

        const email = verifiedUser.email;
        const help = req.body.help;

        try{
            const helpNeeded = Help({
                email: email,
                help: help
            });

            await helpNeeded.save();

            console.log("Help saved");
            
            res.redirect("/helpDesk");
        }catch(error){
            throw error;
        }

    }catch(error){
        console.log(error);

    }
});

module.exports = router;
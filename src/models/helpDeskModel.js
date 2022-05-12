const mongoose = require("mongoose");
require("../db/conn");

const HelpDeskSchema = new mongoose.Schema({
    email: {
        type: String,
        nullable: false
    },
    help: {
        type: String,
        nullable: false 
    }
});

const HelpDeskModel = new mongoose.model("feedback", HelpDeskSchema);

module.exports = HelpDeskModel;
const express = require("express");
const auth = require("../middlewares/auth");

let router = express.Router();

// Routes
router.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.log(error);
  }
});

router.get("/loginSignup", auth,async (req, res) => {
  if(req.isAuth){
    res.redirect("myProfile");
  }

  try {
    res.render("loginSignup");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
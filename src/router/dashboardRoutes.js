const express = require("express");
const { readSync } = require("fs");
const auth = require("../middlewares/auth");
const User = require("../models/userModel");
const generateToken = require("../utils/jwtToken");

let router = express.Router();

// Routes
router.get("/myProfile", auth, async (req, res) => {
  console.log(req.user.name)
  if (req.isAuth) {
    try {
      if(req.query.isUpdated === undefined){
        msg_type= "";
        msg_head= "";
        msg_body= "";
      }
      else if(!req.query.isUpdated){
        msg_type= "danger";
        msg_head= "Some error occured! :";
        msg_body= "There was some error. Please try again.";
      }
      else{
        msg_type= "success";
        msg_head= "Account Updated! :";
        msg_body= "Your account has been updated successfully.";
      }

      res.render("myProfile", {
        msg_type,
        msg_body,
        msg_head,
        name: req.user.name,
        userName: req.user.username,
        email: req.user.email,
        phone: req.user.phone
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).render("index", {
      msg_type: "danger",
      msg_head: "Invalid access! ",
      msg_body:
        "Please log in with your correct log in credentials first before accessing this page.",
    });
  }
});

router.get("/carpoolForm", auth, async (req, res) => {
  if (req.isAuth) {
    try {
      res.render("carpoolform");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).render("index", {
      msg_type: "danger",
      msg_head: "Invalid access! ",
      msg_body:
        "Please log in with your correct log in credentials first before accessing this page.",
    });
  }
});

router.get("/filter", auth, async (req, res) => {
  if (req.isAuth) {
    try {
      res.render("filter");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).render("index", {
      msg_type: "danger",
      msg_head: "Invalid access! ",
      msg_body:
        "Please log in with your correct log in credentials first before accessing this page.",
    });
  }
});

router.get("/helpDesk", auth, async (req, res) => {
  if (req.isAuth) {
    try {
      res.render("helpDesk");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).render("index", {
      msg_type: "danger",
      msg_head: "Invalid access! ",
      msg_body:
        "Please log in with your correct log in credentials first before accessing this page.",
    });
  }
});

router.post("/myProfile", auth, async (req, res) => {
  if (req.isAuth) {
    console.log(req.isAuth)
    try {
        let user = await User.findOneAndUpdate({ username: req.user.username }, req.body, {new: true});

        let token = await generateToken({ email : req.body.email });
        
        user.tokens = [ { token } ];
  
        await user.save();
        
        res.status(200).cookie("ljwt", token, {
          maxAge: 2592000000,
          overwrite: true
        }).redirect("/myProfile?isUpdated=" + encodeURIComponent(true));
    } catch (error) {
      res.status(200).redirect("/myProfile?isUpdated=" + encodeURIComponent(false));
    }
  } else {
    res.status(400).render("index", {
      msg_type: "danger",
      msg_head: "Invalid access! ",
      msg_body:
        "Please log in with your correct log in credentials first before accessing this page.",
    });
  }
});

module.exports = router;

const bcrypt = require("bcryptjs");
const userAdd = require("../controllers/user");
const foundBy = require("../utils/credentialsValidity");
const generateToken = require("../utils/jwtToken");
const User = require("../models/userModel");
const express = require("express");
const auth = require("../middlewares/auth");

let router = express.Router();

// Routes
router.post("/signUp", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirm_password;

  if (password === confirmPassword && password.length >= 8) {
    let byEmail = await foundBy({ email });
    let byUsername = await foundBy({ username });
    if (!byEmail && !byUsername) {
      try {
        registeredUser = await userAdd(username, email, password);
        res.render("loginSignup", {
          msg_type: "success",
          msg_head: "Account Created!",
          msg_body: "Your account has been created. Now you can login.",
        });
      } catch (error) {
        res.status(500).render("loginSignup", {
          msg_type: "danger",
          msg_head: "Something went wrong!",
          msg_body:
            "There was a problem in creating your account. Please try again.",
        });
      }
    } else {
      res.status(400).render("loginSignup", {
        msg_type: "danger",
        msg_head: "Invalid credentials!",
        msg_body: "Email or username already exists. Try with a different one.",
      });
    }
  } else {
    res.status(400).render("loginSignup", {
      msg_type: "danger",
      msg_head: "Invalid credentials!",
      msg_body:
        "Password must be more than 8 in length and both the fields must match.",
    });
  }
});

router.post("/logIn", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  try {
    let userFound = await foundBy({ email });
    if (userFound) {
      try {
        let passwordVerified = await bcrypt.compare(
          password,
          userFound.password
        );
        if (passwordVerified) {
          try {
            // generating token
            let token = await generateToken({ email });

            // Adding token to database
            userFound.tokens.push({ token });
            await userFound.save();

            // adding token to cookies
            res
              .cookie("ljwt", token, {
                maxAge: 2592000000,
              })
              .redirect("/myProfile");
          } catch (error) {
            res.status(500).render("loginSignup", {
              msg_type: "danger",
              msg_head: "Something went wrong!",
              msg_body: "There was a problem. Please try again.",
            });
          }
        } else {
          res.status(400).render("loginSignup", {
            msg_type: "danger",
            msg_head: "Invalid credentials !",
            msg_body: "Please enter valid credentials and try again.",
          });
        }
      } catch (error) {
        res.status(500).render("loginSignup", {
          msg_type: "danger",
          msg_head: "Something went wrong!",
          msg_body: "There was a problem. Please try again.",
        });
      }
    } else {
      res.status(400).render("loginSignup", {
        msg_type: "danger",
        msg_head: "Invalid credentials !",
        msg_body: "Please enter valid credentials and try again.",
      });
    }
  } catch (error) {
    res.status(500).render("loginSignup", {
      msg_type: "danger",
      msg_head: "Something went wrong!",
      msg_body: "There was a problem. Please try again.",
    });
  }
});

router.get("/logOut", auth, async (req, res) => {
  if (req.isAuth) {
    email = req.user.email;

    try {
      let userFound = await User.findOne({ email });

      userFound.tokens = userFound.tokens.filter((ele) => {
        return ele.token != req.token;
      });

      try {
        await userFound.save();
      } catch (error) {
        throw error;
      }

      res.clearCookie("ljwt");

      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.status(500).redirect("/myProfile");
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

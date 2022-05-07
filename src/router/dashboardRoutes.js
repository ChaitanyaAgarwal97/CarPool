const express = require("express");
const auth = require("../middlewares/auth");

let router = express.Router();

// Routes
router.get("/myProfile", auth, async (req, res) => {
  if (req.isAuth) {
    try {
      res.render("myProfile");
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

module.exports = router;

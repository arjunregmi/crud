const express = require("express");
const session = require("express-session");
const router = express.Router();

var redirectHome = (req, res, next) => {
  if (req.session.id) {
    res.redirect("/users/home");
  } else {
    next();
  }
};

//setup session and flash
router.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
    maxAge: 600000000,
    cookie: { maxAge: 60000000 }
  })
);

//mainlayout
router.get("/", (req, res, next) => {
  res.render("index", { layout: "anotherLay" });
});

module.exports = router;

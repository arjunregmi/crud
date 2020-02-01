const express = require("express");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const router = express.Router();

const registerController = require("../controllers/register");

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

//database connection
const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "login"
});

// passport midleware
router.use(passport.initialize());
router.use(passport.session());

router.use(flash());

//helper to check if user is logged in
var isUserLoggedIn = (req, res, next) => {
  if (!req.session.userid) {
    req.flash("error_msg", "Please login first!");
    res.redirect("/users/login");
  } else {
    next();
  }
};

//register page
router.get("/register", registerController.registerPage);

//register handle
router.post(
  "/register",
  passport.authenticate("local-signup", {
    failureRedirect: "/register",
    successRedirect: "/users/login",
    session: false
  })
);

//login page
router.get("/login", (req, res) => {
  res.render("login", { layout: "anotherLay" });
});

//login handle
router.post(
  "/login",
  passport.authenticate("local-login", {
    failureRedirect: "/users/login",
    successRedirect: "home",
    session: false
  })
);

//load home
router.get("/home", isUserLoggedIn, (req, res) => {
  const insertPost = "SELECT * FROM studentinfo";
  con.query(insertPost, (error, results) => {
    if (error) throw error;

    // results.forEach(post => {
    //   var firstname = post.firstname;
    //   post.firstname = firstname;
    // });
    res.render("home", { posts: results });
  });
});

//studentRegister
router.get("/studentReg", isUserLoggedIn, (req, res) => {
  res.render("studentReg");
});

router.post("/studentReg", (req, res) => {
  var firstname = req.body.firstname;
  var middlename = req.body.middlename;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var address = req.body.address;
  var college = req.body.college;
  var faculty = req.body.faculty;
  var image = req.files.image;
  var imageName = image.name;

  image.mv("./public/uploads/" + imageName, error => {
    if (error) throw error;

    var post = {
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      address: address,
      email: email,
      college: college,
      faculty: faculty,
      image: imageName
    };

    con.query("insert into studentinfo set ?", post, (error, result) => {
      if (error) throw error;
      req.flash("success_msg", "Student Info Added Successfully!");
      res.redirect("/users/home");
    });
  });
});

router.get("/studentDetails/:id", isUserLoggedIn, (req, res) => {
  con.query("SELECT * FROM studentinfo WHERE id= ?", req.params.id, function(
    error,
    results
  ) {
    if (error) return error;
    res.render("studentDetails", { results: results[0] });
  });
});

router.get("/deleteStudentReg/:id", isUserLoggedIn, (req, res) => {
  var deletePost = "DELETE FROM studentinfo WHERE id=?";
  con.query(deletePost, req.params.id, (error, results) => {
    if (error) throw error;
    req.flash("success_msg", "Student Info Deleted Successfully!");
    res.redirect("/users/home");
  });
});

router.get("/editStudentReg/:id", (req, res) => {
  var selectPost = "SELECT * FROM studentinfo WHERE id= ?";
  con.query(selectPost, req.params.id, (error, results) => {
    if (error) throw error;
    res.render("editStudentReg", { results: results[0] });
  });
});

router.post("/editStudentReg/:id", (req, res) => {
  var firstname = req.body.firstname;
  var middlename = req.body.middlename;
  var lastname = req.body.lastname;
  var address = req.body.address;
  var email = req.body.email;
  var college = req.body.college;
  var faculty = req.body.faculty;

  var image = req.files.image;
  var imageName = image.name;

  image.mv("./public/uploads/" + imageName, error => {
    if (error) throw error;

    var edit =
      "UPDATE studentinfo SET firstname=?,middlename=?,lastname=?,email=?,address=?,college=?,faculty=?,image=? where id= ?";
    con.query(
      edit,
      [
        firstname,
        middlename,
        lastname,
        email,
        address,
        college,
        faculty,
        imageName,
        req.params.id
      ],
      (error, results, fields) => {
        if (error) {
          con.rollback();
          throw error;
        } else {
          req.flash("success_msg", "Student Info Edited Successfully!");
          res.redirect("/users/home");
        }
      }
    );
  });
});

// Logout handle
router.get("/logout", isUserLoggedIn, (req, res) => {
  req.flash("error_msg", "You are Logout Successfully!");
  req.session.destroy();
  // req.logout();

  res.redirect("/users/login");
});

module.exports = router;

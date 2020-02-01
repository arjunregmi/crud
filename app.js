const express = require("express");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
var fileupload = require("express-fileupload");
const path = require("path");

const app = express();

const routes = require("./routes/index");
const users = require("./routes/users");
require("./config/passport")(passport);

// Express body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

//using express file upload
app.use(fileupload());

//importing handlebars
var exphbs = require("express-handlebars");

//default template engine
app.set("view engine", ".hbs");
app.engine(".hbs", exphbs({ defaultLayout: "layout", extname: ".hbs" }));

//setup session and flash
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
    maxAge: 600000000,
    cookie: { maxAge: 60000000 }
  })
);

// passport midleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

//database connection
const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "login"
});
con.connect(error => {
  if (error) throw error;
  console.log("Database connnected....");
});

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.signupMessage = req.flash("signupMessage");
  res.locals.id = req.session.id;
  res.locals.name = req.session.name;
  next();
});

app.use("/", routes);
app.use("/users", users);

// app.use((req, res, next) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.hbs"));
// });
app.use((req, res, next) => {
  res.status(404).render("404.hbs", { layout: "anotherLay" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

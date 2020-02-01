const passport = require("passport");
const session = require("express-session");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const joi = require("joi");

const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "login"
});

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    con.query("select * from register where id=?", id, (error, rows) => {
      done(error, rows);
    });
  });

  passport.use(
    "local-signup",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        const schema = joi.object().keys({
          name: joi
            .string()
            .trim()
            .required(),
          email: joi
            .string()
            .trim()
            .email()
            .required(),
          password: joi
            .string()
            .min(5)
            .max(15)
            .required(),
          password2: joi
            .string()
            .min(5)
            .max(15)
            .required()
        });
        joi.validate(req.body, schema, (err, result) => {
          if (err) throw err;
        });
        con.query(
          "select * from register where email=?",
          email,
          (error, rows) => {
            console.log(rows);
            if (error) return done(error);
            if (rows.length) {
              return done(
                null,
                false,
                req.flash("signupMessage", "That email is already taken")
              );
            } else {
              // var newUser = new Object();
              bcrypt.hash(req.body.password, 10, (error, hash) => {
                var name = req.body.name;
                var email = req.body.email;
                var password = hash;
                var data = { name, email, password };

                var insertQuery = "insert into register set ?";
                con.query(insertQuery, data, (error, rows) => {
                  //  newUser.id=rows.insertId;
                  req.flash("error_msg", "You are successfully register");
                  return done(null, data);
                });
              });
            }
          }
        );
      }
    )
  );
};

passport.use(
  "local-login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      con.query(
        "select * from register where email=?",
        [email],
        (error, rows) => {
          console.log(rows);
          if (error) return done(error);
          if (!rows.length) {
            return done(null, false, req.flash("error_msg", "No user found"));
          }
          bcrypt.compare(password, rows[0].password, (error, result) => {
            console.log(result);
            if (result == false) {
              return done(
                null,
                false,
                req.flash("error_msg", "OOPs ! Wrong password")
              );
            } else {
              req.session.userid = rows[0].id;
              req.session.name = rows[0].name;

              req.flash("success_msg", "You are successfully login");
              return done(null, rows[0]);
            }
          });
        }
      );
    }
  )
);

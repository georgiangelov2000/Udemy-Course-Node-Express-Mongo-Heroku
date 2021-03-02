const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../model/usermodel");

const crypto = require("crypto");
const async = require("async");
const nodemailer = require("nodemailer");

//Check if user is authenticated
function isAuthenticatedUser(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Please Login first access this page.");
  res.redirect("/login");
}

//Get Routes

/*
router.get('/',(req,res)=>{
    res.render('login')
});
*/

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/dashboard", isAuthenticatedUser, (req, res) => {
  res.render("dashboard");
});

router.get("/logout", isAuthenticatedUser, (req, res) => {
  req.logOut();
  req.flash("success_msg", "You have been logged out");
  res.redirect("/login");
});

router.get("/forgot", (req, res) => {
  res.render("forgot");
});

router.get("/password/change", isAuthenticatedUser, (req, res) => {
  res.render("changepassword");
});

//reset password of the current User
router.get("/reset/:token", (req, res) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        req.flash(
          "error_msg",
          "Password reset token is invalid or has been expired."
        );
        res.redirect("/forgot");
      }
      res.render("newpassword", {
        token: req.params.token,
      });
    })
    .catch((error) => {
      req.flash("error_msg", "Error:" + error);
      res.redirect("/forgot");
    });
});

//Post Routes

//Post Login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: "Invalid email or password. Try again !!!",
  })
);

//Create user
router.post("/signup", (req, res) => {
  let { name, email, password } = req.body;
  let userData = {
    name: name,
    email: email,
  };
  User.register(userData, password, (err, user) => {
    if (err) {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/signup");
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success_msg", "Account created successfully");
      res.redirect("/login");
    });
  });
});

//Router to handle forgot password
router.post("/forgot", (req, res, next) => {
  async.waterfall(
    [
      (done) => {
        crypto.randomBytes(20, (error, buffer) => {
          let token = buffer.toString("hex");
          done(error, token);
        });
      },
      (token, done) => {
        User.findOne({
          email: req.body.email,
        })
          .then((user) => {
            if (!user) {
              req.flash("error_msg", "User does not exist with this email.");
              return res.redirect("/forgot");
            }
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 1800000;

            user.save((error) => {
              done(error, token, user);
            });
          })
          .catch((error) => {
            req.flash("error_msg", "ERROR: " + error);
            res.redirect("/forgot");
          });
      },
      (token, user) => {
        let smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
          },
        });
        let mailOptions = {
          to: user.email,
          from: "George Angelov georgebelozemeca@gmail.com",
          subject: "Recovery Email from Auth Project",
          text:
            "Please click the following link to recover your passoword: \n\n" +
            "http://" +
            req.headers.host +
            "/reset/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email.",
        };
        smtpTransport.sendMail(mailOptions, (error) => {
          req.flash(
            "success_msg",
            "Email send with further instructions. Please check that."
          );
          res.redirect("/forgot");
        });
      },
    ],
    (error) => {
      if (error) res.redirect("/forgot");
    }
  );
});

//Reset forgot password
router.post("/reset/:token", (req, res) => {
  async.waterfall(
    [
      (done) => {
        User.findOne({
          resetPasswordToken: req.params.token,
          resetPasswordExpires: { $gt: Date.now() },
        })
          .then((user) => {
            if (!user) {
              req.flash(
                "error_msg",
                "Password reset token is invalid or has been expired."
              );
              res.redirect("/forgot");
            }
            if (req.body.password !== req.body.confirmpassword) {
              req.flash("error_msg", "Password don't match.");
              return res.redirect("/forgot");
            }
            user.setPassword(req.body.password, (error) => {
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;

              user.save((error) => {
                req.logIn(user, (error) => {
                  done(user, error);
                });
              });
            });
          })
          .catch((error) => {
            req.flash("error_msg", "Error:" + error);
            res.redirect("/forgot");
          });
      },
      (user) => {
        let smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
          },
        });
        let mailOptions = {
          to: user.email,
          from: "George Angelov georgebelozemeca@gmail.com",
          subject: "Your Password is changed.",
          text: `Hello, ${user.name}\n\n This is the confirmation email that the password for your account ${user.email} has been changed . `,
        };
        smtpTransport.sendMail(mailOptions, (error) => {
          req.flash(
            "success_msg",
            "Your password has been changed successfully."
          );
          res.redirect("/login");
        });
      },
    ],
    (error) => {
      res.redirect("/login");
    }
  );
});

// change password
router.post("/password/change", (req, res) => {
  if (req.body.password !== req.body.confirmpassword) {
    req.flash("error_msg", "Password dont match. Try again.");
    return res.redirect("/password/change");
  }else if(req.body.password.length < 4 || req.body.confirmpassword < 4){
    req.flash("error_msg", "The password must be longer");
    return res.redirect("/password/change");
  }
  User.findOne({ email: req.user.email }).then((user) => {
    user.setPassword(req.body.password, (err) => {
      user
        .save()
        .then((user) => {
          req.flash("success_msg", "Password chanded succesfully/");
          res.redirect("/dashboard");
        })
        .catch((error) => {
          req.flash("error_msg", "Error:" + error);
          res.redirect("/password/change");
        });
    });
  });
});

module.exports = router;

var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

const { User } = require("../db").models;
const { isAuthenticated } = require("../middleware/auth");

/* GET users listing. */
router.get("/", isAuthenticated, function(req, res, next) {
  User.findAll().then(users => {
    res.json({ users });
  });
});

router.post("/login", function(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) return next(new Error("Wrong credentials"));

      if (user.password !== password) {
        return next(new Error("Wrong credentials"));
      }

      delete user.dataValues.password;
      const token = jwt.sign({ userId: user.id }, "mysecretkey");
      res.json({ user, token: "Bearer " + token });
    })
    .catch(err => {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      return next(err);
    });
});

router.delete("/:id", isAuthenticated, function(req, res, next) {
  const userId = req.params.id;

  User.destroy({ where: { id: userId } })
    .then(user => {
      res.json({
        success: true,
        message: "user " + user + " deleted successfully"
      });
    })
    .catch(err => {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      return next(err);
    });
});

router.post("/signup", function(req, res, next) {
  const { firstName, lastName, email, phoneNo, password } = req.body;

  User.findOne({ where: { email: email } })
    .then(user => {
      if (user) {
        res.json({
          success: false,
          message: "email address already exists in database"
        });
      } else {
        User.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNo: phoneNo,
          password: password
        })
          .then(user => {
            console.log("User added successfully: " + user);
            res.json({
              success: true,
              message: "User added successfully: " + user
            });
          })
          .catch(err => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
            return next(err);
          });
      }
    })

    .catch(err => {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      return next(err);
    });
});

router.get("/:id", function(req, res, next) {
  userId = req.params.id;

  User.findOne({ where: { id: userId } })
    .then(user => {
      res.json({ success: true, user: user });
    })
    .catch(err => {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      return next(err);
    });
});

router.put("/:id/resetPassword", isAuthenticated, function(req, res, next) {
  const userId = req.params.id;
  const { newPassword } = req.body;
  User.update({ password: newPassword }, { where: { id: userId } })
    .then(user => {
      res.json({
        success: true,
        message: "password successfully changed for " + user
      });
    })
    .catch(err => {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      return next(err);
    });
});

router.post("/", function(req, res, next) {
  const { firstName, lastName, email, phoneNo, password } = req.body;

  User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNo: phoneNo,
    password: password
  }).then(user => {
    console.log("User successfully added: " + user);
    res.json({ user });
  });
});

module.exports = router;

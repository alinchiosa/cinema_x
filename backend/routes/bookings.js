var express = require("express");
var router = express.Router();
const { isAuthenticated } = require("../middleware/auth");

const { Booking } = require("../db").models;

router.get("/", function(req, res, next) {
  Booking.findAll()
    .then(bookings => {
      res.json({ bookings });
    })
    .catch(err => {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      res.json({ success: false, message: err });
      return next(err);
    });
});

router.post("/add", isAuthenticated, function(req, res, next) {
  const { userId, screeningId, seatId } = req.body;
  Booking.create({
    userId: userId,
    screeningId: screeningId,
    seatId: seatId
  })
    .then(booking => {
      console.log("Booking created successfully " + booking);
      res.json({ booking });
    })
    .catch(err => {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      res.json({ success: false, message: err });
      return next(err);
    });
});

router.get("/get/:userId", isAuthenticated, function(req, res, next) {
  const userId = req.params.userId;
  Booking.findAll({ where: { userId: userId } })
    .then(bookings => {
      res.json({ bookings });
    })
    .catch(err => {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      res.json({ success: false, message: err });
      return next(err);
    });
});

module.exports = router;

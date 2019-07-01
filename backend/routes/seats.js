var express = require("express");
var router = express.Router();

const { Seat, Room, Booking } = require("../db").models;

router.get("/", function(req, res, next) {
  Seat.findAll().then(seats => {
    res.json({ seats });
  });
});

router.post("/add", function(req, res, next) {
  const { roomId } = req.body;
  Room.findOne({ where: { id: roomId } }).then(room => {
    console.log(room.dataValues);
    for (i = 0; i < room.dataValues.noOfRows; i++) {
      for (j = 1; j <= 10; j++) {
        Seat.create({
          seatNo: j,
          seatRow: i,
          seatType: "normal",
          roomId: roomId
        }).then(seat => console.log("Seats added for room " + roomId));
      }
    }
    res.json({ success: true, message: "seats added for room " + roomId });
  });
});

router.get("/available", function(req, res, next) {
  const { roomId, screeningId } = req.query;
  Promise.all([
    Seat.findAll({ where: { roomId } }),
    Booking.findAll({ where: { screeningId } })
  ])
    .then(([seatList, bookingList]) => {
      seatList = seatList.filter(seat => {
        return !bookingList.find(booking => booking.seatId === seat.id);
      });

      return res.json({ seatList });
    })
    .catch(err => {
      return next(err);
    });
});

router.get("/:id", function(req, res, next) {
  const seatId = req.params.id;
  Seat.findOne({ where: { id: seatId } })
    .then(seat => {
      res.json({ seat });
    })
    .catch(err => {
      return next(err);
    });
});

module.exports = router;

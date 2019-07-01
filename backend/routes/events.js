var express = require("express");
var router = express.Router();

const { Event } = require("../db").models;

router.get("/", function(req, res, next) {
  Event.findAll().then(events => {
    res.json({ events });
  });
});

router.post("/add", function(req, res, next) {
  const { title, date, description, time, image } = req.body;
  Event.create({
    title: title,
    date: date,
    description: description,
    time,
    image
  })
    .then(event => {
      console.log("Event added successfully: " + event);
      res.json({ event });
    })
    .catch(err => {
      nex(err);
    });
});

module.exports = router;

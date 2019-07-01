var express = require("express");
var router = express.Router();

const { Screening, Movie } = require("../db").models;

router.get("/", function(req, res, next) {
  Screening.findAll()
    .then(screenings => {
      res.json({ screenings });
    })
    .catch(err => {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      return next(err);
    });
});

router.get("/:screeningId", function(req, res, next) {
  const screeningId = req.params.screeningId;
  Screening.findOne({ where: { id: screeningId } })
    .then(screening => {
      Movie.findOne({ where: { id: screening.movieId } })
        .then(movie => {
          res.json({ success: true, movie: movie, screening: screening });
        })
        .catch(err => {
          console.log("====================================");
          console.log(err);
          console.log("====================================");
          return next(err);
        });
    })
    .catch(err => {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      return next(err);
    });
});

router.post("/add", function(req, res, next) {
  const { date, startTime, endTime, price, movieId, roomId } = req.body;
  Screening.create({
    date: date,
    startTime: startTime,
    endTime: endTime,
    price: price,
    movieId: movieId,
    roomId: roomId
  }).then(screening => {
    console.log("Screening added successfully: " + screening);
    res.json({ screening });
  });
});

module.exports = router;

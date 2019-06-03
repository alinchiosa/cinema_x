var express = require('express');
var router = express.Router();

const { Screening } = require('../db').models;

router.get('/', function(req, res, next) {
    Screening.findAll().then(screenings => {
      res.json({ screenings });
    });
});

// router.post('/add', function(req, res, next) {
//     const {genreType} = req.body;
//     Genre.create({genreType: genreType})
//     .then(genre  => {
//         console.log("Genre added successfully: " + genre);
//         res.json({genre});
//     })
// })

router.post('/add', function(req, res, next) {
    const {date, startTime, endTime, price, movieId, roomId} = req.body;
    Screening.create({date: date, startTime: startTime, endTime: endTime, price: price, movieId: movieId, roomId: roomId})
    .then(screening => {
        console.log("Screening added successfully: " + screening);
        res.json({screening});
    })
});



module.exports = router;
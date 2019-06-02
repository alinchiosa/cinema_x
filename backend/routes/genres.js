var express = require('express');
var router = express.Router();

const { Genre } = require('../db').models;

router.get('/', function(req, res, next) {
    Genre.findAll().then(genres => {
      res.json({ genres });
    });
});

router.post('/add', function(req, res, next) {
    const {genreType} = req.body;
    Genre.create({genreType: genreType})
    .then(genre  => {
        console.log("Genre added successfully: " + genre);
        res.json({genre});
    })
})



module.exports = router;
var express = require('express');
var router = express.Router();

const { Director } = require('../db').models;

router.get('/', function(req, res, next) {
    Director.findAll().then(directors => {
      res.json({ directors });
    });
});

router.post('/add', function(req, res, next) {
    const {directorName} = req.body;
    Director.create({directorName: directorName})
    .then(director => {
        console.log("Director added successfully: " + director);
        res.json({director});
    })
})



module.exports = router;
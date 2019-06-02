var express = require('express');
var router = express.Router();

const { Actor } = require('../db').models;

router.get('/', function(req, res, next) {
    Actor.findAll().then(actors => {
      res.json({ actors });
    });
});

router.post('/add', function(req, res, next) {
    const {actorName} = req.body;
    Actor.create({actorName: actorName})
    .then(actor => {
        console.log("Actor added successfully: " + actor);
        res.json({actor});
    })
})



module.exports = router;
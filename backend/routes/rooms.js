var express = require('express');
var router = express.Router();

const { Room } = require('../db').models;

router.get('/', function(req, res, next) {
    Room.findAll().then(rooms => {
      res.json({ rooms });
    });
});

router.post('/add', function(req, res, next) {
    const {roomType, noOfRows} = req.body;
    Room.create({roomType: roomType, noOfRows: noOfRows})
    .then(room  => {
        console.log("Room added successfully: " + room);
        res.json({room});
    })
})



module.exports = router;
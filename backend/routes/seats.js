var express = require('express');
var router = express.Router();

const { Seat, Room } = require('../db').models;

router.get('/', function(req, res, next) {
    Seat.findAll().then(seats => {
      res.json({ seats });
    });
});

router.post('/add', function(req, res, next) {
    const {roomId} = req.body;
    Room.findOne({where: {id: roomId}})
    .then(room => {
        console.log(room.dataValues);
        for ( i=0; i< room.dataValues.noOfRows; i++ ) {
            for (j=1; j<=10; j++){
                Seat.create({seatNo: j, seatRow: i, seatType: "normal", roomId: roomId})
                .then(seat => console.log("Seats added for room " + roomId));
            }
        }
        res.json({success: true, message: "seats added for room " + roomId});
    })
})





module.exports = router;
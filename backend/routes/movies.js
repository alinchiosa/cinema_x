var express = require('express');
var router = express.Router();

const { Movie, Actor, Director, Genre, ActorsInMovies, GenresOfMovies, DirectorsOfMovies } = require('../db').models;

router.get('/', function(req, res, next) {
    Movie.findAll().then(movies => {
      res.json({ movies });
    });
});

router.post('/add', function(req, res, next) {
    const { movieTitle, runtime, esrb, description, image, trailer, genres, actors, directors } = req.body;

    Movie.create({movieTitle: movieTitle, runtime: runtime, esrb: esrb, description: description, image: image, trailer: trailer})
    .then(movie => {
        genres.forEach(genre => {
            Genre.findOne({where: {genreType: genre}}).then(genreFound => {
                console.log(genreFound.dataValues);
                console.log("===================")
                GenresOfMovies.create({genreId: genreFound.dataValues.id, movieId: movie.id})
            })
            .catch(err => {
                    console.log('====================================');
                    console.log(err);
                    console.log('====================================');
                    res.json({success: false, message: err});
                    return next(err);
                  });
        });
        actors.forEach(actor => {
            Actor.findOne({where: {actorName: actor}}).then(actorFound => {
                console.log(actorFound.dataValues);
                console.log("===================")
                ActorsInMovies.create({actorId: actorFound.dataValues.id, movieId: movie.id})
            })
            .catch(err => {
                    console.log('====================================');
                    console.log(err);
                    console.log('====================================');
                    res.json({success: false, message: err});
                    return next(err);
                  });
        });
        directors.forEach(director => {
            Director.findOne({where: {directorName: director}}).then(directorFound => {
                console.log(directorFound.dataValues);
                console.log("===================")
                DirectorsOfMovies.create({directorId: directorFound.dataValues.id, movieId: movie.id})
            })
            .catch(err => {
                    console.log('====================================');
                    console.log(err);
                    console.log('====================================');
                    res.json({success: false, message: err});
                    return next(err);
                  });
        });
    })
    .catch(err => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        res.json({success: false, message: err});
        return next(err);
    });
    res.json({success: true, message: "Movie added successfully"});
});



module.exports = router;
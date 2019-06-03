var express = require("express");
var router = express.Router();

const {
  Movie,
  Actor,
  Director,
  Genre,
  ActorsInMovies,
  GenresOfMovies,
  DirectorsOfMovies
} = require("../db").models;

router.get("/", function(req, res, next) {
  Movie.findAll().then(movies => {
    // console.log(movies)
    let newMovies = [];
    Promise.all(
      movies.map(
        movieObj =>
          new Promise((resolve, reject) => {
            let newMovie = {
              movie: movieObj.dataValues,
              actors: [],
              directors: [],
              genres: []
            };

            Promise.all([
              ActorsInMovies.findAll({
                where: { movieId: movieObj.dataValues.id }
              })
                .then(actorsInMovies => {
                  return Promise.all(
                    actorsInMovies.map(actorInMovie => {
                      return Actor.findOne({
                        where: { id: actorInMovie.dataValues.actorId }
                      });
                    })
                  );
                })
                .then(actors => {
                  newMovie.actors = actors;
                }),
              GenresOfMovies.findAll({
                where: { movieId: movieObj.dataValues.id }
              })
                .then(genresOfMOvies => {
                  return Promise.all(
                    genresOfMOvies.map(genreOfMovie => {
                      return Genre.findOne({
                        where: { id: genreOfMovie.dataValues.genreId }
                      });
                    })
                  );
                })
                .then(genres => {
                  newMovie.genres = genres;
                }),
              DirectorsOfMovies.findAll({
                where: { movieId: movieObj.dataValues.id }
              })
                .then(directorsOfMovies => {
                  return Promise.all(
                    directorsOfMovies.map(directorOfMovie => {
                      return Director.findOne({
                        where: { id: directorOfMovie.dataValues.directorId }
                      });
                    })
                  );
                })
                .then(directors => {
                  newMovie.directors = directors;
                })
            ]).then(() => {
              return resolve(newMovie);
            });
          })
      )
    ).then(newMovieList => {
      console.log(newMovieList);
      res.json({ movieList: newMovieList });
    });
  });
});

router.post("/add", function(req, res, next) {
  const {
    movieTitle,
    runtime,
    esrb,
    description,
    image,
    trailer,
    genres,
    actors,
    directors
  } = req.body;

  Movie.create({
    movieTitle: movieTitle,
    runtime: runtime,
    esrb: esrb,
    description: description,
    image: image,
    trailer: trailer
  })
    .then(movie => {
      genres.forEach(genre => {
        Genre.findOne({ where: { genreType: genre } })
          .then(genreFound => {
            console.log(genreFound.dataValues);
            console.log("===================");
            GenresOfMovies.create({
              genreId: genreFound.dataValues.id,
              movieId: movie.id
            });
          })
          .catch(err => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
            res.json({ success: false, message: err });
            return next(err);
          });
      });
      actors.forEach(actor => {
        Actor.findOne({ where: { actorName: actor } })
          .then(actorFound => {
            console.log(actorFound.dataValues);
            console.log("===================");
            ActorsInMovies.create({
              actorId: actorFound.dataValues.id,
              movieId: movie.id
            });
          })
          .catch(err => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
            res.json({ success: false, message: err });
            return next(err);
          });
      });
      directors.forEach(director => {
        Director.findOne({ where: { directorName: director } })
          .then(directorFound => {
            console.log(directorFound.dataValues);
            console.log("===================");
            DirectorsOfMovies.create({
              directorId: directorFound.dataValues.id,
              movieId: movie.id
            });
          })
          .catch(err => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
            res.json({ success: false, message: err });
            return next(err);
          });
      });
    })
    .catch(err => {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      res.json({ success: false, message: err });
      return next(err);
    });
  res.json({ success: true, message: "Movie added successfully" });
});

module.exports = router;

var express = require("express");
var router = express.Router();
const Sequelize = require("sequelize");

const {
  Movie,
  Actor,
  Director,
  Genre,
  ActorsInMovies,
  GenresOfMovies,
  DirectorsOfMovies,
  Screening
} = require("../db").models;
const { sequelize } = require("../db");

router.get("/", function(req, res, next) {
  Movie.findAll().then(movies => {
    // console.log(movies)
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

router.get("/screenings", function(req, res, next) {
  let date;
  let minDate;
  let maxDate;
  if (req.query.date) {
    date = new Date(req.query.date);
    minDate = new Date(date);
    minDate.setUTCHours(0, 0, 0);
    maxDate = new Date(date);
    maxDate.setUTCHours(23, 59, 59);
    console.log("date", date);
    console.log("minDate", minDate);
    console.log("maxDate", maxDate);
  }

  Movie.findAll().then(movies => {
    Promise.all(
      movies.map(movieObj => {
        return new Promise((resolve, reject) => {
          let newMovie = {
            movie: movieObj.dataValues,
            screenings: []
          };

          const and = [{ movieId: movieObj.dataValues.id }];
          if (date) {
            and.push({
              date: {
                [Sequelize.Op.gte]: sequelize.fn(
                  "date_format",
                  minDate,
                  "%Y-%m-%dT%H:%i:%s"
                ),
                [Sequelize.Op.lte]: sequelize.fn(
                  "date_format",
                  maxDate,
                  "%Y-%m-%dT%H:%i:%s"
                )
              }
            });
          }

          // console.log(and);

          Screening.findAll({
            where: { [Sequelize.Op.and]: and }
          }).then(screenings => {
            if (screenings && screenings.length) {
              screenings.forEach(screening => {
                newMovie.screenings.push(screening.dataValues);
              });

              return resolve(newMovie);
            } else return resolve(undefined);
          });
        });
      })
    )
      .then(movieListWithUndef => movieListWithUndef.filter(v => v))
      .then(newMovieList => {
        res.json({ program: newMovieList });
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
            // console.log(genreFound.dataValues);
            // console.log("===================");
            if (genreFound) {
              GenresOfMovies.create({
                genreId: genreFound.id,
                movieId: movie.id
              });
            }
          })
          .catch(err => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
            return next(err);
          });
      });
      actors.forEach(actor => {
        Actor.findOne({ where: { actorName: actor } })
          .then(actorFound => {
            if (actorFound) {
              ActorsInMovies.create({
                actorId: actorFound.id,
                movieId: movie.id
              });
            }
          })
          .catch(err => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
            return next(err);
          });
      });
      directors.forEach(director => {
        Director.findOne({ where: { directorName: director } })
          .then(directorFound => {
            // console.log(directorFound.dataValues);
            // console.log("===================");
            if (directorFound) {
              DirectorsOfMovies.create({
                directorId: directorFound.id,
                movieId: movie.id
              });
            }
          })
          .catch(err => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
            return next(err);
          });
      });

      return res.json({ success: true, message: "Movie added successfully" });
    })
    .catch(err => {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      return next(err);
    });
});

// router.get("/:id", function(req, res, next) {
//   const movieId = req.params.id;
//   Movie.findOne({ where: { id: movieId } })
//     .then(movie => {
//       res.json({ movie });
//     })
//     .catch(err => {
//       console.log("====================================");
//       console.log(err);
//       console.log("====================================");
//       res.json({ success: false, message: err });
//       return next(err);
//     });
// });

router.get("/soon", function(req, res, next) {
  Promise.all([Movie.findAll(), Screening.findAll()])
    .then(([movieList, screeningList]) => {
      movieList = movieList.filter(movie => {
        return !screeningList.find(screening => screening.movieId === movie.id);
      });
      Promise.all(
        movieList.map(
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
    })
    .catch(err => {
      return next(err);
    });
});

router.get("/now", function(req, res, next) {
  Promise.all([Movie.findAll(), Screening.findAll()])
    .then(([movieList, screeningList]) => {
      movieList = movieList.filter(movie => {
        return screeningList.find(screening => screening.movieId === movie.id);
      });
      Promise.all(
        movieList.map(
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
    })
    .catch(err => {
      return next(err);
    });
});

module.exports = router;

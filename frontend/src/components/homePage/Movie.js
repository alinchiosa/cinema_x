import React from "react";
import "./Movies.css";

function Movie(props) {
  let showDirectors = () => {
    let directors = "";
    props.movie.directors.forEach(director => {
      directors += director.directorName + ", ";
    });
    return directors;
  };

  let showActors = () => {
    let actors = "";
    props.movie.actors.forEach(actor => {
      actors += actor.actorName + ", ";
    });
    return actors;
  };

  let showGenre = () => {
    let genres = "";
    props.movie.genres.forEach(genre => {
      genres += genre.genreType + ", ";
    });
    return genres;
  };
  return (
    <div className="movie">
      <div className="movieChild">
        <img src={props.movie.movie.image} width={"100%"} height={300} />
        <div className="movieText">
          <p>Title: {props.movie.movie.movieTitle}</p>
          <p>Director/s: {showDirectors()}</p>
          <p>Actors: {showActors()}</p>
          <p>Genre: {showGenre()}</p>
        </div>
      </div>
    </div>
  );
}

export default Movie;

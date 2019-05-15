import React from "react";
import "./Movies.css";

function Movie(props){
    console.log(props)
    let showDirectors = () => {
        let directors = '';
        props.movie.director.forEach(director => {
            directors += director + ", ";
        })
        return directors;
    }

    let showActors = () => {
        let actors = "";
        props.movie.actors.forEach(actor => {
            actors += actor + ', '
        })
        return actors;
    }

    let showGenre = () => {
        let genres = "";
        props.movie.genre.forEach(genre => {
            genres += genre + ", ";
        })
        return genres;
    }
    return(
        <div className="movie">
            <div classname="movieChild">
                <img src={require("./../../images/movie.jpg")} width={"100%"} height={300}/>
                {/* <img className="Avatar"
                    src={props.movie.img}
                    alt={props.movie.title}
                /> */}
                <div className="movieText">
                    <p>Title: {props.movie.title} {props.movie.id}</p>
                    <p>Director/s: {showDirectors()}</p>
                    <p>Actors: {showActors()}</p>
                    <p>Genre: {showGenre()}</p>

                </div>
            </div>
        </div>
    );
}

export default Movie;
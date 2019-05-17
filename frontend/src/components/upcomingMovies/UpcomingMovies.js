import React from 'react';
import Movie from './../homePage/Movie';
import "./UpcomingMovies.css";

class UpcomingMovies extends React.Component {
    constructor(){
        super();
        this.state={
            date: new Date(),
            movies: [
                {
                    id: 1,
                    title: "Movie test",
                    director: ["Director test1", "Director test2"], 
                    actors: ["Actor1", "Actor2", "Actor3"],
                    genre: ["genre1", 'genre2'], 
                    img: "./../../images/movie.jpg"

                },
                {
                    id: 2,
                    title: "Movie test",
                    director: ["Director test1", "Director test2"], 
                    actors: ["Actor1", "Actor2", "Actor3"],
                    genre: ["genre1", 'genre2'], 
                    img: "./../../images/movie.jpg"

                },
                {
                    id: 3,
                    title: "Movie test",
                    director: ["Director test1", "Director test2"], 
                    actors: ["Actor1", "Actor2", "Actor3"],
                    genre: ["genre1", 'genre2'], 
                    img: "./../../images/movie.jpg"

                },
                {
                    id: 4,
                    title: "Movie test",
                    director: ["Director test1", "Director test2"], 
                    actors: ["Actor1", "Actor2", "Actor3"],
                    genre: ["genre1", 'genre2'], 
                    img: "./../../images/movie.jpg"

                }, {
                    id: 5,
                    title: "Movie test",
                    director: ["Director test1", "Director test2"], 
                    actors: ["Actor1", "Actor2", "Actor3"],
                    genre: ["genre1", 'genre2'], 
                    img: "./../../images/movie.jpg"

                },
                {
                    id: 6,
                    title: "Movie test",
                    director: ["Director test1", "Director test2"], 
                    actors: ["Actor1", "Actor2", "Actor3"],
                    genre: ["genre1", 'genre2'], 
                    img: "./../../images/movie.jpg"

                },
                {
                    id: 7,
                    title: "Movie test",
                    director: ["Director test1", "Director test2"], 
                    actors: ["Actor1", "Actor2", "Actor3"],
                    genre: ["genre1", 'genre2'], 
                    img: "./../../images/movie.jpg"

                },
                {
                    id: 8,
                    title: "Movie test",
                    director: ["Director test1", "Director test2"], 
                    actors: ["Actor1", "Actor2", "Actor3"],
                    genre: ["genre1", 'genre2'], 
                    img: "./../../images/movie.jpg"

                },
                {
                    id: 9,
                    title: "Movie test",
                    director: ["Director test1", "Director test2"], 
                    actors: ["Actor1", "Actor2", "Actor3"],
                    genre: ["genre1", 'genre2'], 
                    img: "./../../images/movie.jpg"

                },
                {
                    id: 10,
                    title: "Movie test",
                    director: ["Director test1", "Director test2"], 
                    actors: ["Actor1", "Actor2", "Actor3"],
                    genre: ["genre1", 'genre2'], 
                    img: "./../../images/movie.jpg"

                },{
                    id: 11,
                    title: "Movie test",
                    director: ["Director test1", "Director test2"], 
                    actors: ["Actor1", "Actor2", "Actor3"],
                    genre: ["genre1", 'genre2'], 
                    img: "./../../images/movie.jpg"

                }, {
                    id: 12,
                    title: "Movie test",
                    director: ["Director test1", "Director test2"], 
                    actors: ["Actor1", "Actor2", "Actor3"],
                    genre: ["genre1", 'genre2'], 
                    img: "./../../images/movie.jpg"

                }
            ]
        }
    }

    render(){

        const movieComponents = this.state.movies.map(movie => <Movie key={movie.id} movie={movie}/>)

        return(
            <div class="upcomingContainer">
                <h3>{this.state.date.getFullYear()}</h3>
                <h4>{this.state.date.getMonth()+1}</h4>
                <br/>
                <div className="moviesContainer">
                    {movieComponents}
                </div>
            </div>
        )
    }
}

export default UpcomingMovies;
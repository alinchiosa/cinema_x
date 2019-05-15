import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';
import Movie from './Movie';
import './Movies.css'


class Movies extends React.Component {
    constructor(){
        super();
        this.state={
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

                },
            ]
        }
    }

    render(){

        const movieComponents = this.state.movies.map( movie => <Movie key={movie.id} movie={movie}/>);
        return(
            <div>
                <Tabs defaultActiveKey="nowInProgram" id="uncontrolled-tab-example">
                    <Tab eventKey="nowInProgram" title="NOW IN PROGRAM" >
                        <div className="movies">
                            {movieComponents}
                        </div>
                    </Tab>
                    <Tab eventKey="soon" title="SOON..">
                        <div className="movies">
                            {movieComponents}
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default Movies;
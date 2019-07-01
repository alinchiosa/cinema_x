import React from "react";
import Movie from "./../homePage/Movie";
import "./UpcomingMovies.css";

class UpcomingMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      movies: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/movies/soon")
      .then(res => res.json())
      .then(jsonRes => {
        this.setState(prevState => {
          return {
            date: prevState.date,
            isLoaded: true,
            movies: jsonRes.movieList
          };
        });
      });
  }

  render() {
    const movieComponents = this.state.movies.map(movie => (
      <Movie key={movie.id} movie={movie} />
    ));

    return (
      <div className="upcomingContainer">
        <h3>Movies coming soon in the program</h3>
        <br />
        <div className="moviesContainer">{movieComponents}</div>
      </div>
    );
  }
}

export default UpcomingMovies;

import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import Movie from "./Movie";
import "./Movies.css";

class Movies extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoaded: false,
      movies: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/movies")
      .then(res => res.json())
      .then(jsonRes => {
        // console.log(jsonRes.movieList);
        this.setState({
          isLoaded: true,
          movies: jsonRes.movieList
        });
      });
  }
  //  {
  //     id: 12,
  //     title: "Movie test",
  //     director: ["Director test1", "Director test2"],
  //     actors: ["Actor1", "Actor2", "Actor3"],
  //     genre: ["genre1", 'genre2'],
  //     img: "./../../images/movie.jpg"

  // },

  render() {
    const movieComponents = this.state.movies.map(movie => (
      <Movie key={movie.movie.id} movie={movie} />
    ));
    return (
      <div>
        <Tabs defaultActiveKey="nowInProgram" id="uncontrolled-tab-example">
          <Tab eventKey="nowInProgram" title="NOW IN PROGRAM">
            <div className="movies">{movieComponents}</div>
          </Tab>
          <Tab eventKey="soon" title="SOON..">
            <div className="movies">{movieComponents}</div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Movies;

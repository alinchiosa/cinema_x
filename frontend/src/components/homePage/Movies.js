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
      movies: [],
      key: "nowInProgram"
    };
    this.keyRef = this.state.key;
  }

  componentDidMount() {
    fetch("http://localhost:3000/movies/now")
      .then(res => res.json())
      .then(jsonRes => {
        // console.log(jsonRes.movieList);
        this.setState({
          isLoaded: true,
          movies: jsonRes.movieList
        });
      });
  }

  componentDidUpdate() {
    if (this.state.key === this.keyRef) {
      return false;
    }
    if (this.state.key === "soon") {
      fetch("http://localhost:3000/movies/soon")
        .then(res => res.json())
        .then(jsonRes => {
          this.setState({
            isLoaded: true,
            movies: jsonRes.movieList
          });
        });
    } else if (this.state.key === "nowInProgram") {
      fetch("http://localhost:3000/movies/now")
        .then(res => res.json())
        .then(jsonRes => {
          // console.log(jsonRes.movieList);
          this.setState({
            isLoaded: true,
            movies: jsonRes.movieList
          });
        });
    }

    this.keyRef = this.state.key;
  }

  render() {
    const movieComponents = this.state.movies.map(movie => (
      <Movie key={movie.movie.id} movie={movie} />
    ));
    return (
      <div>
        <Tabs
          defaultActiveKey="nowInProgram"
          id="controlled-tab-example"
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
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

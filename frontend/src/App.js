import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./components/homePage/HomePage";
import Program from "./components/program/Program";
import UpcomingMovies from "./components/upcomingMovies/UpcomingMovies";
import Events from "./components/events/Events";
import Recommendations from "./components/recommendations/Recommendations";
import Footer from "./components/footer/Footer";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Profile from "./components/profile/Profile";
import Booking from "./components/bookings/Booking";

function isLoggedin() {
  return !!localStorage.getItem("userFirstName");
}
class App extends React.Component {
  state = {
    isLoggedIn: isLoggedin()
  };

  render() {
    return (
      <BrowserRouter className="App">
        <Navbar isLoggedin={this.state.isLoggedIn} />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/program" component={Program} />
          <Route path="/upcomingMovies" component={UpcomingMovies} />
          <Route path="/events" component={Events} />
          <Route path="/recommendations" component={Recommendations} />
          <Route path="/about" component={About} />
          <Route path="/booking/:screeningId" component={Booking} />
          <Route path="/contact" component={Contact} />
          <Route
            path="/profile"
            render={props => (
              <Profile
                {...props}
                afterLogout={() => {
                  this.setState({ isLoggedIn: false });
                }}
              />
            )}
          />
          <Route
            path="/login"
            render={props => (
              <Login
                {...props}
                afterLogin={() => {
                  this.setState({ isLoggedIn: true });
                }}
              />
            )}
          />
          <Route path="/signup" component={Signup} />
        </Switch>
        <Footer className="footer" />
      </BrowserRouter>
    );
  }
}

export default App;

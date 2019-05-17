import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import DatePicker from "react-datepicker";
import Dropdown from 'react-bootstrap/Dropdown';
import MovieProgram from './MovieProgram';

import "react-datepicker/dist/react-datepicker.css";
import './Program.css';

class Program extends React.Component {
    constructor(){
        super();
        this.state={
            startDate: new Date(),
            movies: [
                {
                    id: 1,
                    title: "Movie test",
                    minAge: 18,
                    duration: 129,
                    genre: ["comedy", "horror"],
                    morningTimes: ["9:30", "10:00"],
                    afternoonTimes: ["13:47", "14:15", "17:30"],
                    eveningTimes: ["19:40", "21:00", "22:30", "24:00"]

                },
                {
                    id: 2,
                    title: "Movie test",
                    minAge: 18,
                    duration: 129,
                    genre: ["comedy", "horror"],
                    morningTimes: ["9:30", "10:00"],
                    afternoonTimes: ["13:47", "14:15", "17:30"],
                    eveningTimes: ["19:40", "21:00", "22:30", "24:00"]

                },
                {
                    id: 3,
                    title: "Movie test",
                    minAge: 18,
                    duration: 129,
                    genre: ["comedy", "horror"],
                    morningTimes: ["9:30", "10:00"],
                    afternoonTimes: ["13:47", "14:15", "17:30"],
                    eveningTimes: ["19:40", "21:00", "22:30", "24:00"]

                },
                {
                    id: 4,
                    title: "Movie test",
                    minAge: 18,
                    duration: 129,
                    genre: ["comedy", "horror"],
                    morningTimes: ["9:30", "10:00"],
                    afternoonTimes: ["13:47", "14:15", "17:30"],
                    eveningTimes: ["19:40", "21:00", "22:30", "24:00"]

                }, {
                    id: 5,
                    title: "Movie test",
                    minAge: 18,
                    duration: 129,
                    genre: ["comedy", "horror"],
                    morningTimes: ["9:30", "10:00"],
                    afternoonTimes: ["13:47", "14:15", "17:30"],
                    eveningTimes: ["19:40", "21:00", "22:30", "24:00"]

                },
                {
                    id: 6,
                    title: "Movie test",
                    minAge: 18,
                    duration: 129,
                    genre: ["comedy", "horror"],
                    morningTimes: ["9:30", "10:00"],
                    afternoonTimes: ["13:47", "14:15", "17:30"],
                    eveningTimes: ["19:40", "21:00", "22:30", "24:00"]

                },
                {
                    id: 7,
                    title: "Movie test",
                    minAge: 18,
                    duration: 129,
                    genre: ["comedy", "horror"],
                    morningTimes: ["9:30", "10:00"],
                    afternoonTimes: ["13:47", "14:15", "17:30"],
                    eveningTimes: ["19:40", "21:00", "22:30", "24:00"]

                },
                {
                    id: 8,
                    title: "Movie test",
                    minAge: 18,
                    duration: 129,
                    genre: ["comedy", "horror"],
                    morningTimes: ["9:30", "10:00"],
                    afternoonTimes: ["13:47", "14:15", "17:30"],
                    eveningTimes: ["19:40", "21:00", "22:30", "24:00"]

                },
                {
                    id: 9,
                    title: "Movie test",
                    minAge: 18,
                    duration: 129,
                    genre: ["comedy", "horror"],
                    morningTimes: ["9:30", "10:00"],
                    afternoonTimes: ["13:47", "14:15", "17:30"],
                    eveningTimes: ["19:40", "21:00", "22:30", "24:00"]

                },
                {
                    id: 10,
                    title: "Movie test",
                    minAge: 18,
                    duration: 129,
                    genre: ["comedy", "horror"],
                    morningTimes: ["9:30", "10:00"],
                    afternoonTimes: ["13:47", "14:15", "17:30"],
                    eveningTimes: ["19:40", "21:00", "22:30", "24:00"]

                },{
                    id: 11,
                    title: "Movie test",
                    minAge: 18,
                    duration: 129,
                    genre: ["comedy", "horror"],
                    morningTimes: ["9:30", "10:00"],
                    afternoonTimes: ["13:47", "14:15", "17:30"],
                    eveningTimes: ["19:40", "21:00", "22:30", "24:00"]

                }, {
                    id: 12,
                    title: "Movie test",
                    minAge: 18,
                    duration: 129,
                    genre: ["comedy", "horror"],
                    morningTimes: ["9:30", "10:00"],
                    afternoonTimes: ["13:47", "14:15", "17:30"],
                    eveningTimes: ["19:40", "21:00", "22:30", "24:00"]

                },
            ]
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
      }

    render(){

        const movieComponents = this.state.movies.map(movie => 
            <MovieProgram key={movie.id} movie={movie}/>
        );

        return(
            <div className="programContainer">
                <h2>PROGRAM CINEMA AGC</h2>
                <br/>
                <div className="filters">
                    <div className="day">
                        <ButtonGroup toggle className="mt-1">
                            <ToggleButton type="radio" name="radio" defaultChecked value="1">
                                Today
                            </ToggleButton>
                            <ToggleButton type="radio" name="radio" value="2">
                                Tomorrow
                            </ToggleButton>
                        </ButtonGroup>
                        <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                Movies
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item >Action</Dropdown.Item>
                                <Dropdown.Item >Another action</Dropdown.Item>
                                <Dropdown.Item >Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <br/>
                <div className="headers">
                    <div className="header">
                        <p>{this.state.startDate.getDate()}/{this.state.startDate.getMonth() + 1}/{this.state.startDate.getFullYear()}</p>
                    </div>
                    <div className="header">
                        <p>Morning</p>
                    </div >
                    <div className="header">
                        <p>Afternoon</p>
                    </div>
                    <div className="header">
                        <p>Evening</p>
                    </div>
                </div>
                <hr/>
                <div>
                    {movieComponents}
                </div>

            </div>
        )
    }
}

export default Program;
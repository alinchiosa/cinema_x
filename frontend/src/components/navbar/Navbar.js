import React from 'react';
import './Navbar.css';
import {NavLink} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

class Navbar extends React.Component {
    constructor () {
        super();
        this.state={

        }
    }

    render(){
        return(
            <div>
                <div className='top'>
                    <img src={require('./../../images/logo.png')} width={130} height={100}/>
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                Genres
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item >Action</Dropdown.Item>
                                <Dropdown.Item >Another action</Dropdown.Item>
                                <Dropdown.Item >Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <input type="text" placeholder='movies' />
                    <div className="connection">
                        <NavLink to='/login'>Log in/</NavLink>
                        <NavLink to='/signup'>Sign up</NavLink>
                    </div>
                </div>
                <div className='bottom'>
                    <div className = "linkFirst">
                        <NavLink to="/program">Program</NavLink>
                    </div>
                    <div className = "links">
                        <NavLink to="/upcomingMovies">Upcoming Movies</NavLink>
                    </div>
                    <div className = "links">
                        <NavLink to="/events" >Events</NavLink>
                    </div>
                    <div className = "links">
                        <NavLink to="/recommendations">Recommendations</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;
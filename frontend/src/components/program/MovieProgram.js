import React from 'react';
import Button from 'react-bootstrap/Button';
import './MovieProgram.css'

function MovieProgram(props){
    console.log(props)

    const createButtons = (list) => {
        const buttonsArray = list.map(element => <Button variant="secondary" style={{margin:"5%"}}>{element}</Button>);
        return buttonsArray;
    }
    return(
        <div className="spacer">
            <div className="movieContainer">
                <div className="section">
                    <div className='description'>
                        <div>
                            <p>{props.movie.title}</p>
                        </div>
                        <div className="ageDur">
                            <p>{props.movie.minAge}, {props.movie.duration}min</p>
                            {/* <p>Duration: {props.movie.duration}min</p> */}
                        </div>
                        <p>{props.movie.genre}</p>
                    </div>
                </div>
                <div className="section">
                    {createButtons(props.movie.morningTimes)}
                </div>
                <div className="section">
                    {createButtons(props.movie.afternoonTimes)}
                </div>
                <div className="lastSection">
                    {createButtons(props.movie.eveningTimes)}
                </div>  
            </div>
        </div>
    );
}

export default MovieProgram;



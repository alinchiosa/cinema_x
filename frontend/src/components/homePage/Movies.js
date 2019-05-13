import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';


class Movies extends React.Component {
    constructor(){
        super();
        this.state={

        }
    }

    render(){
        return(
            <div>
                <Tabs defaultActiveKey="nowInProgram" id="uncontrolled-tab-example">
                    <Tab eventKey="nowInProgram" title="NOW IN PROGRAM">
                        <p>Movie 1</p>
                        <p>Movie 2</p>
                        <p>Movie 3</p>
                        <p>Movie 4</p>
                        <p>Movie 5</p>
                        <p>Movie 6</p>
                        <p>Movie 7</p>
                        <p>Movie 8</p>
                        <p>Movie 9</p>
                        <p>Movie 10</p>
                        <p>Movie 11</p>
                        <p>Movie 12</p>
                        <p>Movie 13</p>
                    </Tab>
                    <Tab eventKey="soon" title="SOON..">
                        <p>Movie A</p>
                        <p>Movie B</p>
                        <p>Movie C</p>
                        <p>Movie D</p>
                        <p>Movie E</p>
                        <p>Movie F</p>
                        <p>Movie G</p>
                        <p>Movie H</p>
                        <p>Movie I</p>
                        <p>Movie J</p>
                        <p>Movie K</p>
                        <p>Movie L</p>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default Movies;
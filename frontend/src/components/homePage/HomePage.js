import React from 'react';
import CarouselOffers from './CarouselOffers';
import Movies from './Movies';
import './HomePage.css';

class HomePage extends React.Component {
    constructor(){
        super();
        this.state={

        }
    }

    render(){
        return(
            <div>
               <CarouselOffers/>
               <Movies/>
            </div>
        )
    }
}

export default HomePage;
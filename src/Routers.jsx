import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import App from './App';
import './App.css';
import Navbar from './components/Navbar'
import DefaultBackground from './components/DefaultBackground';
import TouristTableContainer from './components/TouristTableContainer';
import FlightTableContainer from './components/FlightTableContainer';

export class Routers extends Component {
    render() {
        return (
            <Router>
                <Navbar />
                <DefaultBackground />
                <Switch>
                    <Route exact path="/tourists" component={TouristTableContainer}/>
                    <Route path="/flights" component={FlightTableContainer}/>
                </Switch>
            </Router>
        )
    }
}

export default Routers

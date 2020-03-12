import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Navbar extends Component {
  render() {
    return (
      <header >
        <div className="navbar-container">
          <h1>Tourists & Flights</h1>
          <nav>
            <ul>
              <li><Link to="/tourists">TOURISTS</Link></li>
              <li><Link to="/flights">FLIGHTS</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}

export default Navbar

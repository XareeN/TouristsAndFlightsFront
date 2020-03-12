import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TouristTableContainer from './components/TouristTableContainer';

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <TouristTableContainer />
    </div>
  );
}

export default App;

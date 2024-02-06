import React from 'react';
import './App.css';
import Questions from './components/Questions';


const App = () => {
  
  
  
  return (
    <div className='App'>

    <div className='top-section'>
      <h1>Workout Generator</h1>
      <p>Select your Targets: </p>
      </div>
      <Questions />


    </div>
    
  );
}

export default App
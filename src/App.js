import React from 'react';
import './App.css';
import Questions from './components/Questions';


const App = () => {
  
  
  
  return (
    <div className='App'>

    <div className='top-section'>
      <h1>Workout Generator</h1>
      <p>Select the body parts you want to workout: </p>
      </div>
      <Questions />


    </div>
    
  );
}

export default App
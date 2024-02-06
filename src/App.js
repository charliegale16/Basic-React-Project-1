import React, { useState, useEffect } from 'react';
import './App.css';
import Questions from './components/Questions';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};



const App = () => {
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an async task (e.g., fetching data) that takes some time
    setTimeout(() => {
      setLoading(false); // Set loading to false after the async task is done
    }, 2500); // Simulate a 2-second loading time
  }, []);
  
  return (
    <div className='App'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='top-section'>
            <h1>Workout Generator</h1>
            <p>Select your Targets: </p>
          </div>
          <Questions />
        </>
      )}
    </div>
  );
};

export default App
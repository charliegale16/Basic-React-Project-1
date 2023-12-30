import React, { useEffect, useState } from 'react'
import './Questions.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { exerciseOptions, fetchData } from '../utils/fetchData.js';
import VerticalScrollbar from './VerticalScrollbar.js';
let mykey = process.env.REACT_APP_RAPID_API_KEY


const Questions = () => {
    const [selectedItems,setselectedItems] = useState("");
    const [exercises,setExercises] = useState([]);
    const [random,setRandom] = useState([]);

    const handleSelectedItem = (e) => {
      setselectedItems(e.target.value);
    }  
    
    const handleCheckboxChanges = (e) => {
      const value = e.target.value;

      if (e.target.checked){
        setselectedItems([...selectedItems, value]);
      }
      else {
        setselectedItems(selectedItems.filter(item => item !== value));
      }
    }
   


    const handleSubmit= async (e) => {
      e.preventDefault();
      if (selectedItems) {
        const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=1000',exerciseOptions);
        
        /*
        
        Create const filter and state for each exercise after exerciseData API:
        1.Back: inside const have an array of exercises. Randomize by only grabbing two from the list
        2.Biceps
        3.Chest
        4.Legs
        5.Shoudlers
        6.Triceps

        


        


        */

       // 
      // Convert all items in selectedItems to lowercase and store them in selectedItemsLowerCase
      const selectedItemsLowerCase = selectedItems.map(item => item.toLowerCase());

      // Filter exercisesData based on the condition inside the filter function
      const searchedExercises = exercisesData.filter((exercise) => {
      // Check if any item in selectedItemsLowerCase matches the bodyPart or target of the current exercise
      return selectedItemsLowerCase.some(item =>
        exercise.bodyPart.toLowerCase().includes(item) ||
        exercise.target.toLowerCase().includes(item)
      );
      });

        // Set the filtered exercises to the state variable (assuming setExercises is a state setter function)
        setExercises(searchedExercises);

        function limitAndDisplayExercisesByBodyPart(exercises) {
          // Create an object to store exercises by body part
          const exercisesByBodyPart = {};
        
          // Group exercises by body part
          exercises.forEach(exercise => {
            const bodyPart = exercise.bodyPart.toLowerCase();
            if (!exercisesByBodyPart[bodyPart]) {
              exercisesByBodyPart[bodyPart] = [];
            }
            exercisesByBodyPart[bodyPart].push(exercise);
          });
          
        
          // Create an array to store the limited exercises
          const limitedExercises = [];
        
          // Iterate over each body part in the exercisesByBodyPart object
          for (const bodyPart in exercisesByBodyPart) {
            // Get the exercises for the current body part
            const current = exercisesByBodyPart[bodyPart];
        
            // Shuffle the exercises
            const shuffledExercises = current.sort(() => 0.5 - Math.random());
        
            // Take the first two exercises and add them to the limitedExercises array
            if(selectedItems.length == 6){
              limitedExercises.push(...shuffledExercises.slice(0, 1));

            }
            else if(selectedItems.length == 1){
              limitedExercises.push(...shuffledExercises.slice(0, 6));
            }
            else{
            limitedExercises.push(...shuffledExercises.slice(0, 3));}
          }
          console.log(limitedExercises);
          do{
            limitedExercises.splice(Math.floor(Math.random * limitedExercises.length),1);
          }while(limitedExercises.length > 6);
        // Return the limited exercises
          return limitedExercises;
        }
        setRandom(limitAndDisplayExercisesByBodyPart(searchedExercises));
        setselectedItems('');


        console.log(exercisesData);
        
        console.log(searchedExercises);
        console.log(selectedItems); 
      
     
    };

    console.log(exercises);
    console.log(random);
    


    }


    return (
    <div className='questions'>
      <form onSubmit={handleSubmit}>
        {/*<div className='question1'>
        <p>How many times a week do you want to work out?</p>
        <Form.Select className='button' aria-label="Number of Workout Days"onChange={handleSelectedItem}>
        <option>None</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
        </Form.Select>
        </div>
    */}
        <div className='question2'>
        <p>Select the body parts you want to workout: </p>
        {['checkbox'].map((type) => (
        <div key={'default-${type}'} className="mb-3">

          <Form.Check
            label="Back"
            value = "back"
            name="group1"
            type= {type}
            id ={'default-${type}-1'}
            onChange={handleCheckboxChanges}
          />          
          <Form.Check
            label="Biceps"
            value="biceps"
            name="group1"
            type= {type}
            id ={'default-${type}-2'}
            onChange={handleCheckboxChanges}
          />
          <Form.Check
            label="Chest"
            value="chest"
            name="group1"
            type= {type}
            id ={'default-${type}-3'}
            onChange={handleCheckboxChanges}
          />
          <Form.Check
            label="Legs"
            value="legs"
            name="group1"
            type= {type}
            id ={'default-${type}-4'}
            onChange={handleCheckboxChanges}
          />
          <Form.Check
            label="Shoulders"
            value="shoulders"
            name="group1"
            type= {type}
            id ={'default-${type}-5'}
            onChange={handleCheckboxChanges}
          />
          <Form.Check
            label="Triceps"
            value="triceps"
            name="group1"
            type= {type}
            id ={'default-${type}-6'}
            onChange={handleCheckboxChanges}

          />
          
        </div>
      ))}
        </div>
        <div className='question3'>
        <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Submit</Button>
        </Col>
      </Form.Group>
      
        </div>
      </form>
     { <div>

          <VerticalScrollbar data ={random}/> 

      </div>
        }
        
    </div>
  )

}



export default Questions
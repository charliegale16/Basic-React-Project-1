import React, { useEffect, useState } from 'react'
import './Questions.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Stack } from 'react-bootstrap';
import { exerciseOptions, fetchData } from '../utils/fetchData.js';
import VerticalScrollbar from './VerticalScrollbar.js';
let mykey = process.env.REACT_APP_RAPID_API_KEY


const Questions = () => {
    const [selectedItems,setselectedItems] = useState("");
    const [exercises,setExercises] = useState([]);
    const [random,setRandom] = useState([]);
    const [showHeader, setShowHeader] = useState(false);

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
        setShowHeader(true);


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
        {['checkbox'].map((type) => (
        <div key={'default-${type}'} role='group' class ="btn-group" >
          <Stack className='card1' direction='row'>
          <input type= {type} class="btn-check" id ={'default-${type}-1'}
            role='group'
            value = "back"
            name="group1"
            onChange={handleCheckboxChanges}
            autocomplete="off">
            </input>
          <label class="btn-outline-primary1" for={'default-${type}-1'}>Back</label>
          </Stack>      

          <Stack className='card2' direction='row'>
          <input type= {type} class="btn-check" id ={'default-${type}-2'}
            role='group'
            value = "biceps"
            name="group1"
            onChange={handleCheckboxChanges}
            autocomplete="off">
            </input>
          <label class="btn-outline-primary2" for={'default-${type}-2'}>Biceps</label>
          </Stack>
          <Stack className='card3' direction='row'>
          <input type= {type} class="btn-check" id ={'default-${type}-3'}
            role='group'
            value = "chest"
            name="group1"
            onChange={handleCheckboxChanges}
            autocomplete="off">
            </input>
          <label class="btn-outline-primary3" for={'default-${type}-3'}>Chest</label>
          </Stack>
          <Stack className='card4' direction='row'>
          <input type= {type} class="btn-check" id ={'default-${type}-4'}
            role='group'
            value = "legs"
            name="group1"
            onChange={handleCheckboxChanges}
            autocomplete="off">
            </input>
          <label class="btn-outline-primary4" for={'default-${type}-4'}>Legs</label>
          </Stack>
          <Stack className='card5' direction='row'>
          <input type= {type} class="btn-check" id ={'default-${type}-5'}
            role='group'
            value = "shoudlers"
            name="group1"
            onChange={handleCheckboxChanges}
            autocomplete="off">
            </input>
          <label class="btn-outline-primary5" for={'default-${type}-5'}>Shoudlers</label>
          </Stack>
          <Stack className='card6' direction='row'>
          <input type= {type} class="btn-check" id ={'default-${type}-6'}
            role='group'
            value = "triceps"
            name="group1"
            onChange={handleCheckboxChanges}
            autocomplete="off">
            </input>
          <label class="btn-outline-primary6" for={'default-${type}-6'}>Triceps</label>
          </Stack>
          
        </div>
      ))}
        </div>
        <div className='submit-btn'>
        <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
              <button type="submit" class="submit-button"></button>
              <span onClick={handleSubmit} id="submitButton" class="button-text">Submit</span>

        </Col>
      </Form.Group>
      {showHeader && <h1 className='results'>RESULTS</h1>}
      
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
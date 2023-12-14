import React, { useState } from 'react'
import './Questions.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { exerciseOptions, fetchData } from '../utils/fetchData.js';
let mykey = process.env.REACT_APP_RAPID_API_KEY

const Questions = () => {
    const [selectedItems,setselectedItems] = useState('');

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
        const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',exerciseOptions);
        console.log(exercisesData)
        console.log(mykey)
        console.log('Selected Options:'+ selectedItems);
        console.log("Number of Selected Options:" + selectedItems.length);
      }
    }

    return (
    <div className='questions'>
      <form onSubmit={handleSubmit}>
        <div className='question1'>
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
      
        
    </div>
  )
}

export default Questions
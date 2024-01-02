import React from 'react'
import './VerticalScrollbar.css';
import { Stack } from 'react-bootstrap';

const VerticalScrollbar = ( {data} ) => {
  return (
    <div>
        {data.map((data) => (
        <div key = {data.id} className="card">
          <h1 className='card-title'>{data.name}</h1>
          <img className='card-image' src={data.gifUrl}></img>
          <Stack direction='row'>
          <button className='card-target'>{data.bodyPart}</button>
          </Stack>
          <Stack direction='row'>
          <button className='card-target2'>{data.secondaryMuscles[0]}</button>
          </Stack>
          <br></br>
          <br></br>
          <p className='card-instr-title'>instructions:</p>
          <p className='card-instr'>{data.instructions[0] + data.instructions[1]}</p>
        </div>
      ))}
        </div>
  )
}

export default VerticalScrollbar
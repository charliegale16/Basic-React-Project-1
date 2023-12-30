import React from 'react'

const VerticalScrollbar = ( {data} ) => {
  return (
    <div>
        <h1>Results</h1>
        {data.map((data) => (
        <div key = {data.id} className="card">
          <p>{data.name}</p>
          <p>{data.bodyPart}</p>
          <p>{data.target}</p>
          <p>{data.equipment}</p>
        </div>
      ))}
        </div>
  )
}

export default VerticalScrollbar
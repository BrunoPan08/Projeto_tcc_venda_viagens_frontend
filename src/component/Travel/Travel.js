import React from 'react'
import './Travel.css'


const Travel = ({result}) => {
  return (
    <>
      <section className='card-container'>
        {result}
      </section>
    </>
  )
}

export default Travel
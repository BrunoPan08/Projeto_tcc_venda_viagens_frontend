import React from 'react'
import './Recommend.css'
import Button from '../component/Button/Button'

const Recommend = ({handleClick}) => {
  return (
    <>
      <div>
        <h2 className='recommended-title'>Recommended</h2>
        <div className='recommended-flex'>
          <button className='btns'>Todas Locais</button>
          <Button onClickHandler={handleClick} value="AllProducts" title="All Products"/>
          <Button onClickHandler={handleClick} value="Nike" title="Nike"/>
          <Button onClickHandler={handleClick} value="Adidas" title="Adidas"/>
          <Button onClickHandler={handleClick} value="Puma" title="Puma"/>
          <Button onClickHandler={handleClick} value="Vans" title="Vans"/>
        </div>
      </div>
    </>
  )
}

export default Recommend
import React from 'react'
import './Price.css'
import Input from '../../Input/input'

const Price = ({handleChange}) => {
  return (
    <div className='ml'>
      <h2 className='sidebar-title price-title'>Price</h2>
      <label className='sidebar-label-container'>
        <input onChange={handleChange} type='radio' value={""} nam="test2"/>
        <span className='checkmark'></span>All
      </label>

      <Input
        handleChange={handleChange}
        value={100}
        title="$0 -$100"
        name='test2'
      />
      <Input
        handleChange={handleChange}
        value={200}
        title="$100 -$200"
        name='test2'
      />
      <Input
        handleChange={handleChange}
        value={300}
        title="$200 -$300"
        name='test2'
      />
      <Input
        handleChange={handleChange}
        value={400}
        title="over $300"
        name='test2'
      />
    </div>
  )
}

export default Price
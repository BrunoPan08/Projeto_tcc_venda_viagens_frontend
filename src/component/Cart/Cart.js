import React from 'react'
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai'
import { BsFillBagHeartFill } from 'react-icons/bs'

const Cart = ({id,img, title,star, reviews, prevPrice,newPrice}) => {
  return (
    <div>
      <Link to={`/mainpage/${(id)}`} key={id}>
        <section className='card'>
          <img src={img} alt={title} className='card-img'></img>
          <div className='card-details'>
            <h3 className='card-title'>{title}</h3>
            <section className='card-reviews'>
              {star} {star} {star} {star}
              <span className='total-reviews'>{reviews}</span>
            </section>
            <sections className='card-price'>
              <div className='price'>
                <del>{prevPrice}</del> {newPrice}
              </div>
              <div className='bag'>
                <BsFillBagHeartFill className='bag-icon'/>
              </div>
            </sections>
          </div>
        </section>
      </Link>
    </div>
  )
}

export default Cart
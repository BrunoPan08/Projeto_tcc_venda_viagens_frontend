import React from 'react';
import { useParams } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

const TravelDetail = ({ products }) => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const { img, title, star, reviews, prevPrice, newPrice } = product;

  return (
    <div>
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <div>
        {star} {star} {star} {star}
        <span>{reviews}</span>
      </div>
      <div>
        <del>{prevPrice}</del> {newPrice}
      </div>
    </div>
  );
};

export default TravelDetail;

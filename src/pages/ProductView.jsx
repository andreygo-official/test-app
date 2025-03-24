import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ProductView = () => {
    const {id} = useParams()
    const product = useSelector(state =>
        state.products.items.find(p => p.id === parseInt(id))
      );
      if (!product) 
      return <div>Product not found!</div>;
  return (
    <div>
      <h2>{product.name}</h2>
      <p>Count: {product.count}</p>
      <p>Weight: {product.weight}</p>
      <p>Size: {product.size.width}x{product.size.height}</p>
      <img src={product.imageUrl} alt={product.name} width="100" />
      <h3>Comments</h3>
      <ul>
        {product.comments?.map((comment, index) => (
          <li key={index}>{comment.description}</li>
        ))}
      </ul>
    </div>
  )
}

export default ProductView

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="product-detail-container">
      {product ? (
        <div className="product-detail-content">
          <div className="product-image">
            <img src={`http://localhost:5000/assets/${product.image}`} alt={product.name} />
          </div>
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;

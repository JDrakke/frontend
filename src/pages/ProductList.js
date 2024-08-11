import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState('');
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification('Producto agregado al carrito');
    setTimeout(() => setNotification(''), 3000); // Ocultar notificación después de 3 segundos
  };

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Catalog</h2>
      {notification && <div className="notification">{notification}</div>}
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            <img src={`http://localhost:5000/assets/${product.image}`} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <p className="product-description">{product.description}</p>
              <div className="product-actions">
                <button className="product-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                <Link to={`/products/${product._id}`} className="view-detail-button">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

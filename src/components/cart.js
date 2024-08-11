import React from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  // Función para manejar la eliminación de una cantidad específica
  const handleRemove = (productId, quantity) => {
    removeFromCart(productId, quantity);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map(product => (
            <li key={product._id} className="cart-item">
              <img src={`${process.env.PUBLIC_URL}/assets/${product.image}`} alt={product.name} className="cart-image" />
              <div className="cart-info">
                <h3 className="cart-name">{product.name}</h3>
                <p className="cart-price">${product.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button
                    className="quantity-button"
                    onClick={() => handleRemove(product._id, 1)}
                  >
                    Remove 1
                  </button>
                  <span className="quantity-display">{product.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleRemove(product._id, product.quantity)}
                  >
                    Remove All
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
  
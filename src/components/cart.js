import React from 'react';
import { useCart } from '../context/CartContext'; 
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart } = useCart(); 

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map(product => (
            <li key={product._id} className="cart-item">
              <img src={product.imageUrl} alt={product.name} className="cart-image" />
              <div className="cart-info">
                <h3 className="cart-name">{product.name}</h3>
                <p className="cart-price">${product.price.toFixed(2)}</p>
                <button className="remove-button" onClick={() => removeFromCart(product._id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;

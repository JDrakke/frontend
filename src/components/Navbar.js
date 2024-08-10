import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart, removeFromCart } = useCart();

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleCheckoutClick = () => {
    setShowCart(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">Shoppers</Link>
        </div>
        <ul className="navbar-list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/checkout">Checkout</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
        <div className="navbar-cart">
          <button className="cart-button" onClick={toggleCart}>
            <FaShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </button>
          {showCart && (
            <div className="cart-dropdown">
              <h3>Your Cart</h3>
              <ul className="cart-items">
                {cart.map(item => (
                  <li key={item._id} className="cart-item">
                    <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    </div>
                    <button className="remove-button" onClick={() => removeFromCart(item._id)}>Remove</button>
                  </li>
                ))}
              </ul>
              <Link to="/checkout" className="checkout-button" onClick={handleCheckoutClick}>Iniciar Pago</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

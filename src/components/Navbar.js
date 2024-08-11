import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart, removeFromCart } = useCart();

  const toggleCart = () => {
    setShowCart(prevState => !prevState);
  };

  const handleRemove = (productId, quantity) => {
    removeFromCart(productId, quantity);
  };

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
              <span className="cart-count">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
            )}
          </button>
          {showCart && (
            <div className={`cart-dropdown ${showCart ? 'show' : ''}`}>
              <h3>Your Cart</h3>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  <ul className="cart-items">
                    {cart.map(item => (
                      <li key={item._id} className="cart-item">
                        <img 
                          src={`${process.env.PUBLIC_URL}/assets/${item.imageUrl}`} 
                          alt={item.name} 
                          className="cart-item-image" 
                        />
                        <div className="cart-item-details">
                          <p className="cart-item-name">{item.name}</p>
                          <p className="cart-item-price">${item.price.toFixed(2)}</p>
                          <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                        </div>
                        <div className="cart-item-controls">
                          <button 
                            className="remove-button" 
                            onClick={() => handleRemove(item._id, 1)}
                          >
                            Remove 1
                          </button>
                          <button 
                            className="remove-button" 
                            onClick={() => handleRemove(item._id, item.quantity)}
                          >
                            Remove All
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="cart-summary">
                    <p className="cart-total">Total: ${totalPrice.toFixed(2)}</p>
                    <Link 
                      to="/checkout" 
                      className="checkout-button" 
                      onClick={() => setShowCart(false)}
                    >
                      Checkout
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

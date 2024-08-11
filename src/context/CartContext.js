import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item._id === product._id);
      if (existingProduct) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Eliminar cantidad específica de un producto del carrito
  const removeFromCart = (productId, quantityToRemove = 1) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item._id === productId);
      if (existingProduct) {
        if (existingProduct.quantity > quantityToRemove) {
          return prevCart.map(item =>
            item._id === productId
              ? { ...item, quantity: item.quantity - quantityToRemove }
              : item
          );
        } else {
          return prevCart.filter(item => item._id !== productId);
        }
      }
      return prevCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

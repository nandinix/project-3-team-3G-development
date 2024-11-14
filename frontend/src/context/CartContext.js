import React, { createContext, useContext, useState } from 'react';

// Create a Context for the cart
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component to wrap app and provide the cart context
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to the cart with a specified quantity
  const addToCart = (item, quantity) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.menu_item_id === item.menu_item_id
      );
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  // Remove item from the cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.menu_item_id !== itemId));
  };

  // Checkout function to process the order
  const checkout = async () => {
    try {
      const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // Send a request to your backend to process the order
      const response = await fetch('/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: cart, totalAmount })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Order successfully placed!');
        setCart([]); // Clear the cart after successful checkout
      } else {
        alert('Error processing order: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing order');
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, checkout, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

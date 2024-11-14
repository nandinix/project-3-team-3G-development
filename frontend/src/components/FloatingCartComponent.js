// src/components/FloatingCartButton.js
import React from 'react';
import './FloatingCartComponent.css';

function FloatingCartComponent({ cart }) {
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="floating-cart">
      <button onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
        View Cart - ${totalAmount.toFixed(2)}
      </button>
    </div>
  );
}

export default FloatingCartComponent;

import React from 'react';
import { useCart } from '../context/CartContext'; // Import the useCart hook
import { Link } from 'react-router-dom'; // Import Link for navigation
import Header from '../components/Header';
import './CartPage.css';

function CartPage() {
  const { cart, removeFromCart, setCart } = useCart(); // Include setCart for clearing the cart after checkout

  // Calculate the total price by multiplying price with quantity for each item
  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0); // Start with 0 as the initial total

  // Checkout function to send the POST request to the backend
  const checkout = async () => {
    // try {
      const response = await fetch('http://localhost:5000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cart,
          totalAmount: totalPrice,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Order placed successfully!');
        setCart([]); // Clear the cart after successful order
      } else {
        alert('Error placing order: ' + data.message);
      }
    // } catch (error) {
    //   console.error('Error during checkout:', error);
    //   alert('An error occurred during checkout.');
    // }
  };

  return (
    <div className="cart-page">
    <div>
        <Header /> {/* Render Header at the top */}
      <h1>Your Cart</h1>

      {/* Display cart items */}
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.menu_item_id} className="cart-item">
              <img src={item.image_url} alt={item.name} />
              <h3>{item.name}</h3>
              <div className="price">${item.price}</div>
              <div className="quantity">Quantity: {item.quantity}</div>
              <div className="item-total">
                Item Total: ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                className="remove-item"
                onClick={() => removeFromCart(item.menu_item_id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
      </div>

      {/* Display the total price */}
      <div className="total-price">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div>

      {/* Link back to the menu page */}
      <Link to="/menu">
        <button className="return-to-menu">
             Back to Menu
        </button>
      </Link>

      {/* Pay button to trigger checkout */}
      <button className="pay-button" onClick={checkout}>
        Pay
      </button>
    </div>
  );
}

export default CartPage;

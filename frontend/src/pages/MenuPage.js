import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MenuPage.css'; // Ensure CSS is imported
import Header from '../components/Header';
import { useCart } from '../context/CartContext'; // Import the useCart hook
import { Link } from 'react-router-dom'; // Import Link for navigation

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Side'); // Default tab
  const { cart, addToCart } = useCart(); // Use cart and addToCart from context

  // Function to fetch menu items from the API
  const fetchMenuItems = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/query', {
        query: 'SELECT * FROM menu_items',
      });
      setMenuItems(response.data);
      setFilteredItems(response.data.filter(item => item.category === 'Side')); // Default to "Side"
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  // Function to filter items based on selected category
  const filterItemsByCategory = (category) => {
    setSelectedTab(category);
    setFilteredItems(menuItems.filter(item => item.category === category));
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, parseInt(e.target.value) || 1); // Ensure quantity is at least 1
    e.target.value = newQuantity;
  };

  // Handle adding item to cart with quantity
  const handleAddToCart = (item, quantity) => {
    addToCart(item, quantity);  // Pass both item and quantity
  };

  return (
    <div className="menu-page">
      <Header /> {/* Render Header at the top */}
      <h1></h1>

      {/* Tab navigation */}
      <div className="tabs">
        <button className={`tab ${selectedTab === 'Side' ? 'active' : ''}`} onClick={() => filterItemsByCategory('Side')}>Sides</button>
        <button className={`tab ${selectedTab === 'Entree' ? 'active' : ''}`} onClick={() => filterItemsByCategory('Entree')}>Entrees</button>
        <button className={`tab ${selectedTab === 'Appetizer' ? 'active' : ''}`} onClick={() => filterItemsByCategory('Appetizer')}>Appetizers</button>
        <button className={`tab ${selectedTab === 'Drink' ? 'active' : ''}`} onClick={() => filterItemsByCategory('Drink')}>Drinks</button>
        <button className={`tab ${selectedTab === 'Sauces' ? 'active' : ''}`} onClick={() => filterItemsByCategory('Sauces')}>Sauces</button>
      </div>

      {/* Display filtered menu items in a grid */}
      <div className="menu-items-container">
        {filteredItems.map((item) => (
          <div key={item.menu_item_id} className="menu-item">
            <img src={item.image_url} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="price">${item.price}</div>

            {/* Quantity input field with up and down buttons */}
            <div className="quantity-container">
              <button
                className="quantity-button"
                onClick={(e) => {
                  const input = e.target.nextElementSibling; // Get the input element
                  input.value = Math.max(1, (parseInt(input.value) || 1) - 1); // Decrease quantity
                }}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="quantity-input"
                onChange={(e) => handleQuantityChange(e)} // This handles the input change
                id={`quantity-${item.menu_item_id}`} // Adding unique ID for each item
              />
              <button
                className="quantity-button"
                onClick={(e) => {
                  const input = e.target.previousElementSibling; // Get the input element
                  input.value = Math.max(1, (parseInt(input.value) || 1) + 1); // Increase quantity
                }}
              >
                +
              </button>
              <button
                className="add-to-cart"
                onClick={() => handleAddToCart(item, parseInt(document.getElementById(`quantity-${item.menu_item_id}`).value))}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart button linking to the CartPage */}
      <Link to="/cart">
        <button className="cart-button">🛒</button>
      </Link>
    </div>
  );
}

export default MenuPage;

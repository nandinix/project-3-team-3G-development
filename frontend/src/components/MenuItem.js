// // src/components/MenuItem.js
// import React from 'react';
// import './MenuItem.css';

// const MenuItem = ({ item }) => {
//   const handleAddToCart = () => {
//     // Implement addToCart function logic
//   };

//   return (
//     <div className="menu-item">
//       <h3>{item.name}</h3>
//       <p>{item.description}</p>
//       <p className="price">${item.price.toFixed(2)}</p>
//       <button onClick={handleAddToCart}>Add</button>
//     </div>
//   );
// };

// export default MenuItem;

import React from 'react';
import './MenuItem.css';

const MenuItem = ({ item, onAddToCart }) => {
  return (
    <div className="menu-item">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p className="price">${Number(item.price).toFixed(2)}</p> {/* Ensuring proper formatting */}
      {item.image_url && <img src={item.image_url} alt={item.name} className="menu-item-image" />} {/* Image display */}
      <button onClick={() => onAddToCart(item)}>Add to Cart</button>
    </div>
  );
};

export default MenuItem;



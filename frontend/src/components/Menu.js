// // src/components/Menu.js
// import React, { useEffect, useState } from 'react';
// import MenuItem from './MenuItem';
// import './Menu.css';

// const Menu = () => {
//   const [menuCategories, setMenuCategories] = useState({
//     Side: [],
//     Entree: [],
//     Appetizer: [],
//   });

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       const response = await fetch('http://localhost:5000/api/query', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query: 'SELECT * FROM menu_items' })
//       });
//       const items = await response.json();
//       categorizeMenuItems(items);
//     };

//     const categorizeMenuItems = (items) => {
//       const categories = { Side: [], Entree: [], Appetizer: [] };
//       items.forEach(item => {
//         if (categories[item.category]) categories[item.category].push(item);
//       });
//       setMenuCategories(categories);
//     };

//     fetchMenuItems();
//   }, []);

//   return (
//     <div className="menu-container">
//       <h1>Panda Express Menu</h1>
//       {Object.entries(menuCategories).map(([category, items]) => (
//         <div key={category}>
//           <h2 className="category-title">{category}</h2>
//           <div className="menu-categories">
//             {items.map(item => (
//               <MenuItem key={item.menu_item_id} item={item} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Menu;

import React from 'react';
import MenuItem from './MenuItem';
import './Menu.css';

const Menu = ({ menuItems }) => {
  const menuCategories = {
    Side: [],
    Entree: [],
    Appetizer: [],
  };

  // Categorize items
  menuItems.forEach(item => {
    if (menuCategories[item.category]) {
      menuCategories[item.category].push(item);
    }
  });

  return (
    <div className="menu-container">
      {Object.entries(menuCategories).map(([category, items]) => (
        items.length > 0 && (
          <div key={category}>
            <h2 className="category-title">{category}</h2>
            <div className="menu-categories">
              {items.map(item => (
                <MenuItem key={item.menu_item_id} item={item} />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default Menu;

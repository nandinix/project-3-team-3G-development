// import React from 'react';

// function Cart({ cart }) {
//   const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <div className="cart">
//       <h2>Your Order</h2>
//       {cart.map(item => (
//         <div key={item.menu_item_id}>
//           <p>{item.name} x {item.quantity}</p>
//           <p>${(item.price * item.quantity).toFixed(2)}</p>
//         </div>
//       ))}
//       <h3>Total: ${totalAmount.toFixed(2)}</h3>
//       <button>Submit Order</button>
//     </div>
//   );
// }

// export default Cart;

// async function submitOrder() {
//     try {
//       const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
//       const orderDate = new Date().toISOString();
  
//       const newOrder = await executeQuery(`
//         INSERT INTO orders (order_date, total_amount)
//         VALUES ($1, $2) RETURNING order_id
//       `, [orderDate, totalAmount]);
  
//       for (const item of cart) {
//         await executeQuery(`
//           INSERT INTO order_items (order_id, menu_item_id, quantity)
//           VALUES ($1, $2, $3)
//         `, [newOrder[0].order_id, item.menu_item_id, item.quantity]);
  
//         const ingredients = await executeQuery(`
//           SELECT inventory_item_id, quantity
//           FROM menu_item_ingredients
//           WHERE menu_item_id = $1
//         `, [item.menu_item_id]);
  
//         for (const ingredient of ingredients) {
//           await executeQuery(`
//             UPDATE inventory_items
//             SET quantity = quantity - $1
//             WHERE inventory_item_id = $2
//           `, [ingredient.quantity * item.quantity, ingredient.inventory_item_id]);
//         }
//       }
//       alert('Order submitted successfully!');
//     } catch (error) {
//       console.error('Order submission error:', error);
//       alert('Failed to submit order.');
//     }
//   }
  

import React from 'react';

function Cart({ cart }) {
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Your Order</h2>
      {cart.map(item => (
        <div key={item.menu_item_id}>
          <p>{item.name} x {item.quantity}</p>
          <p>${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      <h3>Total: ${totalAmount.toFixed(2)}</h3>
      <button>Submit Order</button>
    </div>
  );
}

export default Cart;

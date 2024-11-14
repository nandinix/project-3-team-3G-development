// const express = require('express');
// const { Pool } = require('pg');

// const app = express();
// app.use(express.json());

// const cors = require('cors');
// app.use(cors());

// const pool = new Pool({
//     user: 'team_3g',
//     host: 'csce-315-db.engr.tamu.edu',
//     database: 'team_3g_db',
//     password: 'magby',
//     port: 5432,
//   });

//   app.post('/api/query', async (req, res) => {
//     const { query, params } = req.body;
//     try {
//       const result = await pool.query(query, params);
//       res.json(result.rows);
//     } catch (error) {
//       console.error('Query error:', error);
//       res.status(500).json({ error: 'Query execution failed' });
//     }
//   });
  
// app.get('/api/test-connection', async (req, res) => {
//     try {
//       const result = await pool.query('SELECT NOW()');  // Simple query to get current time
//       res.json({ message: 'Connection successful', time: result.rows[0].now });
//     } catch (error) {
//       console.error('Database connection error:', error);
//       res.status(500).json({ error: 'Database connection failed' });
//     }
//   });
  
//   const PORT = 5000;  // This is the port for your Express server, not PostgreSQL
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });


const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: 'team_3g',
  host: 'csce-315-db.engr.tamu.edu',
  database: 'team_3g_db',
  password: 'magby',
  port: 5432,
});

// Route for general queries
app.post('/api/query', async (req, res) => {
  const { query, params } = req.body;
  console.log('endpoint hit'); // Add this log
  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ error: 'Query execution failed' });
  }
});

// Route to test database connection
app.get('/api/test-connection', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Connection successful', time: result.rows[0].now });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

//Route to handle the checkout
// THIS WORKS
app.post('/checkout', async (req, res) => {
  console.log('Checkout endpoint hit'); // Confirm the endpoint is being hit
  const { cartItems, totalAmount } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    console.log('Transaction started'); // Confirm transaction has started

    // Insert into orders
    const orderResult = await client.query(
      `INSERT INTO orders (order_date, total_amount) VALUES (NOW(), $1) RETURNING order_id`,
      [totalAmount]
    );
    const orderId = orderResult.rows[0].order_id;
    console.log('Added to orders');

    // Insert into order_items and update inventory for each cart item
    for (const item of cartItems) {
      await client.query(
        `INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)`,
        [orderId, item.menu_item_id, item.quantity]
      );
      console.log('Added to order items');

      const ingredients = await client.query(
        `SELECT inventory_item_id, quantity FROM menu_item_ingredients WHERE menu_item_id = $1`,
        [item.menu_item_id]
      );
      console.log(`Inventory Select for item ${item.menu_item_id}`);

      for (const ingredient of ingredients.rows) {
        console.log(`Updating inventory for ingredient ${ingredient.inventory_item_id}`);
        await client.query(
          `UPDATE inventory_items SET quantity = quantity - $1 WHERE inventory_item_id = $2`,
          [ingredient.quantity * item.quantity, ingredient.inventory_item_id]
        );
        console.log(`Inventory updated for item ${ingredient.inventory_item_id}`);
      }
    }

    await client.query('COMMIT');
    console.log('Transaction committed successfully');
    res.json({ message: 'Order placed successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error processing order:', error);
    res.status(500).json({ message: 'Error processing order' });
  } finally {
    client.release();
  }
});


// Get all inventory items
app.get('/api/inventory', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory_items');
    res.json(result.rows);
  } catch (error) {
    console.error('Failed to fetch inventory:', error);
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
});

// Add a new inventory item
app.post('/api/inventory', async (req, res) => {
  const { item_name, item_type, cost, quantity, reorder_level } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO inventory_items (item_name, item_type, cost, quantity, reorder_level) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [item_name, item_type, cost, quantity, reorder_level]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Failed to add inventory item:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// Update an inventory item
app.put('/api/inventory/:id', async (req, res) => {
  const { id } = req.params;
  const { item_name, item_type, cost, quantity, reorder_level } = req.body;
  try {
    const result = await pool.query(
      'UPDATE inventory_items SET item_name = $1, item_type = $2, cost = $3, quantity = $4, reorder_level = $5 WHERE inventory_item_id = $6 RETURNING *',
      [item_name, item_type, cost, quantity, reorder_level, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Failed to update inventory item:', error);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Delete an inventory item
app.delete('/api/inventory/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM inventory_items WHERE inventory_item_id = $1', [id]);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Failed to delete inventory item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});


// Get all employees
app.get('/api/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees');
    res.json(result.rows);
  } catch (error) {
    console.error('Failed to fetch employees:', error);
    res.status(500).json({ error: 'Failed to retrieve employees' });
  }
});

// Add a new employee
app.post('/api/employees', async (req, res) => {
  const { fname, lname, username, password, role } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO employees (fname, lname, username, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [fname, lname, username, password, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Failed to add employee:', error);
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

// Update an employee
app.put('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { fname, lname, username, password, role } = req.body;
  try {
    const result = await pool.query(
      'UPDATE employees SET fname = $1, lname = $2, username = $3, password = $4, role = $5 WHERE id = $6 RETURNING *',
      [fname, lname, username, password, role, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Failed to update employee:', error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

// Delete an employee
app.delete('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM employees WHERE id = $1', [id]);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Failed to delete employee:', error);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

// Get all menu items
app.get('/api/menu_items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu_items');
    res.json(result.rows);
  } catch (error) {
    console.error('Failed to fetch menu items:', error);
    res.status(500).json({ error: 'Failed to retrieve menu items' });
  }
});

// Add a new menu item
app.post('/api/menu_items', async (req, res) => {
  const { name, description, price, category, image_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO menu_items (name, description, price, category, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, category, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Failed to add menu item:', error);
    res.status(500).json({ error: 'Failed to add menu item' });
  }
});

// Update a menu item
app.put('/api/menu_items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image_url } = req.body;
  try {
    const result = await pool.query(
      'UPDATE menu_items SET name = $1, description = $2, price = $3, category = $4, image_url = $5 WHERE menu_item_id = $6 RETURNING *',
      [name, description, price, category, image_url, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Failed to update menu item:', error);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// Delete a menu item
app.delete('/api/menu_items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM menu_items WHERE menu_item_id = $1', [id]);
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Failed to delete menu item:', error);
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});



// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

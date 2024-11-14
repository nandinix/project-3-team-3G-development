import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import './InventoryManagementPage.css';
import Header from '../components/Header';

function InventoryTable() {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({ item_name: '', item_type: '', cost: '', quantity: '', reorder_level: '' });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem({ ...selectedItem, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/inventory/${selectedItem.inventory_item_id}`, selectedItem);
      fetchInventory();
      setSelectedItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = async () => {
    try {
      await axios.post('http://localhost:5000/api/inventory', newItem);
      fetchInventory();
      setNewItem({ item_name: '', item_type: '', cost: '', quantity: '', reorder_level: '' });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/inventory/${id}`);
      fetchInventory();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
        <Header />
    <div className="inventory-management">
      <Sidebar />

      <div className="content">
        <h1>Inventory Management</h1>

        <div className="form-section">
          <h2>Add New Item</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Item Name:
              <input type="text" name="item_name" value={newItem.item_name} onChange={handleNewItemChange} />
            </label>
            <label>Type:
              <input type="text" name="item_type" value={newItem.item_type} onChange={handleNewItemChange} />
            </label>
            <label>Cost:
              <input type="number" name="cost" value={newItem.cost} onChange={handleNewItemChange} />
            </label>
            <label>Quantity:
              <input type="number" name="quantity" value={newItem.quantity} onChange={handleNewItemChange} />
            </label>
            <label>Reorder Level:
              <input type="number" name="reorder_level" value={newItem.reorder_level} onChange={handleNewItemChange} />
            </label>
            <button onClick={handleAddItem}>Add Item</button>
          </form>
        </div>

        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Type</th>
                <th>Cost</th>
                <th>Quantity</th>
                <th>Reorder Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.inventory_item_id} onClick={() => handleRowClick(item)}>
                  <td>{item.item_name}</td>
                  <td>{item.item_type}</td>
                  <td>{item.cost}</td>
                  <td>{item.quantity}</td>
                  <td>{item.reorder_level}</td>
                  <td><button onClick={() => handleDelete(item.inventory_item_id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedItem && (
          <div className="edit-section">
            <h2>Edit Item</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>Item Name:
                <input type="text" name="item_name" value={selectedItem.item_name} onChange={handleInputChange} />
              </label>
              <label>Type:
                <input type="text" name="item_type" value={selectedItem.item_type} onChange={handleInputChange} />
              </label>
              <label>Cost:
                <input type="number" name="cost" value={selectedItem.cost} onChange={handleInputChange} />
              </label>
              <label>Quantity:
                <input type="number" name="quantity" value={selectedItem.quantity} onChange={handleInputChange} />
              </label>
              <label>Reorder Level:
                <input type="number" name="reorder_level" value={selectedItem.reorder_level} onChange={handleInputChange} />
              </label>
              <button onClick={handleUpdate}>Save Changes</button>
            </form>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default InventoryTable;

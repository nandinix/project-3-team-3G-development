import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './MenuManagementPage.css';

function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: '', image_url: '' });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menu_items');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
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
      await axios.put(`http://localhost:5000/api/menu_items/${selectedItem.menu_item_id}`, selectedItem);
      fetchMenuItems();
      setSelectedItem(null);
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = async () => {
    try {
      await axios.post('http://localhost:5000/api/menu_items', newItem);
      fetchMenuItems();
      setNewItem({ name: '', description: '', price: '', category: '', image_url: '' });
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu_items/${id}`);
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="menu-management">
        <Sidebar />

        <div className="content">
          <h1>Menu Management</h1>

          <div className="form-section">
            <h2>Add New Menu Item</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>Name:
                <input type="text" name="name" value={newItem.name} onChange={handleNewItemChange} />
              </label>
              <label>Description:
                <input type="text" name="description" value={newItem.description} onChange={handleNewItemChange} />
              </label>
              <label>Price:
                <input type="number" name="price" value={newItem.price} onChange={handleNewItemChange} />
              </label>
              <label>Category:
                <input type="text" name="category" value={newItem.category} onChange={handleNewItemChange} />
              </label>
              <label>Image URL:
                <input type="text" name="image_url" value={newItem.image_url} onChange={handleNewItemChange} />
              </label>
              <button onClick={handleAddItem}>Add Item</button>
            </form>
          </div>

          <div className="table-section">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.menu_item_id} onClick={() => handleRowClick(item)}>
                    <td><img src={item.image_url} alt={item.name} width="50" height="50" /></td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td><button onClick={() => handleDelete(item.menu_item_id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedItem && (
            <div className="edit-section">
              <h2>Edit Menu Item</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <label>Name:
                  <input type="text" name="name" value={selectedItem.name} onChange={handleInputChange} />
                </label>
                <label>Description:
                  <input type="text" name="description" value={selectedItem.description} onChange={handleInputChange} />
                </label>
                <label>Price:
                  <input type="number" name="price" value={selectedItem.price} onChange={handleInputChange} />
                </label>
                <label>Category:
                  <input type="text" name="category" value={selectedItem.category} onChange={handleInputChange} />
                </label>
                <label>Image URL:
                  <input type="text" name="image_url" value={selectedItem.image_url} onChange={handleInputChange} />
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

export default MenuManagementPage;

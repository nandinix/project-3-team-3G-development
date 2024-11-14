import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage'; 
import { CartProvider } from './context/CartContext';  
import InventoryManagementPage from './pages/InventoryManagementPage';
import MenuManagementPage from './pages/MenuManagementPage';
import EmployeeManagementPage from './pages/EmployeeManagementPage';

function App() {
  return (
    <CartProvider> {/* Wrap the router in CartProvider to provide cart context */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} /> 
          <Route path="/inventory" element={<InventoryManagementPage />} />
          <Route path="/employees" element={<EmployeeManagementPage />} />
          <Route path="/managemenu" element={<MenuManagementPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;


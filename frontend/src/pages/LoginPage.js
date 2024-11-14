import React, { useState } from 'react';
import './LoginPage.css';
import Header from '../components/Header';
import { executeQuery } from './db';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ManagerPage from './managerPage';
import MenuPage from './MenuPage';

function LoginPage() {
  const [activeLogin, setActiveLogin] = useState('Customer'); // default active login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = (role) => {
    console.log(`Logging in as ${role}`);

    switch (role) {
      case 'Manager':
          loginManager(email, password);
          break;

      case 'Cashier':
          loginCashier(email, password);
          break;

      case 'Customer':
          loginCustomer(email, password);
          break;

      default:
          console.error("Invalid role");
          return;
    }
  };

  const loginManager = async (email, password) => {
    const query = 'SELECT role FROM employees WHERE username = $1 AND password = $2;';
    const params = [email, password];
    try {
      const result = await executeQuery(query, params);
      if (result.length === 1 && result[0].role === 'manager') {
        console.log("Manager Login Successful");
        navigate('/managemenu'); // Navigate to ManagerPage
      } else {
        console.log("Invalid Account details or not a manager");
      }
    } catch (error) {
      console.log('Invalid Account details');
    }
  };

  const loginCashier = async (email, password) => {
    const query = 'SELECT role FROM employees WHERE username = $1 AND password = $2;';
    const params = [email, password];
    try {
      const result = await executeQuery(query, params);
      if (result.length === 1 && result[0].role === 'cashier') {
        console.log("Cashier Login Successful");
        navigate('/menu'); // Navigate to MenuPage
      } else {
        console.log("Invalid Account details or not a cashier");
      }
    } catch (error) {
      console.log('Invalid Account details');
    }
  };

  const loginCustomer = (email, password) => {
    console.log("Customer");
    console.log(email);
    console.log(password);
  };

  return (
    <div>
      <Header /> {/* Render Header at the top */}
      <div className="login-container">
        <div className="logo-header"></div>
        <div className="login-box">
          <div className="login-options">
            <button className={`login-toggle ${activeLogin === 'Manager' ? 'active' : ''}`} onClick={() => setActiveLogin('Manager')}>Manager Login</button>
            <button className={`login-toggle ${activeLogin === 'Cashier' ? 'active' : ''}`} onClick={() => setActiveLogin('Cashier')}>Cashier Login</button>
            <button className={`login-toggle ${activeLogin === 'Customer' ? 'active' : ''}`} onClick={() => setActiveLogin('Customer')}>Customer Login</button>
          </div>

          {activeLogin === 'Manager' && (
            <div className="login-form">
              <h2>Manager Login</h2>
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="sign-in-btn" onClick={() => handleLogin('Manager')}>Sign in</button>
            </div>
          )}

          {activeLogin === 'Cashier' && (
            <div className="login-form">
              <h2>Cashier Login</h2>
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="sign-in-btn" onClick={() => handleLogin('Cashier')}>Sign in</button>
            </div>
          )}

          {activeLogin === 'Customer' && (
            <div className="login-form">
              <h2>Customer Login</h2>
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="sign-in-btn" onClick={() => handleLogin('Customer')}>Sign in</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
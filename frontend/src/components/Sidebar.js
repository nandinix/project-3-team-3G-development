
import React from 'react';
import { Link } from 'react-router-dom';  
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Panda Express</h2>
      <p>Welcome!</p>
      <nav>
        {/* Use Link instead of buttons for navigation */}
        <Link to="/dashboard"><button>Dashboard</button></Link>
        <Link to="/inventory"><button>Inventory</button></Link>
        <Link to="/managemenu"><button>Menu Management</button></Link>
        <Link to="/employees"><button>Employees</button></Link>
      </nav>
      <button className="signout">Sign Out</button>
    </div>
  );
}

export default Sidebar;

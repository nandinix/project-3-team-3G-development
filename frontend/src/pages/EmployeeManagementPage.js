import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './EmployeeManagementPage.css';

function EmployeeManagementPage() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    fname: '',
    lname: '',
    username: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee({ ...selectedEmployee, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/employees/${selectedEmployee.id}`, selectedEmployee);
      fetchEmployees();
      setSelectedEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleNewEmployeeChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = async () => {
    try {
      await axios.post('http://localhost:5000/api/employees', newEmployee);
      fetchEmployees();
      setNewEmployee({ fname: '', lname: '', username: '', password: '', role: '' });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="employee-management">
        <Sidebar />

        <div className="content">
          <h1>Employee Management</h1>

          <div className="form-section">
            <h2>Add New Employee</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>First Name:
                <input type="text" name="fname" value={newEmployee.fname} onChange={handleNewEmployeeChange} />
              </label>
              <label>Last Name:
                <input type="text" name="lname" value={newEmployee.lname} onChange={handleNewEmployeeChange} />
              </label>
              <label>Username:
                <input type="text" name="username" value={newEmployee.username} onChange={handleNewEmployeeChange} />
              </label>
              <label>Password:
                <input type="password" name="password" value={newEmployee.password} onChange={handleNewEmployeeChange} />
              </label>
              <label>Role:
                <input type="text" name="role" value={newEmployee.role} onChange={handleNewEmployeeChange} />
              </label>
              <button onClick={handleAddEmployee}>Add Employee</button>
            </form>
          </div>

          <div className="table-section">
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id} onClick={() => handleRowClick(employee)}>
                    <td>{employee.fname}</td>
                    <td>{employee.lname}</td>
                    <td>{employee.username}</td>
                    <td>{employee.role}</td>
                    <td><button onClick={() => handleDelete(employee.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedEmployee && (
            <div className="edit-section">
              <h2>Edit Employee</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <label>First Name:
                  <input type="text" name="fname" value={selectedEmployee.fname} onChange={handleInputChange} />
                </label>
                <label>Last Name:
                  <input type="text" name="lname" value={selectedEmployee.lname} onChange={handleInputChange} />
                </label>
                <label>Username:
                  <input type="text" name="username" value={selectedEmployee.username} onChange={handleInputChange} />
                </label>
                <label>Role:
                  <input type="text" name="role" value={selectedEmployee.role} onChange={handleInputChange} />
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

export default EmployeeManagementPage;

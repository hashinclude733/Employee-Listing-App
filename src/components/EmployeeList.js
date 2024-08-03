import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EmployeeList.css';
import { ToastContainer, toast } from 'react-toastify';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const headers = {
      'projectId': '66ab3f666397d3eb039cacc2',
      'environmentId': '66ab3f666397d3eb039cacc3'
    };

    fetch('https://free-ap-south-1.cosmocloud.io/development/api/employee?limit=10&offset=0', {
      method: 'GET',
      headers: headers
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setEmployees(data.data);
        } else {
          console.error('API returned non-array data:', data);
          setEmployees([]); // Set a default value
        }
      });
  }, []);

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      console.log('Deleting employee with ID:', id);
      fetch(`https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`, {
        method: 'DELETE',
        headers: {
          'projectId': '66ab3f666397d3eb039cacc2',
          'environmentId': '66ab3f666397d3eb039cacc3',
          'Content-Type': 'application/json' // Optional: Ensures the body is treated as JSON
        },
        body: JSON.stringify({}) // Adding an empty body
      })
        .then((response) => {
          console.log('Response status:', response.status);
          // Since Fetch doesn't automatically parse JSON, you need to do it manually if needed
          return response.json().then(data => {
            console.log('Response data:', data);
            if (response.ok) {
              setEmployees(employees.filter((employee) => employee._id !== id));
              toast.success('Employee deleted successfully!');
            } else {
              throw new Error('Failed to delete employee');
            }
          });
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
          // Since Fetch doesn't provide error.config, the code will not reach this block for Fetch
          console.log('No additional request config information available.');
        });
    }
  };

  return (
    <div>
      <nav className="nav-bar">
        <h1>Employee List</h1>
        <div className="nav-bar-actions">
          <Link to="/add">
            <button className="add-button">Add</button>
          </Link>
        </div>
      </nav>
      <div className="card-container">
        {employees.length === 0 ? (
          <p className="no-employees-message">No employees in the system</p>
        ) : (
          employees.map((employee) => (
            <div key={employee._id} className="card">
              <h2>{employee.name}</h2>
              <p>Employee ID: {employee._id}</p>
              <Link to={`/${employee._id}`}>
                <button className="view-button">View Details</button>
              </Link>
              <button className="delete-button" onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmployeeList;


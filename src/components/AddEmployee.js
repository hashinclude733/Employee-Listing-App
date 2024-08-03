import React, { useState, useEffect } from 'react';
import './AddEmployee.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    country: '',
    zipCode: '',
  });
  const [contactMethods, setContactMethods] = useState({
    email: '',
    phone: '',
  });
  const [isEmployeeCreated, setIsEmployeeCreated] = useState(false);

  const notifySuccess = () => toast.success("Employee Created");
  const notifyError = (message) => toast.error(message);

  useEffect(() => {
    if (isEmployeeCreated) {
      notifySuccess();
      setIsEmployeeCreated(false);
    }
  }, [isEmployeeCreated]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  const handleCreateEmployee = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validation
    if (!name || !address.line1 || !address.city || !address.country || !address.zipCode || !contactMethods.email || !contactMethods.phone) {
      notifyError('Please fill in all fields');
      return;
    }

    if (!validateEmail(contactMethods.email)) {
      notifyError('Invalid email address');
      return;
    }

    if (!validatePhone(contactMethods.phone)) {
      notifyError('Invalid Phone Number');
      return;
    }

    const employeeData = {
      name,
      address,
      contactMethods: [
        { contactMethod: 'email', value: contactMethods.email },
        { contactMethod: 'phone', value: contactMethods.phone },
      ],
    };
    console.log('Employee Data:', employeeData);

    fetch('https://free-ap-south-1.cosmocloud.io/development/api/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'projectId': '66ab3f666397d3eb039cacc2',
        'environmentId': '66ab3f666397d3eb039cacc3',
      },
      body: JSON.stringify(employeeData),
    })
      .then((response) => response.json())
      .then(() => {
        setIsEmployeeCreated(true);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="add-employee-container">
      <h1>Add Employee</h1>
      <form className="add-employee-form" onSubmit={handleCreateEmployee}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address.line1}
            onChange={(e) => setAddress({ ...address, line1: e.target.value })}
            className="form-input"
          />
        </label>
        <label>
          City:
          <input
            type="text"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="form-input"
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            value={address.country}
            onChange={(e) => setAddress({ ...address, country: e.target.value })}
            className="form-input"
          />
        </label>
        <label>
          Zip Code:
          <input
            type="text"
            value={address.zipCode}
            onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
            className="form-input"
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={contactMethods.email}
            onChange={(e) => setContactMethods({ ...contactMethods, email: e.target.value })}
            className="form-input"
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            value={contactMethods.phone}
            onChange={(e) => setContactMethods({ ...contactMethods, phone: e.target.value })}
            className="form-input"
          />
        </label>
        <button type="submit" className="form-button">
          Create Employee
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default AddEmployee;



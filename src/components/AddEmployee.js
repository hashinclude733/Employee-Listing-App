import React, { useState } from 'react';
import './AddEmployee.css';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    country: '',
    zipCode: '',
  });
  const [contactMethods, setContactMethods] = useState([
    {
      contactMethod: 'email',
      value: '',
    },
    {
      contactMethod: 'phone',
      value: '',
    },
  ]);

  const handleCreateEmployee = () => {
    const employeeData = {
      name,
      address: {
        line1: address.line1,
        city: address.city,
        country: address.country,
        zipCode: address.zipCode,
      },
      contactMethods,
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
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="add-employee-container">
      <h1>Add Employee</h1>
      <form className="add-employee-form">
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
          Contact Methods:
          {contactMethods.map((contactMethod, index) => (
            <div key={index} className="contact-method">
              <select
                value={contactMethod.contactMethod}
                onChange={(e) =>
                  setContactMethods(
                    contactMethods.map((cm, i) =>
                      i === index ? { ...cm, contactMethod: e.target.value } : cm
                    )
                  )
                }
                className="form-select"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
              <input
                type="text"
                value={contactMethod.value}
                onChange={(e) =>
                  setContactMethods(
                    contactMethods.map((cm, i) =>
                      i === index ? { ...cm, value: e.target.value } : cm
                    )
                  )
                }
                className="form-input"
              />
            </div>
          ))}
        </label>
        <button onClick={handleCreateEmployee} className="form-button">
          Create Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
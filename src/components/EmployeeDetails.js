import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    console.log('Fetching employee details for ID:', id);
    axios.get(`https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`, {
      headers: {
        'projectId': '66ab3f666397d3eb039cacc2',
        'environmentId': '66ab3f666397d3eb039cacc3'
      }
    })
      .then(response => {
        console.log('Response data:', response.data);
        setEmployee(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee details:', error);
        console.log('Request URL:', error.config.url);
        console.log('Request headers:', error.config.headers);
        console.log('Request data:', error.config.data);
      });
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div>
      <h1>{employee.name} </h1>
      <p>Address: {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zipCode}</p>
      <h3>Contact Methods:</h3>
      <ul>
        {employee.contactMethods.map((contact, index) => (
          <li key={index}>{contact.contactMethod}: {contact.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDetail;

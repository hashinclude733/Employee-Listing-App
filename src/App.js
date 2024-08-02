import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import AddEmployee from './components/AddEmployee';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/:id" element={<EmployeeDetails />} />
        <Route path="/add" element={<AddEmployee />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
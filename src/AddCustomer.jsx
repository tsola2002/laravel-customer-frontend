//import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddCustomer() {
  const [formData, setFormData] = useState({
    name: '', email: '', type: '', address: '', city: '', state: '', postalCode: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/v1/customers', formData)
      .then(() => navigate('/'))
      .catch(error => console.error('Error adding customer:', error));
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {Object.keys(formData).map((field) => (
        <div key={field} className="mb-4">
          <label className="block mb-2">{field}</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
      ))}
      <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">Add Customer</button>
    </form>
  );
}

export default AddCustomer
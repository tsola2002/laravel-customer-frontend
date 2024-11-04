import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditCustomer() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/v1/customers/${id}`)
      .then(response => setFormData(response.data))
      .catch(error => console.error('Error fetching customer:', error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/v1/customers/${id}`, formData)
      .then(() => navigate('/'))
      .catch(error => console.error('Error updating customer:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {Object.keys(formData).map((field) => (
        <div key={field} className="mb-4">
          <label className="block mb-2">{field}</label>
          <input
            type="text"
            name={field}
            value={formData[field] || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
      ))}
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Update Customer</button>
    </form>
  );
}

export default EditCustomer;

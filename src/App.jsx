import { Link, Route, Routes } from "react-router-dom"
import Customers from "./Customers"
import AddCustomer from "./AddCustomer"
import EditCustomer from "./EditCustomer"

function App() {
  return (
    <div className="container mx-auto p-6">
      <nav className="flex justify-between mb-8">
        <Link to="/" className="text-xl font-bold">Customer App</Link>
        <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded">Add Customer</Link>
      </nav>

      laravel react
      <Routes>
        <Route path="/" element={<Customers />} />
        <Route path="/add" element={<AddCustomer />} />
        <Route path="/edit/:id" element={<EditCustomer />} />
      </Routes>
    </div>
  )
}

export default App

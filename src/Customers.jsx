import  { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerList = () => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});

    const fetchCustomers = async (url) => {
        const response = await axios.get(url);
        setData(response.data.data);
        setPagination({
            next: response.data.links.next,
            prev: response.data.links.prev,
            pages: response.data.meta.links,
            currentPage: response.data.meta.current_page,
            lastPage: response.data.meta.last_page,
            totalRecords: response.data.meta.total
        });
    };

    useEffect(() => {
        fetchCustomers("http://127.0.0.1:8000/api/v1/customers?page=1");
    }, []);

    return (
        <div className="max-w-5xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer List</h1>

            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                        <th className=" text-left text-sm font-semibold text-gray-700">ID</th>
                        <th className=" text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className=" text-left text-sm font-semibold text-gray-700">Type</th>
                        <th className=" text-left text-sm font-semibold text-gray-700">Email</th>
                        <th className=" text-left text-sm font-semibold text-gray-700">Address</th>
                        <th className=" text-left text-sm font-semibold text-gray-700">City</th>
                        <th className=" text-left text-sm font-semibold text-gray-700">State</th>
                        <th className=" text-left text-sm font-semibold text-gray-700">Postal Code</th>
                        <th className=" text-center text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600">
                    {data.map(customer => (
                        <tr key={customer.id} className="border-b border-gray-200">
                            <td className="">{customer.id}</td>
                            <td className="">{customer.name}</td>
                            <td className="">{customer.type === "I" ? "Individual" : "Business"}</td>
                            <td className="">{customer.email}</td>
                            <td className="">{customer.address}</td>
                            <td className="">{customer.city}</td>
                            <td className="">{customer.state}</td>
                            <td className="">{customer.postalCode}</td>
                            <td className=" text-center space-x-2">
                                <button className="text-blue-600 hover:underline">Edit</button>
                                <button className="text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-6 flex justify-between items-center">
                <button
                    onClick={() => fetchCustomers(pagination.prev)}
                    disabled={!pagination.prev}
                    className=" text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>

                <div className="flex items-center space-x-2">
                    {pagination.pages && pagination.pages.map((page, index) => (
                        <button
                            key={index}
                            onClick={() => page.url && fetchCustomers(page.url)}
                            className={` text-sm rounded ${
                                page.active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                            }`}
                            disabled={!page.url}
                        >
                            {page.label.replace("&laquo;", "«").replace("&raquo;", "»")}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => fetchCustomers(pagination.next)}
                    disabled={!pagination.next}
                    className=" text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>

            <p className="mt-2 text-center text-gray-500 text-sm">
                Total Records: {pagination.totalRecords}
            </p>
        </div>
    );
};

export default CustomerList;

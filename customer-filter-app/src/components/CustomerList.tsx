import React from 'react';
import './style.css';

const customers = [
    { id: 1, firstName: 'John', lastName: 'Doe', companyName: 'Google' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', companyName: 'Microsoft' },
    { id: 3, firstName: 'Jim', lastName: 'Beam', companyName: 'Amazon' }
];

const CustomerList = () => {
    return (
        <div className="customer-list-container">
            <h2 className="customer-list-heading">Customer List</h2>
            <ul className="customer-list">
                {customers.map(customer => (
                    <li key={customer.id} className="customer-item">
                        <strong>{customer.firstName} {customer.lastName}</strong> - {customer.companyName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;
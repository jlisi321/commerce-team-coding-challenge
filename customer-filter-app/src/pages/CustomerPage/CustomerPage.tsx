import React, { useState, useEffect } from 'react';
import Customer from '../../types/customer';
import CustomerList from './CustomerList';
import './style.css';
import { fetchCustomers } from '../../services/api';

const CustomerPage: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);

    // useEffect hook to fetch customers data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCustomers();
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="customer-page-container">
            <h1>Customer Page</h1>
            <CustomerList customers={customers} />
        </main>
    );
};

export default CustomerPage;
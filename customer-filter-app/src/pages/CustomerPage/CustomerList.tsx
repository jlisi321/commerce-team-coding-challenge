import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Customer } from '../../types/customer';
import { Filter, Sort } from '../../components';

// Define props interface for CustomerList component
interface CustomerListProps {
    customers: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers); // State hook for filtered customers
    const [sortOption, setSortOption] = useState<string>(''); // State hook for selected sorting option
    const [selectedCompany, setSelectedCompany] = useState<string>(''); // State hook for selected company filter

    // Effect hook to handle filtering and sorting based on URL query parameters and customers data
    useEffect(() => {
        const params = new URLSearchParams(location.search); // Create URLSearchParams object from location.search
        const company = params.get('company') || ''; // Get 'company' parameter from URL query or default to empty string
        const sort = params.get('sort_by') || ''; // Get 'sort_by' parameter from URL query or default to empty string
        const order = params.get('order') || 'asc'; // Get 'order' parameter from URL query or default to 'asc'

        setSelectedCompany(company);
        setSortOption(`${sort}_${order}`);

        let filtered = customers;
        if (company) {
            // If 'company' filter is applied, filter customers by company name
            filtered = filtered.filter(customer => customer.companyName === company);
        }

        if (sort) {
            // If 'sort_by' parameter is provided, sort filtered customers
            filtered = filtered.sort((a, b) => {
                if (a[sort as keyof Customer] < b[sort as keyof Customer]) {
                    return order === 'asc' ? -1 : 1; // Sort ascending or descending based on 'order' parameter
                }
                if (a[sort as keyof Customer] > b[sort as keyof Customer]) {
                    return order === 'asc' ? 1 : -1; // Sort ascending or descending based on 'order' parameter
                }
                return 0;
            });
        }

        setFilteredCustomers(filtered); // Update filteredCustomers state with sorted/filtered data
    }, [customers, location.search]); // Run useEffect when customers data or location.search changes

    // Handler function to update company filter based on selected company
    const handleCompanyChange = (company: string) => {
        const params = new URLSearchParams(location.search); // Create URLSearchParams object from location.search
        if (company) {
            params.set('company', company); // Set 'company' parameter in URL query if company is selected
        } else {
            params.delete('company'); // Delete 'company' parameter from URL query if no company is selected
        }
        navigate(`?${params.toString()}`); // Navigate to new URL with the latest query params
    };

    // Handler function to update sort option based on selected sort
    const handleSortChange = (sort: string) => {
        const [key, order] = sort.split('_'); // Split sort option into key and order parts
        const params = new URLSearchParams(location.search); // Create URLSearchParams object from location.search
        if (key) {
            // Set 'sort_by' and 'order' parameter in URL query with key part of sort option
            params.set('sort_by', key);
            params.set('order', order);
        } else {
            // Delete 'sort_by' and 'order' parameter from URL query if no sort option is selected
            params.delete('sort_by');
            params.delete('order');
        }
        navigate(`?${params.toString()}`); // Navigate to new URL with latest query parameters
    };

    // Create array of unique company names from customers data
    const companies = Array.from(new Set(customers.map(customer => customer.companyName)));

    // Define sort options for dropdown
    const sortOptions = [
        { value: '', label: 'None' },
        { value: 'firstName_asc', label: 'First Name (Ascending)' },
        { value: 'firstName_desc', label: 'First Name (Descending)' },
        { value: 'lastName_asc', label: 'Last Name (Ascending)' },
        { value: 'lastName_desc', label: 'Last Name (Descending)' },
        { value: 'companyName_asc', label: 'Company Name (Ascending)' },
        { value: 'companyName_desc', label: 'Company Name (Descending)' },
    ];

    return (
        <div>
            <h2>Customer List</h2>
            <Filter
                label="Filter by Company"
                options={companies}
                selectedOption={selectedCompany}
                onOptionChange={handleCompanyChange}
            />
            <Sort
                options={sortOptions}
                selectedOption={sortOption}
                onSortChange={handleSortChange}
            />
            <ul>
                {/* Render filtered customers as list items */}
                {filteredCustomers.map(customer => (
                    <li key={customer.id}>
                        {customer.firstName} {customer.lastName} - {customer.companyName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;
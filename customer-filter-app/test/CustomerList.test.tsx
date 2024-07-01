import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CustomerList from '../src/pages/CustomerPage/CustomerList';
import { describe, it, expect, afterEach } from 'vitest';
import React from 'react';

const customers = [
    { id: 1, firstName: 'Tom', lastName: 'Brady', companyName: 'Google' },
    { id: 2, firstName: 'Janet', lastName: 'Smith', companyName: 'Microsoft' },
    { id: 3, firstName: 'Michael', lastName: 'Johnson', companyName: 'Google' },
];

describe('CustomerList Component', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders customer list correctly', () => {
        render(
            <Router>
                <CustomerList customers={customers} />
            </Router>
        );

        expect(screen.getByText('Customer List')).to.exist;
        expect(screen.getByText('Filter by Company')).to.exist;
        expect(screen.getByText('None')).to.exist; // Checking if the default sort option is rendered
        expect(screen.getAllByRole('listitem')).to.have.lengthOf(3); // Assuming there are 3 customers in the list initially
    });

    it('sorts customers by first name in descending order', () => {
        render(
            <Router>
                <CustomerList customers={customers} />
            </Router>
        );

        // Simulate changing the sort option
        fireEvent.change(screen.getByLabelText('Sort by:'), { target: { value: 'firstName_desc' } });

        // Check if the sorted customers are rendered correctly
        const sortedCustomers = screen.getAllByRole('listitem').map((li) => li.textContent);
        expect(sortedCustomers).to.deep.equal([
            'Tom Brady - Google',
            'Michael Johnson - Google',
            'Janet Smith - Microsoft'
        ]);
    });

    it('sorts customers by first name in ascending order', () => {
        render(
            <Router>
                <CustomerList customers={customers} />
            </Router>
        );

        // Simulate changing the sort option
        fireEvent.change(screen.getByLabelText('Sort by:'), { target: { value: 'firstName_asc' } });

        // Check if the sorted customers are rendered correctly
        const sortedCustomers = screen.getAllByRole('listitem').map((li) => li.textContent);
        expect(sortedCustomers).to.deep.equal([
            'Janet Smith - Microsoft',
            'Michael Johnson - Google',
            'Tom Brady - Google'
        ]);
    });

    it('sorts customers by last name in ascending order', () => {
        render(
            <Router>
                <CustomerList customers={customers} />
            </Router>
        );

        // Simulate changing the sort option
        fireEvent.change(screen.getByLabelText('Sort by:'), { target: { value: 'lastName_asc' } });

        // Check if the sorted customers are rendered correctly
        const sortedCustomers = screen.getAllByRole('listitem').map((li) => li.textContent);
        expect(sortedCustomers).to.deep.equal([
            'Tom Brady - Google',
            'Michael Johnson - Google',
            'Janet Smith - Microsoft'
        ]);
    });

    it('sorts customers by last name in descending order', () => {
        render(
            <Router>
                <CustomerList customers={customers} />
            </Router>
        );

        // Simulate changing the sort option
        fireEvent.change(screen.getByLabelText('Sort by:'), { target: { value: 'lastName_desc' } });

        // Check if the sorted customers are rendered correctly
        const sortedCustomers = screen.getAllByRole('listitem').map((li) => li.textContent);
        expect(sortedCustomers).to.deep.equal([
            'Janet Smith - Microsoft',
            'Michael Johnson - Google',
            'Tom Brady - Google'
        ]);
    });

    it('sorts customers by company name in ascending order', () => {
        render(
            <Router>
                <CustomerList customers={customers} />
            </Router>
        );

        // Simulate changing the sort option
        fireEvent.change(screen.getByLabelText('Sort by:'), { target: { value: 'companyName_asc' } });

        // Check if the sorted customers are rendered correctly
        const sortedCustomers = screen.getAllByRole('listitem').map((li) => li.textContent);
        expect(sortedCustomers).to.deep.equal([
            'Michael Johnson - Google',
            'Tom Brady - Google',
            'Janet Smith - Microsoft'
        ]);
    });

    it('sorts customers by company name in descending order', () => {
        render(
            <Router>
                <CustomerList customers={customers} />
            </Router>
        );

        // Simulate changing the sort option
        fireEvent.change(screen.getByLabelText('Sort by:'), { target: { value: 'companyName_desc' } });

        // Check if the sorted customers are rendered correctly
        const sortedCustomers = screen.getAllByRole('listitem').map((li) => li.textContent);
        expect(sortedCustomers).to.deep.equal([
            'Janet Smith - Microsoft',
            'Michael Johnson - Google',
            'Tom Brady - Google'
        ]);
    });

    it('filters customers by company', () => {
        render(
            <Router>
                <CustomerList customers={customers} />
            </Router>
        );

        // Simulate changing the company filter
        fireEvent.change(screen.getByLabelText('Filter by Company'), { target: { value: 'Google' } });

        // Check if the filtered customers are rendered
        expect(screen.getAllByRole('listitem')).to.have.lengthOf(2); // Two customers should be displayed after filtering by 'ABC Inc'
    });
});
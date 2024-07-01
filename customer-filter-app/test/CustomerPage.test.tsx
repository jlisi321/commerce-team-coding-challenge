import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi} from 'vitest';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import CustomerPage from '../src/pages/CustomerPage/CustomerPage';

describe('CustomerPage Component', () => {
    it('renders customer page correctly', async () => {
        // Mock fetchCustomers to return mock data
        vi.mock('../src/services/api', () => ({
            fetchCustomers: async () => [
                { id: 1, firstName: 'Tom', lastName: 'Brady', companyName: 'Google' },
                { id: 2, firstName: 'Janet', lastName: 'Smith', companyName: 'Microsoft' },
            ]
        }));

        render(
            <Router>
                <CustomerPage />
            </Router>
        );

        // Check if the main heading is rendered
        expect(screen.getByText('Customer Page')).toBeTruthy();

        // Wait for customers to be fetched and rendered
        await vi.waitFor(() => {
            expect(screen.getByText('Tom Brady - Google')).toBeTruthy();
            expect(screen.getByText('Janet Smith - Microsoft')).toBeTruthy();
        });

        vi.restoreAllMocks();
    });
});
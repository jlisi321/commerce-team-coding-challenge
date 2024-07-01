import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Simple API get call to retrieve customers
export const fetchCustomers = async () => {
    try {
        const url = `/customers`;
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};
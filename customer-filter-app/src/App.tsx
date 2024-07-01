import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage/CustomerPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CustomerPage />} />
            </Routes>
        </Router>
    );
};

export default App;
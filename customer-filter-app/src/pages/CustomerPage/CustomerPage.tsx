import './style.css'; // Import your CSS file
import CustomerList from '../../components/CustomerList.js';

const CustomerPage = () => {
    return (
        <div className="customer-page-container">
            <h2 className="customer-page-heading">Customer Page</h2>
            <CustomerList />
        </div>
    );
};

export default CustomerPage;
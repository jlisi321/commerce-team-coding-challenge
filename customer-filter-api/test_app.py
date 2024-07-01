import unittest
from flask_testing import TestCase
from app import app, db, Customer

class TestCustomerAPI(TestCase):
    def create_app(self):
        """
        Create the Flask application configured for testing.
        This includes setting the SQLite database.
        """
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        return app

    def setUp(self):
        """
        Set up the test database.
        This method is called before each test and creates the customers table and populates it with test data.
        """
        db.create_all()
        customers = []
        companies = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Ally', 'New Relic', 'Barnes and Nobles', 'Nvidia', 'Exmark', 'John Deere']

        # Populate the database with 100 test customers
        for i in range(100):
            company_name = companies[i % 10]
            customer = Customer(
                first_name=f'Customer{i + 1}',
                last_name=f'Customer{i - 1}',
                company_name=company_name
            )
            customers.append(customer)

        db.session.add_all(customers)
        db.session.commit()

    def tearDown(self):
        """
        Tear down the test database.
        This method is called after each test and removes the database session and drops all tables.
        """
        db.session.remove()
        db.drop_all()

    def test_get_customers(self):
        """
        Test the '/customers' endpoint.
        This test checks that the endpoint returns a 200 status code and 100 customers.
        """
        response = self.client.get('/customers')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json), 100)

if __name__ == '__main__':
    unittest.main()
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

# Enable CORS (Cross-Origin Resource Sharing) for all routes and origins
CORS(app, resources={r"/*": {"origins": "*"}})

# Configure SQLite database URI for SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///customers.db'

# Initialize SQLAlchemy with Flask app
db = SQLAlchemy(app)

# Define Customer model class
class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Primary key column
    first_name = db.Column(db.String(50), nullable=False)  # First name column (non-nullable)
    last_name = db.Column(db.String(50), nullable=False)  # Last name column (non-nullable)
    company_name = db.Column(db.String(50), nullable=False)  # Company name column (non-nullable)

# Define route to get all customers
@app.route('/customers', methods=['GET'])
def get_customers():
    # Query all customers from the Customer table
    query = Customer.query

    # Fetch all customers from the query
    customers = query.all()

    # Return a JSON response with customer details
    return jsonify([{
        'id': customer.id,
        'firstName': customer.first_name,
        'lastName': customer.last_name,
        'companyName': customer.company_name
    } for customer in customers])

# Main entry point of the application
if __name__ == '__main__':
    # Run the Flask app in debug mode
    app.run(debug=True)
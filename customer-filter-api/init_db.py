from app import db, Customer, app

# Use app context to interact with the database
with app.app_context():
    # Create all tables defined in the models (Customer table in this case)
    db.create_all()

    # Initialize an empty list to store customer instances
    customers = []

    # List of company names to assign to customers
    companies = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Ally', 'New Relic', 'Barnes and Nobles', 'Nvidia', 'Exmark', 'John Deere']

    # Loop to create 100 customer instances
    for i in range(100):
        # Select company name from the list in a round-robin method
        company_name = companies[i % 10]
        # Create a new Customer instance with first name, last name, and company name
        customer = Customer(
            first_name=f'Customer{i + 1}',
            last_name=f'Customer{i - 1}',
            company_name=company_name
        )
        # Append the customer instance to the customers list
        customers.append(customer)

    # Add all customer instances to the database session
    db.session.add_all(customers)
    # Commit the session to save the customers to the database
    db.session.commit()
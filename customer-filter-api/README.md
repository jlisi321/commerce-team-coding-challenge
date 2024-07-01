# Backend README

## Overview

This project serves as a backend API for managing customer data.

## Architecture

The backend is structured using Flask, a lightweight web framework. SQLAlchemy is used for database operations, providing flexibility and ease of use with SQLite. Flask-CORS is used to handle Cross-Origin Resource Sharing during development.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Python: Make sure you have Python 3.7 or higher installed on your machine. You can download it from [python.org](https://www.python.org/downloads/).
   - **Verify python is installed**

      ```bash
      python3 --version

## Setup Instructions

1. **Clone Repository**
   ```bash
   git clone https://github.com/jlisi321/commerce-team-coding-challenge
   cd customer-filter-api

2. **Setup Virtual Environment**
    ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`

3. **Install Dependencies**
    ```bash
   pip install Flask Flask-CORS Flask-SQLAlchemy Flask-Testing

4. **Initialize Database**
    ```bash
   python init_db.py

5. **Run the Flask App**
    ```bash
   python app.py
   
## Testing (Follow Setup Instructions First)

1. **Activate Virtual Environment**
   ```bash
      source venv/bin/activate  # On Windows use `venv\Scripts\activate`

2. **Run the Testing**
    ```bash
   python test_app.py

## API Endpoints

### '/customers' Route
This route returns a list of customers. 

### Response

```Json
[
  {
     "id": 1, 
     "firstName": "Bob", 
     "lastName": "Mary",
     "companyName": "Google"
  },
  {
     "id": 2,
     "firstName": "Tom",
     "lastName": "Brady",
     "companyName": "Microsoft"
  }
]
```

## Project Structure

- **app.py**: Contains flask server code
- **init_db.py** Contains initial DB setup code
- **test_app.py** Contains unit testing for the flask API

## Dependencies
- Flask
- Flask-CORS
- Flask-SQLAlchemy
- Flask-Testing

## Configuration

- The app uses SQLAlchemy with SQLite for data persistence.
- CORS is configured to allow all origins during development for ease of testing.
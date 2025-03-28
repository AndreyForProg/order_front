# Order Management System

A React-based web application for managing product orders. This application provides a user interface for creating and managing orders with a simple and intuitive modal form.

## Features

- Create new orders with product selection
- Real-time form validation
- Error handling and display
- Integration with backend API
- Responsive design using Ant Design components

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v18.17.0 or higher)
- npm (v6.0.0 or higher)

## Dependencies

The application uses the following main dependencies:

- React
- Ant Design (antd)
- Axios

## Installation

1. Clone the repository:

```bash
git clone https://github.com/AndreyForProg/order_front.git
```

2. Navigate to the project directory:

```bash
cd order_front
```

3. Install dependencies:

```bash
npm install
```

## Running the Application

1. Start the backend server (Make sure it's running on port 3020)

2. Start the React application:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Configuration

The application expects a backend server running at `http://localhost:3020` with the following endpoint:

- POST `/orders` - Creates a new order

## Usage

1. Click the button to open the Create Order modal
2. Fill in the required fields:
   - User ID
   - Product Name (from available products list)
   - Quantity
3. Click Submit to create the order

## Error Handling

The application handles various types of errors:

- Invalid product names
- Server connection issues
- API response errors

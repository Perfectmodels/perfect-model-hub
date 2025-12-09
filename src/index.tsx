// Import necessary libraries from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main App component and the global stylesheet
import App from './App';
import './index.css';

/**
 * The entry point of the application.
 * This file is responsible for rendering the main App component into the DOM.
 */

// Find the root DOM element where the React application will be mounted.
const rootElement = document.getElementById('root');

// Ensure that the root element exists before attempting to mount the application.
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Create a React root for the main application container.
const root = ReactDOM.createRoot(rootElement);

// Render the application. 
// React.StrictMode is a wrapper that checks for potential problems in an application during development.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

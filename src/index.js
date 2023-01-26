import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import { AuthContextProvider } from './components/context/auth/AuthContext';

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

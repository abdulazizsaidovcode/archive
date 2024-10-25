import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null as initial state for loading

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true); // If token exists, set as authenticated
        } else {
            setIsAuthenticated(false);
            toast.warning("Avval ro'yhatdan o'ting");
        }
    }, []);

    if (isAuthenticated === null) {
        // Optional loading indicator while checking authentication
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

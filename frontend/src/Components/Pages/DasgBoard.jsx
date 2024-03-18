import React from 'react';
import { useAuthContextApi } from '../../store/auth';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
    const { isAdmin } = useAuthContextApi();

    return (
        <div>
            {isAdmin ? (
                <h1>user is admin</h1>
            ) : (
                <Navigate to= "/" />
            )}
        </div>
    );
};

export default Dashboard;

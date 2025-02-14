import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const RoleBasedRoute = ({ allowedRoles }) => {
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedRole = localStorage.getItem("role"); // Assuming role is stored in localStorage
        if (storedRole) {
            setUserRole(storedRole);
        }
        setIsLoading(false); // Ensure useEffect doesn't loop
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Prevents component from updating too soon
    }

    return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RoleBasedRoute;

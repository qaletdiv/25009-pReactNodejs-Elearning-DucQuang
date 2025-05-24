import React from "react";
import {Navigate} from 'react-router-dom'
const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return (
      <div>
        <Navigate to="/login" replace />
      </div>
    );
  }
  return children;
};
 
export default ProtectedRoute;
 
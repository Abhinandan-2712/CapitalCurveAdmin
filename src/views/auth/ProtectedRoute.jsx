import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/sign-in" replace />;
  }
//   else{
//     return <Navigate to="/admin/default"/>
//   }

  return children;
};

export default ProtectedRoute;

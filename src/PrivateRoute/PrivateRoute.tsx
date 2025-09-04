import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";


interface PrivateRouteProps {
  allowedRoles: ("admin" | "user" | "agent")[];
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  // Still loading user info (e.g., from cookie)
  if (loading) {
    return <div className="text-center py-10">Loading...</div>; 
  }

  // Not logged in → Redirect to login
  if (!user) {
    return <Navigate to="/loginPage" replace />;
  }

  // Authenticated → Show protected route
  return <>{children}</>;
};

export default PrivateRoute;

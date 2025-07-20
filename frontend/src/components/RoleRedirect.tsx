import { useAuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export function RoleRedirect() {
  const { user, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  switch (user?.role) {
    case "admin":
      return <Navigate to="/admin/orders" replace />;
    case "partner":
      return <Navigate to="/partner/orders" replace />;
    case "customer":
      return <Navigate to="/products" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}

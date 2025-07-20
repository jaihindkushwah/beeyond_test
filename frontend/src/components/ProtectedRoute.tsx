import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { decodeJwt, getDataFromSessionStorage } from "@/lib/utils";
import { Header } from "./Header";
import { useAuthContext } from "@/context/AuthContext";
import type { IUser } from "@/@types/auth";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { user, setUser, handleLogout, setIsAuthenticated } = useAuthContext();

  useEffect(() => {
    const token = getDataFromSessionStorage("token");
    const storedUser = decodeJwt(token) as IUser;
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser({ ...storedUser, token: token });
    }

    if (!token || !storedUser) {
      navigate("/login", { replace: true, state: { from: location } });
    } else if (allowedRoles && !allowedRoles.includes(storedUser.role)) {
      navigate("/", { replace: true });
    } else {
      setUser({ ...storedUser, token: token });
    }

    setLoading(false);
  }, [navigate, location, allowedRoles, setIsAuthenticated, setUser]);

  if (loading || !user) return null;

  return (
    <>
      <Header
        isAuthenticated={true}
        onSignOut={handleLogout}
        user={{ name: user.name }}
        role={user.role}
      />
      <Outlet />
    </>
  );
}

export default ProtectedRoute;

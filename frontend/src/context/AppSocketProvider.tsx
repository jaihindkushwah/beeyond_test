import { useAuthContext } from "@/context/AuthContext";
import { AdminContextProvider } from "./AdminContext";
import { PartnerContextProvider } from "./PartnerContext";
import { CartContextProvider } from "./CartContext";

export const AppSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuthContext();
  if (!user?.role) return <>{children}</>;
  if (user.role === "admin") {
    return <AdminContextProvider>{children}</AdminContextProvider>;
  } else if (user.role === "partner") {
    return <PartnerContextProvider>{children}</PartnerContextProvider>;
  } else if (user.role === "customer") {
    return <CartContextProvider>{children}</CartContextProvider>;
  }
  return <>{children}</>;
};

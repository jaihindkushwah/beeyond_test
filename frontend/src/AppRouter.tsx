import { useRoutes, type RouteObject } from "react-router-dom";
import CartPage from "./features/cart/cart";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import VerifyOtp from "./features/auth/EmailVerification";
import ResetPassword from "./features/auth/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import ProductCatalog from "./features/products/ProductCatalog";
import { RoleRedirect } from "./components/RoleRedirect";
import SingleProduct from "./features/products/SingleProduct";
import CustomerOrderHistory from "./features/orders/CustomerOrderHistory";
import Checkout from "./features/checkout/checkout";
import AdminOrders from "./features/admin/orders";
import Partners from "./features/admin/partners";
import PartnerOrderHistory from "./features/partner/orders";
import Notifications from "./features/partner/notifications";
import PartnerOrderStatus from "./features/partner/status";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-screen min-h-screen  text-white mb-10">
      {children}
    </div>
  );
};

function AppRouter() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: (
        <AppContainer>
          <ProtectedRoute allowedRoles={["customer"]} />
        </AppContainer>
      ),
      children: [
        {
          path: "/",
          element: <RoleRedirect />,
        },
        { path: "/checkout", element: <Checkout /> },
        { path: "/products", element: <ProductCatalog /> },
        { path: "/products/:id", element: <SingleProduct /> },
        { path: "/cart", element: <CartPage /> },
        // { path: "/checkout", element: <h1>Checkout</h1> },
        { path: "/profile", element: <h1>Profile</h1> },
        { path: "/order-history", element: <CustomerOrderHistory /> },
      ],
    },

    // Admin routes
    {
      path: "/admin",
      element: (
        <AppContainer>
          <ProtectedRoute allowedRoles={["admin"]} />
        </AppContainer>
      ),
      children: [
        {
          path: "/admin/orders",
          element: <AdminOrders />,
        },
        {
          path: "/admin/partners",
          element: <Partners />,
        },
      ],
    },
    // Partner routes
    {
      path: "/partner",
      element: (
        <AppContainer>
          <ProtectedRoute allowedRoles={["partner"]} />
        </AppContainer>
      ),
      children: [
        { path: "/partner/orders", element: <PartnerOrderHistory /> },
        { path: "/partner/products", element: <h1>Partner Products</h1> },
        { path: "/partner/notifications", element: <Notifications /> },
        { path: "/partner/status", element: <PartnerOrderStatus /> },
      ],
    },

    // Public auth routes
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/verify-email", element: <VerifyOtp /> },
    { path: "/reset-password", element: <ResetPassword /> },

    // 404
    { path: "*", element: <NotFound /> },
  ];

  return useRoutes(routes);
}
export default AppRouter;

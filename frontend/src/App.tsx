import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/sonner";
// import { CartContextProvider } from "./features/cart/context/CartContext";
import { AppSocketProvider } from "./context/AppSocketProvider";
function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        {/* <CartContextProvider> */}
        <AppSocketProvider>
          <AppRouter />
          <Toaster />
        </AppSocketProvider>
        {/* </CartContextProvider> */}
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

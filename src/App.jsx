// React
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Context
import { AuthProvider } from "./context/AuthContext";
// Component
import Home from "./pages/Home/Home";
import { UIModalProvider } from "./context/UIModalContext";
import { SupplierProvider } from "./context/SupplierContext";
import { InventoryProvider } from "./context/InventoryContext";
import { CustomerProvider } from "./context/CustomerContext";
import { OrderProvider } from "./context/OrderContext";
import { MasterProvider } from "./context/MasterContext";

function App() {
  return (
    <MasterProvider>
      <AuthProvider>
        <SupplierProvider>
          <InventoryProvider>
            <CustomerProvider>
              <OrderProvider>
                <UIModalProvider>
                  <ToastContainer />
                  <Home />
                </UIModalProvider>
              </OrderProvider>
            </CustomerProvider>
          </InventoryProvider>
        </SupplierProvider>
      </AuthProvider>
    </MasterProvider>
  );
}

export default App;

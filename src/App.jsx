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

function App() {
  return (
    <AuthProvider>
      <SupplierProvider>
        <InventoryProvider>
          <UIModalProvider>
            <ToastContainer />
            <Home />
          </UIModalProvider>
        </InventoryProvider>
      </SupplierProvider>
    </AuthProvider>
  );
}

export default App;

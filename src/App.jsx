// React
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Context
import { AuthProvider } from "./context/AuthContext";
// Component
import Home from "./pages/Home/Home";
import { UIModalProvider } from "./context/UIModalContext";

function App() {
  return (
    <AuthProvider>
      <UIModalProvider>
        <ToastContainer />
        <Home />
      </UIModalProvider>
    </AuthProvider>
  );
}

export default App;

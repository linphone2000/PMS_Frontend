import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/RightPanelComponents/Dashboard";
import Employee from "../components/RightPanelComponents/Employee";
import Order from "../components/RightPanelComponents/Order";
import Supplier from "../components/RightPanelComponents/Supplier";
import Profile from "../components/RightPanelComponents/Profile";
import Inventory from "../components/RightPanelComponents/Inventory";
import Customer from "../components/RightPanelComponents/Customer";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm/AuthForm";

const Home = () => {
  const { currentEmployee } = useAuth();
  return (
    <>
      {currentEmployee ? (
        <>
          <Router>
            <Navbar />
            <div className="flex">
              {/* Left Panel */}
              <Sidebar />

              {/* Right Panel */}
              <div className="w-4/5">
                <Routes>
                  <Route path="/dashboard" Component={Dashboard} />
                  <Route path="/employee" Component={Employee} />
                  <Route path="/customer" Component={Customer} />
                  <Route path="/order" Component={Order} />
                  <Route path="/inventory" Component={Inventory} />
                  <Route path="/supplier" Component={Supplier} />
                  <Route path="/profile" Component={Profile} />
                </Routes>
              </div>
            </div>
          </Router>
        </>
      ) : (
        <AuthForm></AuthForm>
      )}
    </>
  );
};

export default Home;

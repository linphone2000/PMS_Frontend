import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// Components
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Dashboard from "../../components/RightPanelComponents/Dashboard";
import Employee from "../../components/RightPanelComponents/Employee/Employee";
import Order from "../../components/RightPanelComponents/Order";
import Supplier from "../../components/RightPanelComponents/Supplier";
import Profile from "../../components/RightPanelComponents/Profile";
import Inventory from "../../components/RightPanelComponents/Inventory";
import Customer from "../../components/RightPanelComponents/Customer";
import { useAuth } from "../../context/AuthContext";
import AuthForm from "../../components/AuthForm/AuthForm";
// CSS
import "./Home.css";
import { useUIModal } from "../../context/UIModalContext";

const Home = () => {
  // Context
  const { currentEmployee } = useAuth();
  const { isSideBarOpen } = useUIModal();

  return (
    <>
      <Router>
        {currentEmployee ? (
          <>
            <Navbar />
            <div className="flex h-screen-body">
              {/* Left Panel */}
              <AnimatePresence>
                {isSideBarOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "20%", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="sidebar-container overflow-hidden"
                  >
                    <Sidebar isSideBarOpen={isSideBarOpen} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Right Panel */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: isSideBarOpen ? "80%" : "100%" }}
                transition={{ duration: 0.5 }}
                className="right-panel overflow-y-auto"
              >
                <Routes>
                  <Route path="/dashboard" Component={Dashboard} />
                  <Route path="/employee" Component={Employee} />
                  <Route path="/customer" Component={Customer} />
                  <Route path="/order" Component={Order} />
                  <Route path="/inventory" Component={Inventory} />
                  <Route path="/supplier" Component={Supplier} />
                  <Route path="/profile" Component={Profile} />
                </Routes>
              </motion.div>
            </div>
          </>
        ) : (
          <AuthForm></AuthForm>
        )}
      </Router>
    </>
  );
};

export default Home;

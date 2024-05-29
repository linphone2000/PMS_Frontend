import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// Components
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Dashboard from "../../components/RightPanelComponents/Dashboard/Dashboard";
import Employee from "../../components/RightPanelComponents/Employee/Employee";
import Order from "../../components/RightPanelComponents/Order";
import Supplier from "../../components/RightPanelComponents/Supplier/Supplier";
import Profile from "../../components/RightPanelComponents/Profile";
import Inventory from "../../components/RightPanelComponents/Inventory/Inventory";
import Customer from "../../components/RightPanelComponents/Customer";
import AuthForm from "../../components/AuthForm/AuthForm";
// Context
import { useAuth } from "../../context/AuthContext";
// CSS
import "./Home.css";
import { useUIModal } from "../../context/UIModalContext";
import Modal from "../../components/Modal/Modal";
import SupplierAddForm from "../../components/RightPanelComponents/Supplier/SupplierAddForm";
import InventoryAddForm from "../../components/RightPanelComponents/Inventory/InventoryAddForm";

const Home = () => {
  // Context
  const { currentEmployee } = useAuth();
  const { isSideBarOpen, setIsSideBarOpen, modalForm } = useUIModal();

  return (
    <>
      <Router>
        {currentEmployee ? (
          <>
            {/* Modals */}
            {modalForm === "supplieradd" ? (
              <Modal>
                <SupplierAddForm />
              </Modal>
            ) : modalForm === "inventoryadd" ? (
              <Modal>
                <InventoryAddForm />
              </Modal>
            ) : null}

            {/* Navbar */}
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
                className="right-panel overflow-y-auto relative"
              >
                {/* Collaspe button */}
                <div className="absolute left-0">
                  <button
                    className="p-1 bg-gray-800 rounded-r-md border border-s-0 border-t-0 border-gray-800 hover:border-gray-500 hover:cursor-pointer transition"
                    onClick={() => {
                      setIsSideBarOpen((prev) => !prev);
                    }}
                  >
                    {isSideBarOpen ? (
                      <i className="fa-solid fa-chevron-left text-white"></i>
                    ) : (
                      <i className="fa-solid fa-chevron-right text-white"></i>
                    )}
                  </button>
                </div>

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

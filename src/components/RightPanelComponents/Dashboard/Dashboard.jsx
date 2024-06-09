// Components
import { useAuth } from "../../../context/AuthContext";
import NoAuthorization from "../../NoAuthorization/NoAuthorization";
import BottomDashboard from "./BottomDashboard";
import DetailsDashboard from "./DetailsDashboard";
import MiddleDashBoard from "./MiddleDashBoard";
// React
import { motion } from "framer-motion";

const Dashboard = () => {
  const { currentEmployee } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 p-8 h-full"
    >
      {currentEmployee.role !== "headAdmin" ? (
        <NoAuthorization />
      ) : (
        <>
          <MiddleDashBoard />
          <hr className="border border-gray-600"></hr>
          <DetailsDashboard />
          <hr className="border border-gray-600"></hr>
          <BottomDashboard />
        </>
      )}
    </motion.div>
  );
};

export default Dashboard;

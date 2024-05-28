// Components
import BottomDashboard from "./BottomDashboard";
import MiddleDashBoard from "./MiddleDashBoard";
import TopDashBoard from "./TopDashBoard";
// React
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 p-4 h-full"
    >
      {/* <TopDashBoard />
      <hr className="border-gray-400"></hr> */}
      <MiddleDashBoard />
      <hr className="border-gray-400"></hr>
      <BottomDashboard />
    </motion.div>
  );
};

export default Dashboard;

import { motion, AnimatePresence } from "framer-motion";

const Tooltip = ({ message, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute z-10 px-2 py-1 text-sm text-white bg-gray-400 rounded shadow-md tooltip"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Tooltip;

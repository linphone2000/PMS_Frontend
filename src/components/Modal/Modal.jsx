import React from "react";
import { motion } from "framer-motion";
import "./Modal.css";
import { useUIModal } from "../../context/UIModalContext";

const Modal = ({ children }) => {
  const { handleCloseModal, isModalOpen, modalForm } = useUIModal();

  const closeModal = () => {
    handleCloseModal();
  };

  return (
    <motion.div
      className={`modal-overlay ${isModalOpen ? "active" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isModalOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`modal-box bg-gray-900 ${isModalOpen ? "active" : ""} ${
          modalForm === "supplieradd" || modalForm === "supplieredit"
            ? "max-h-5/6 w-4/6"
            : modalForm === "delete"
            ? "h-1/2 w-1/2"
            : ""
        }`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: isModalOpen ? 1 : 0, y: isModalOpen ? 0 : -50 }}
        transition={{ duration: 0.3 }}
      >
        <button className="close-button" onClick={closeModal}>
          <i className="fa-solid fa-xmark text-xl transition-colors hover:text-slate-50"></i>
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;

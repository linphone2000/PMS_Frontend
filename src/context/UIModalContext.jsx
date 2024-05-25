import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { toast } from "react-toastify";

const UIModalContext = createContext();

export const UIModalProvider = ({ children }) => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [modalForm, setModalForm] = useState();

  // Handlers
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSetModalForm = (formName) => {
    setModalForm(formName);
  };

  const showToast = (type, message) => {
    if (type === "success") {
      toast.success(message, { autoClose: 1500 });
    } else if (type === "error") {
      toast.error(message, { autoClose: 1500 });
    } else {
      toast.info(message, { autoClose: 1500 });
    }
  };

  // console.log("Rendered");

  // Memo
  const UIModalContextValue = useMemo(
    () => ({
      isModalOpen,
      isSideBarOpen,
      setIsSideBarOpen,
      handleOpenModal,
      handleCloseModal,
      modalForm,
      setModalForm,
      handleSetModalForm,
      showToast,
    }),
    [isModalOpen, isSideBarOpen]
  );

  return (
    <UIModalContext.Provider value={UIModalContextValue}>
      {children}
    </UIModalContext.Provider>
  );
};

export const useUIModal = () => {
  return useContext(UIModalContext);
};

import { useState } from "react";
import buttons from "../utils/buttons";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./SideBarComponents/ProfileInfo";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  // Navigation
  const navigate = useNavigate();

  // Context
  const { currentEmployee } = useAuth();

  // States
  const [selectedPage, setSelectedPage] = useState("");

  // Handler
  const handleClick = (type) => {
    setSelectedPage(type);
    navigate("/" + type);
  };

  // Test
  // const API_URL = import.meta.env.VITE_API_URL
  // console.log(API_URL);

  return (
    <div className="w-1/5 bg-teal-50 h-screen">
      {/* User profile */}
      <ProfileInfo />

      {/* List of buttons */}
      {buttons.map(
        (button, index) =>
          button.roles.includes(currentEmployee.role) && (
            <button
              key={index}
              className={`block w-full p-4 hover:bg-white transition ${
                selectedPage == button.type ? "bg-white" : ""
              }`}
              onClick={() => {
                handleClick(button.type);
              }}
            >
              {button.label}
            </button>
          )
      )}
    </div>
  );
};

export default Sidebar;

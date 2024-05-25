// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Utils
import buttons from "../../utils/buttons";
// Context
import { useAuth } from "../../context/AuthContext";
// Component
import ProfileInfo from "../SideBarComponents/ProfileInfo";
// CSS
import "./Sidebar.css";

const Sidebar = () => {
  // Navigation
  const navigate = useNavigate();

  // Context
  const { currentEmployee, logout } = useAuth();

  // States
  const [selectedPage, setSelectedPage] = useState("");

  // Handler
  // Handle Sidebar click
  const handleClick = (type) => {
    setSelectedPage(type);
    navigate("/" + type);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Test
  // const API_URL = import.meta.env.VITE_API_URL
  // console.log(API_URL);

  return (
    <div className="w-1/5 shadow-md bg-sky-300 flex flex-col justify-between h-screen-nav">
      <div>
        {/* User profile */}
        <ProfileInfo />

        {/* List of buttons */}
        {buttons.map(
          (button, index) =>
            button.roles.includes(currentEmployee.role) && (
              <button
                key={index}
                className={`block w-full p-4 hover:bg-white hover:scale-105 hover:shadow-md transition ${
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

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={() => {
            handleLogout();
          }}
          className="outline py-2 px-1 w-full text-white rounded-md hover:outline-white hover:bg-white hover:text-gray-800 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

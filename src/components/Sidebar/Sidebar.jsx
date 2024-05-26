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
import { useUIModal } from "../../context/UIModalContext";

const Sidebar = ({ isSideBarOpen }) => {
  // Navigation
  const navigate = useNavigate();

  // Context
  const { currentEmployee, logout } = useAuth();
  const { showToast } = useUIModal();

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
    showToast("info", "Logged out!");
  };

  // Test
  // const API_URL = import.meta.env.VITE_API_URL
  // console.log(API_URL);

  return (
    <div className="shadow-md bg-gray-800 flex flex-col h-full justify-between text-white">
      <div>
        {/* User profile */}
        <ProfileInfo />

        {/* List of buttons */}
        <ul className="">
          {buttons.map(
            (button, index) =>
              button.roles.includes(currentEmployee.role) && (
                <li key={index}>
                  <button
                    className={`block w-full p-4 hover:bg-sky-600 hover:scale-110 hover:shadow-md transition ${
                      selectedPage == button.type ? "bg-sky-700" : ""
                    }`}
                    onClick={() => {
                      handleClick(button.type);
                    }}
                  >
                    <label className="cursor-pointer">{button.label}</label>
                  </button>
                </li>
              )
          )}
        </ul>
      </div>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={() => {
            handleLogout();
          }}
          className="outline py-2 px-1 w-full rounded-md hover:outline-sky-500 hover:bg-sky-500 hover:text-gray-900 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

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
  const { showToast, selectedPage, setSelectedPage } = useUIModal();

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
      <div className="relative">
        {/* User profile */}
        <ProfileInfo />

        {/* List of buttons */}
        <ul className="items-center flex flex-col gap-2">
          {buttons.map(
            (button, index) =>
              button.roles.includes(currentEmployee.role) && (
                <li className="w-full text-center" key={index}>
                  <button
                    className={`w-5/6 px-4 py-3 rounded-full hover:bg-sky-600 hover:scale-110 hover:shadow-md transition ${
                      selectedPage == button.type ? "bg-sky-700" : ""
                    }`}
                    onClick={() => {
                      handleClick(button.type);
                    }}
                  >
                    <div className="flex w-full gap-4 mx-auto items-center justify-between">
                      <i className={`${button.icon} w-1/4`}></i>
                      <div className="flex justify-start w-3/4">
                        <p className="cursor-pointer">{button.label}</p>
                      </div>
                    </div>
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
          className="outline py-2 px-1 w-full rounded-full hover:outline-sky-500 hover:bg-sky-500 hover:text-gray-900 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

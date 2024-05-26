import { useNavigate } from "react-router-dom";
import { useUIModal } from "../context/UIModalContext";

const Navbar = () => {
  // Context
  const { setIsSideBarOpen } = useUIModal();

  // Navigation
  const navigate = useNavigate();

  // Handlers
  // Handle profile click
  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="h-14 w-full sticky top-0 shadow-md bg-sky-900 text-white px-8 gap-4 flex items-center justify-between">
      {/* Left */}
      <div>
        <button
          onClick={() => {
            setIsSideBarOpen((prev) => !prev);
          }}
        >
          <img
            className="w-10 inline-block rounded-xl shadow-md opacity-100 hover:opacity-85 hover:scale-105 transition"
            src="pms_logo.webp"
            alt="PMS Logo" // Added alt attribute for accessibility
          ></img>
        </button>
      </div>

      {/* Right */}
      <div>
        <button
          onClick={() => {
            handleProfileClick();
          }}
        >
          <i className="fa-solid fa-user text-xl p-1 cursor-pointer hover:scale-125 hover:bg-gray-800 hover:rounded-lg transition"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

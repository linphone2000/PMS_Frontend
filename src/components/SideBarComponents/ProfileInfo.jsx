// Context
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { formatRoleName } from "../../utils/formatter";
import { useUIModal } from "../../context/UIModalContext";
import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";

const ProfileInfo = () => {
  // API
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  // Context
  const { currentEmployee } = useAuth();
  const { setIsSideBarOpen, setSelectedPage } = useUIModal();

  // Navigation
  const navigate = useNavigate();

  // State
  const [imgError, setImgError] = useState(false);

  // Handlers
  const handleImgError = () => {
    setImgError(true);
  };

  // Handle profile click
  const handleProfileClick = () => {
    setSelectedPage("");
    navigate("/profile");
  };

  return (
    <div className="text-center text-white p-4 min-w-fit">
      <div className="bg-sky-700 px-3 py-2 rounded-lg flex gap-2">
        {/* Profile picture */}
        <div className="w-1/4 flex items-center justify-center">
          <div className="w-14 h-14 flex items-center justify-center">
            {currentEmployee.image && !imgError ? (
              <img
                src={`${IMG_URL}/${currentEmployee.image}`}
                alt="Profile Picture"
                className="rounded-xl object-cover aspect-square border border-gray-400"
                onError={handleImgError}
              />
            ) : (
              <FaUserAlt className="text-gray-400 text-4xl" />
            )}
          </div>
        </div>

        {/* Bar */}
        <div className="border-r border-gray-400"></div>

        {/* Info */}
        <div className="text-right w-full">
          <h1>{currentEmployee.name}</h1>
          <p className="text-sm font-semibold text-sky-200">
            {formatRoleName(currentEmployee.role)}
          </p>
          <button
            onClick={() => {
              handleProfileClick();
            }}
            className="text-xs text-sky-400 hover:underline transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

// Context
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { formatRoleName } from "../../utils/formatter";
import { useUIModal } from "../../context/UIModalContext";

const ProfileInfo = () => {
  // Context
  const { currentEmployee } = useAuth();
  const { setIsSideBarOpen, setSelectedPage } = useUIModal();

  // Navigation
  const navigate = useNavigate();

  // Handle profile click
  const handleProfileClick = () => {
    setSelectedPage("");
    navigate("/profile");
  };

  return (
    <div className="text-center text-white p-4 min-w-fit">
      <div className="bg-sky-700 p-4 rounded-lg">
        <h1>{currentEmployee.name}</h1>
        <p>{formatRoleName(currentEmployee.role)}</p>
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

export default ProfileInfo;

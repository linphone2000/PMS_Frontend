// Context
import { useAuth } from "../../context/AuthContext";
import { formatRoleName } from "../../utils/formatter";

const ProfileInfo = () => {
  // Context
  const { currentEmployee } = useAuth();

  return (
    <div className="text-center text-white p-4 min-w-fit">
      <div className="bg-sky-800 p-4 rounded-lg">
        <h1>{currentEmployee.name}</h1>
        <p>{formatRoleName(currentEmployee.role)}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;

import { useAuth } from "../../context/AuthContext";

const ProfileInfo = () => {
  const { currentEmployee } = useAuth();

  return (
    <div>
      <h1>{currentEmployee.name}</h1>
    </div>
  );
};

export default ProfileInfo;

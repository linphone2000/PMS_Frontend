import { useAuth } from "../../context/AuthContext";

const ProfileInfo = () => {
  const { currentEmployee } = useAuth();

  return (
    <div className="text-center text-white p-4">
      <div className="bg-sky-800 p-4 rounded-lg">
        <h1>{currentEmployee.name}</h1>
        <p>{currentEmployee.email}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;

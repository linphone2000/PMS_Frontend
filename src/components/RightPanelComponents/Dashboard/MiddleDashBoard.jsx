import { useNavigate } from "react-router-dom";
import InfoBox from "./InfoBox";
import { useUIModal } from "../../../context/UIModalContext";

const MiddleDashBoard = () => {
  // Context
  const { setSelectedPage } = useUIModal();

  // Navigation
  const navigate = useNavigate();

  // Handler
  const handleClick = (page) => {
    setSelectedPage(page);
    navigate("/" + page);
  };

  return (
    <div className="bg-sky-700 p-4 flex flex-col gap-4 text-sky-100 rounded-t-md">
      {/* Headings */}
      <div className="">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <h2 className="font-thin text-gray-300">
          A Quick Data Overview of the System
        </h2>
      </div>

      {/* Four Boxes */}
      <div className="flex justify-around gap-10">
        <InfoBox
          iconClass="fa-solid fa-capsules"
          title="Medicines"
          page="inventory"
          color="emerald"
          buttonText="View details"
          onButtonClick={handleClick}
        />
        <InfoBox
          iconClass="fa-solid fa-users"
          title="Employees"
          page="employee"
          color="yellow"
          buttonText="View details"
          onButtonClick={handleClick}
        />
        <InfoBox
          iconClass="fa-solid fa-boxes-stacked"
          title="Orders"
          page="order"
          color="sky"
          buttonText="View details"
          onButtonClick={handleClick}
        />
        <InfoBox
          iconClass="fa-solid fa-truck-ramp-box"
          title="Suppliers"
          page="supplier"
          color="rose"
          buttonText="View details"
          onButtonClick={handleClick}
        />
      </div>
    </div>
  );
};

export default MiddleDashBoard;

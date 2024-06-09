import "./RootComponent.css";

const RootComponent = () => {
  return (
    <div className="root-component flex flex-col items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md">
        <img
          src="pms_bg_1.webp"
          alt="Pharmacy"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold mb-4 text-sky-300">Welcome to PharmaManage</h1>
        <p className="text-sky-200">
          Your comprehensive solution for pharmacy management.
        </p>
      </div>
    </div>
  );
};

export default RootComponent;

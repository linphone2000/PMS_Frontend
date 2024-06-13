const InfoBox = ({
  iconClass,
  title,
  page,
  color,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div
      className={`rounded-lg border-2 w-full h-44 flex flex-col justify-between overflow-hidden border-${color}-300`}
    >
      <div className="text-center pt-4">
        <i className={`${iconClass} text-4xl`}></i>
      </div>
      <p className="font-bold text-center">{title}</p>
      {/* <p className="font-semibold text-center">Total: </p> */}
      <div
        className={`h-8 w-full flex items-center justify-center hover:cursor-pointer hover:scale-105 transition bg-${color}-300`}
        onClick={() => onButtonClick(page)}
      >
        <button className="text-gray-600 flex items-center gap-1">
          <label className="hover:cursor-pointer">{buttonText}</label>
          <i className="fa-solid fa-angles-right hover:cursor-pointer"></i>
        </button>
      </div>
    </div>
  );
};

export default InfoBox;

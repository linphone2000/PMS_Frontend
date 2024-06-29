import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUIModal } from "../../context/UIModalContext";
import Tooltip from "../Tooltip/Tooltip";

const RegisterForm = ({ setMode }) => {
  // Context
  const { register } = useAuth();
  const { showToast } = useUIModal();

  // State
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Refs
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const employeeIDRef = useRef();

  // Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const employeeData = new FormData();
      employeeData.append("name", nameRef.current.value);
      employeeData.append("email", emailRef.current.value);
      employeeData.append("password", passwordRef.current.value);
      employeeData.append("employeeID", employeeIDRef.current.value);

      const response = await register(employeeData);
      if (response.status === 200) {
        showToast("success", response.data.message);
        setMode("login");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      showToast("error", error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      className="shadow-lg flex justify-between h-4/6 w-7/12 rounded-lg overflow-hidden border text-sky-700 text-center mx-auto"
    >
      {/* Image */}
      <div className="w-3/5">
        <img className="rounded-s-lg h-full object-cover" src="pms_login.webp" alt="Register" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex p-10 w-2/5 flex-col space-y-4 bg-sky-50"
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold text-sky-400 mb-6">Register</h1>
        <input
          ref={emailRef}
          type="email"
          required
          placeholder="Email"
          className="px-4 py-2 border border-sky-300 rounded-full focus:outline-none focus:ring-sky-500 focus:border-sky-500"
        />
        <input
          ref={passwordRef}
          type="password"
          required
          placeholder="Password"
          className="px-4 py-2 border border-sky-300 rounded-full focus:outline-none focus:ring-sky-500 focus:border-sky-500"
        />
        <input
          ref={nameRef}
          type="text"
          required
          placeholder="Full Name"
          className="px-4 py-2 border border-sky-300 rounded-full focus:outline-none focus:ring-sky-500 focus:border-sky-500"
        />
        <div className="relative">
          <input
            ref={employeeIDRef}
            type="text"
            required
            placeholder="Employee ID"
            className="px-4 py-2 border border-sky-300 rounded-full focus:outline-none focus:ring-sky-500 focus:border-sky-500 w-full"
            onFocus={() => setTooltipVisible(true)}
            onBlur={() => setTooltipVisible(false)}
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          />
          <Tooltip
            message="Eg: HA0001, MA0001, CA0001, PA0001"
            isVisible={tooltipVisible}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 hover:scale-105 focus:outline-none focus:bg-sky-600 transition duration-200 ease-in-out"
        >
          Register
        </button>
        <p className="text-sm text-sky-500">Already have an account?</p>
        <span
          onClick={() => setMode("login")}
          className="cursor-pointer text-sky-600 text-xs !mt-0 font-semibold hover:underline"
        >
          Login here
        </span>
      </form>
    </motion.div>
  );
};

export default RegisterForm;

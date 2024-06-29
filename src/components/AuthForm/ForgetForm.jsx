import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUIModal } from "../../context/UIModalContext";

const ForgetForm = ({ setMode }) => {
  // Context
  const { requestCode, validateCode, resetPassword } = useAuth();
  const { showToast } = useUIModal();

  // State
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);

  // Refs
  const emailRef = useRef();
  const codeRef = useRef();
  const newPasswordRef = useRef();

  // Handlers
  const handleRequestCode = async () => {
    try {
      const response = await requestCode(emailRef.current.value);
      if (response.status === 200) {
        showToast("success", "Code sent to your email.");
        setIsCodeSent(true);
      }
    } catch (error) {
      console.error("Error requesting code:", error);
      showToast("error", error.message);
    }
  };

  const handleValidateCode = async () => {
    try {
      const response = await validateCode(
        emailRef.current.value,
        codeRef.current.value
      );
      if (response.status === 200) {
        showToast("success", "Code validated. You can now set a new password.");
        setIsCodeValid(true);
      }
    } catch (error) {
      console.error("Error validating code:", error);
      showToast("error", error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(
        emailRef.current.value,
        newPasswordRef.current.value,
        codeRef.current.value
      );
      if (response.status === 200) {
        showToast("success", response.data.message);
        setMode("login");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      showToast("error", error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3 }}
      className="shadow-lg flex justify-between h-4/6 w-7/12 rounded-lg border text-sky-700 text-center mx-auto"
    >
      {/* Image */}
      <div className="w-3/5">
        <img
          className="rounded-s-lg h-full object-cover"
          src="pms_login.webp"
          alt="Reset Password"
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleResetPassword}
        className="flex p-10 w-2/5 flex-col space-y-4 justify-evenly bg-sky-50"
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold text-sky-400 mb-6">Reset Password</h1>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <input
            ref={emailRef}
            type="email"
            required
            placeholder="Email"
            className="px-4 py-2 border border-sky-300 rounded-full focus:outline-none focus:ring-sky-500 focus:border-sky-500"
          />
          {isCodeSent && (
            <input
              ref={codeRef}
              type="text"
              required
              placeholder="Enter Code"
              className="px-4 py-2 border border-sky-300 rounded-full focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            />
          )}
          {isCodeValid && (
            <input
              ref={newPasswordRef}
              type="password"
              required
              placeholder="New Password"
              className="px-4 py-2 border border-sky-300 rounded-full focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            />
          )}
          {!isCodeValid && (
            <button
              type="button"
              onClick={isCodeSent ? handleValidateCode : handleRequestCode}
              className="px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 hover:scale-105 focus:outline-none focus:bg-sky-600 transition duration-200 ease-in-out"
            >
              {isCodeSent ? "Validate Code" : "Get Code"}
            </button>
          )}
          {isCodeValid && (
            <button
              type="submit"
              className="px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 hover:scale-105 focus:outline-none focus:bg-sky-600 transition duration-200 ease-in-out"
            >
              Reset Password
            </button>
          )}
        </div>

        {/* Go back */}
        <div>
          <p className="text-sm text-sky-500">Remember your password?</p>
          <span
            onClick={() => setMode("login")}
            className="cursor-pointer text-sky-600 text-xs !mt-0 font-semibold hover:underline"
          >
            Login here
          </span>
        </div>
      </form>
    </motion.div>
  );
};

export default ForgetForm;

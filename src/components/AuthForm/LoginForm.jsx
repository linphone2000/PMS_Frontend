import { motion } from "framer-motion";
import { useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUIModal } from "../../context/UIModalContext";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ mode, setMode }) => {
  // Context
  const { login } = useAuth();
  const { showToast } = useUIModal();

  // Navigation
  const navigate = useNavigate();

  // Refs
  const emailRef = useRef();
  const passwordRef = useRef();

  // Handlers
  const handleModeChange = () => {
    setMode(mode === "login" ? "register" : "login");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const response = await login(userData);
      if (response.status === 200) {
        showToast("success", response.data.message);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showToast("error", error.response.data.message);
      } else {
        showToast("error", "An unexpected error occurred");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="shadow-lg flex justify-between w-7/12 rounded-lg border text-sky-700 text-center mx-auto"
    >
      {/* Image */}
      <div className="w-3/5">
        <img className="rounded-s-lg" src="pms_login.webp"></img>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex p-10 w-2/5 justify-center flex-col space-y-4"
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-3">Login</h1>
        <input
          ref={emailRef}
          type="email"
          required
          placeholder="Email"
          className="px-4 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500"
        />
        <input
          ref={passwordRef}
          type="password"
          required
          placeholder="Password"
          className="px-4 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600 transition duration-200 ease-in-out"
        >
          Login
        </button>
        <p className="text-sm text-sky-500">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
        </p>
        <span
          onClick={handleModeChange}
          className="cursor-pointer text-sky-600 !mt-0 text-xs font-semibold hover:underline"
        >
          {mode === "login" ? "Register here" : "Login here"}
        </span>
      </form>
    </motion.div>
  );
};

export default LoginForm;

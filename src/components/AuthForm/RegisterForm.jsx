import { motion } from "framer-motion";
import { useRef } from "react";
import { useAuth } from "../../context/AuthContext";
// import { useUIModal } from "../../context/UIModalContext";

const RegisterForm = ({ mode, setMode }) => {
  // Context
  const { register } = useAuth();
  // const { showToast } = useUIModal();

  // Refs
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const roleRef = useRef();

  // Handlers
  const handleModeChange = () => {
    setMode(mode === "register" ? "login" : "register");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      name: nameRef.current.value,
      role: roleRef.current.value,
    };
    const response = await register(userData);
    if (response.data.is_registered == true) {
      // showToast("success", "Registered successful!");
    } else {
      // showToast("error", response.data.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      className="p-10 shadow-md rounded-lg border w-1/2 text-indigo-700 text-center max-w-sm mx-auto"
    >
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6">Register</h1>

      {/* Body */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          ref={emailRef}
          type="email"
          required
          placeholder="Email"
          className="px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          ref={passwordRef}
          type="password"
          required
          placeholder="Password"
          className="px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          ref={nameRef}
          type="text"
          required
          placeholder="Full Name"
          className="px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition duration-200 ease-in-out"
        >
          Register
        </button>
        <p className="text-sm text-indigo-500">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            onClick={handleModeChange}
            className="cursor-pointer font-semibold hover:underline"
          >
            {mode === "login" ? "Register here" : "Login here"}
          </span>
        </p>
      </form>
    </motion.div>
  );
};

export default RegisterForm;

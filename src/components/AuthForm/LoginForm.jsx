import { motion } from "framer-motion";
import { useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUIModal } from "../../context/UIModalContext";

const LoginForm = ({ setMode }) => {
  // Context
  const { login } = useAuth();
  const { showToast } = useUIModal();

  // Refs
  const emailRef = useRef();
  const passwordRef = useRef();

  // Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const response = await login(userData);
      if (response.status === 200) {
        showToast("success", response.data.message);
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      showToast("error", error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      className="shadow-lg flex justify-between w-7/12 rounded-lg border text-sky-700 text-center mx-auto"
    >
      {/* Image */}
      <div className="w-3/5">
        <img className="rounded-s-lg h-full" src="pms_login.webp" alt="Login" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex p-10 w-2/5 flex-col space-y-4 justify-evenly bg-sky-50"
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold text-sky-400 mb-6">Login</h1>
        <div className="flex flex-col gap-4 !mt-0">
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
          <button
            type="submit"
            className="px-4 py-2 w-full bg-sky-500 text-white mx-auto rounded-full hover:bg-sky-600 hover:scale-105 focus:outline-none focus:bg-sky-600 transition duration-200 ease-in-out"
          >
            Login
          </button>
        </div>

        {/* Forget Password */}
        <span
          onClick={() => setMode("forgetPassword")}
          className="cursor-pointer text-sky-600 text-xs !mt-0 font-semibold hover:underline"
        >
          Forgot Password?
        </span>

        {/* Mode change */}
        <div className="!mt-0">
          <p className="text-sm text-sky-500">Don't have an account?</p>
          <span
            onClick={() => setMode("register")}
            className="cursor-pointer text-sky-600 text-xs !mt-0 font-semibold hover:underline"
          >
            Register here
          </span>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;

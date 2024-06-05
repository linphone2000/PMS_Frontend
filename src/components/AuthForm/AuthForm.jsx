// React
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
// Component
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgetForm from "./ForgetForm";
// CSS
import './AuthForm.css'

const AuthForm = () => {
  // States
  const [mode, setMode] = useState("register");

  return (
    <div className="w-full h-screen flex items-center justify-center -z-10 bg-con">
      <AnimatePresence>
        {mode === "register" && <RegisterForm setMode={setMode} />}
        {mode === "login" && <LoginForm setMode={setMode} />}
        {mode === "forgetPassword" && <ForgetForm setMode={setMode} />}
      </AnimatePresence>
    </div>
  );
};

export default AuthForm;

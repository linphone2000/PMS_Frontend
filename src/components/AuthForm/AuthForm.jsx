import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { AnimatePresence } from "framer-motion";

const AuthForm = () => {
  // States
  const [mode, setMode] = useState("register");

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <AnimatePresence>
        {mode == "register" ? (
          <RegisterForm mode={mode} setMode={setMode} />
        ) : (
          <LoginForm mode={mode} setMode={setMode} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthForm;

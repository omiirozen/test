import React, { useState } from "react";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

export default function AuthStack({ onLogin }: { onLogin: () => void }) {
  const [isLogin, setIsLogin] = useState(true);

  if (isLogin) {
    return (
      <LoginScreen
        onSwitchToRegister={() => setIsLogin(false)}
      />
    );
  }

  return (
    <RegisterScreen
      onSwitchToLogin={() => setIsLogin(true)}
    />
  );
}
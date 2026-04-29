import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [currentView, setCurrentView] = useState("landing");

  return (
    <>
      {currentView === "landing" && (
        <LandingPage
          onLogin={() => setCurrentView("login")}
          onRegister={() => setCurrentView("register")}
        />
      )}

      {currentView === "login" && (
        <LoginPage onLogin={() => setCurrentView("app")} />
      )}

      {currentView === "register" && (
        <RegisterPage onRegister={() => setCurrentView("login")} />
      )}
    </>
  );
}

export default App;

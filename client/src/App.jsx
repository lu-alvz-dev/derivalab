import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PracticePage from "./pages/PracticePage";

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

      {currentView === "register" && (
        <RegisterPage onRegister={() => setCurrentView("login")} />
      )}

      {currentView === "login" && (
        <LoginPage onLogin={() => setCurrentView("app")} />
      )}

      {currentView === "app" && <PracticePage />}
    </>
  );
}

export default App;

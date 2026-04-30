import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PracticePage from "./pages/PracticePage";

function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <>
      {currentView === "landing" && (
        <LandingPage
          onLogin={() => setCurrentView("login")}
          onRegister={() => setCurrentView("register")}
        />
      )}

      {currentView === "register" && (
        <RegisterPage
          onRegister={() => {
            setSuccessMessage("Account created successfully. Please log in.");
            setCurrentView("login");
          }}
        />
      )}

      {currentView === "login" && (
        <LoginPage
          onLogin={() => setCurrentView("app")}
          successMessage={successMessage}
        />
      )}

      {currentView === "app" && <PracticePage />}
    </>
  );
}

export default App;

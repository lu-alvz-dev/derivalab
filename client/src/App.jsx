import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import PracticePage from "./pages/PracticePage";

function App() {
  const [currentView, setCurrentView] = useState("landing");

  return (
    <>
      {currentView === "landing" && (
        <LandingPage onStart={() => setCurrentView("login")} />
      )}

      {currentView === "login" && (
        <LoginPage onLogin={() => setCurrentView("practice")} />
      )}

      {currentView === "practice" && <PracticePage />}
    </>
  );
}

export default App;

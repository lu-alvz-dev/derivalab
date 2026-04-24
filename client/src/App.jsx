import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import PracticePage from "./pages/PracticePage";

function App() {
  const [currentView, setCurrentView] = useState("landing");

  return (
    <>
      {currentView === "landing" && (
        <LandingPage onStart={() => setCurrentView("practice")} />
      )}

      {currentView === "practice" && <PracticePage />}
    </>
  );
}

export default App;

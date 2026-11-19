import { useState } from "react";
import SetupScreen from "./SetupScreen.jsx";
import DraftScreen from "./DraftScreen.jsx";

export default function App() {
  const [settings, setSettings] = useState(null);

  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {settings === null ? (
        <SetupScreen onStart={setSettings} />
      ) : (
        <DraftScreen settings={settings} />
      )}
    </main>
  );
}
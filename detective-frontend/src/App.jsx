import { useState } from "react";
import { createNewGame } from "./api/client";
import StartScreen from "./components/StartScreen";
import CaseIntroScreen from "./components/CaseIntroScreen";
import SuspectsScreen from "./components/SuspectsScreen";
import InterrogationScreen from "./components/InterrogationScreen";
import AccusationScreen from "./components/AccusationScreen";
import VerdictScreen from "./components/VerdictScreen";
import NavDots from "./components/NavDots";

function App() {
  const [screen, setScreen] = useState(1);
  const [game, setGame] = useState(null);
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [result, setResult] = useState(null);
  const [startError, setStartError] = useState("");

  const handleStart = async () => {
    try {
      setStartError("");
      const newGame = await createNewGame();
      setGame(newGame);
      setSelectedSuspect(null);
      setResult(null);
      setScreen(2);
    } catch (err) {
      setStartError(err.message || "Failed to start new game");
    }
  };

  const handleUpdateSuspect = (suspectId, questionsLeft) => {
    setGame((prev) => ({
      ...prev,
      suspects: prev.suspects.map((s) =>
        s.id === suspectId ? { ...s, questions_left: questionsLeft } : s
      ),
    }));
  };

  return (
    <div className="page-wrap">
      <div className="app">
        <span className="screen-label">{screen} / 6</span>

        {screen === 1 && <StartScreen onStart={handleStart} error={startError} />}

        {screen === 2 && game && (
          <CaseIntroScreen
            game={game}
            onContinue={() => setScreen(3)}
            onRestart={handleStart}
          />
        )}

        {screen === 3 && game && (
          <SuspectsScreen
            game={game}
            onSelect={(suspect) => {
              setSelectedSuspect(suspect);
              setScreen(4);
            }}
            onAccuse={() => setScreen(5)}
          />
        )}

        {screen === 4 && game && selectedSuspect && (
          <InterrogationScreen
            game={game}
            suspect={game.suspects.find((s) => s.id === selectedSuspect.id)}
            onBack={() => setScreen(3)}
            onUpdateSuspect={handleUpdateSuspect}
          />
        )}

        {screen === 5 && game && (
          <AccusationScreen
            game={game}
            onResult={(res) => {
              setResult(res);
              setScreen(6);
            }}
          />
        )}

        {screen === 6 && result && (
          <VerdictScreen
            result={result}
            onRestart={() => {
              setScreen(1);
              setGame(null);
              setSelectedSuspect(null);
              setResult(null);
              setStartError("");
            }}
          />
        )}
      </div>

      <NavDots total={6} current={screen} onGo={setScreen} />
      <div className="helper-text">
        Click the dots or buttons to navigate screens
      </div>
    </div>
  );
}

export default App;
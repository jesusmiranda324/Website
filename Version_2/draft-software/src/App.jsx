
import React, { useState } from "react";
import Timer from "./Timer";
import Spotify from "./Spotify.jsx";
import ExcelUpload from "./ExcelUpload";
import PlayerLookup from "./PlayerLookup";
import BudgetDisplay from "./BudgetDisplay.jsx";
import SetupScreen from "./SetupScreen.jsx";

function App() {
    const [settings, setSettings] = useState(null);
    const [draftHistory, setDraftHistory] = useState([]);
    const [teamPicks, setTeamPicks] = useState([]);

    const [timerStopSignal, setTimerStopSignal] = useState(0);
    const [timerStartSignal, setTimerStartSignal] = useState(0);
    const [timerResetSignal, setTimerResetSignal] = useState(0);
    
    const [currentInputIndex, setCurrentInputIndex] = useState(0);
    const [focusSignal, setFocusSignal] = useState(0);

    const [autoStartTimer, setAutoStartTimer] = useState(true);
    

    // Start a new draft using the setup screen settings.
    function startDraft(newSettings) {
        setSettings(newSettings);

        const emptyPicks = Array.from(
            { length: newSettings.rounds },
            () => Array(newSettings.teams.length).fill(null)
        );

        setTeamPicks(emptyPicks);
        setDraftHistory([]);

        setCurrentInputIndex(0);
        setFocusSignal((current) => current + 1);

        setTimerStopSignal(0);
        setTimerStartSignal(0);
    }

    // Select a player and automatically move to the next empty input.
    function selectPlayer(roundIndex, teamIndex, player) {
        if (!player) return;

        const updatedPicks = teamPicks.map((round) => [...round]);

        updatedPicks[roundIndex][teamIndex] = player;

        setDraftHistory((history) => [
            ...history,
            teamPicks.map((round) => [...round])
        ]);

        setTeamPicks(updatedPicks);

        // Stop the timer after a successful player selection.
        setTimerStopSignal((current) => current + 1);

        const totalInputs = settings.rounds * settings.teams.length;

        const selectedIndex =
            roundIndex * settings.teams.length + teamIndex;

        // Find the next empty player input.
        for (let i = selectedIndex + 1; i < totalInputs; i++) {
            const nextRoundIndex = Math.floor(
                i / settings.teams.length
            );

            const nextTeamIndex = i % settings.teams.length;

            if (!updatedPicks[nextRoundIndex][nextTeamIndex]) {
                setCurrentInputIndex(i);
                setFocusSignal((current) => current + 1);

                // Reset the timer for the next selection.
                setTimerResetSignal((current) => current + 1);
                // Start the timer for the next selection if enabled.
                if (autoStartTimer) {
                  setTimerStartSignal((current) => current + 1);
                }

return;
            }
        }
    }

    // Undo the most recent player selection.
    function undoDraft() {
        if (draftHistory.length === 0) return;

        const previousPicks =
            draftHistory[draftHistory.length - 1];

        setTeamPicks(previousPicks);

        setDraftHistory((history) =>
            history.slice(0, -1)
        );

        // Highlight and focus the first empty input.
        const firstEmptyIndex = previousPicks.findIndex(
            (round) => round.some((player) => !player)
        );

        if (firstEmptyIndex !== -1) {
            const roundIndex = firstEmptyIndex;
            const teamIndex = previousPicks[roundIndex].findIndex(
                (player) => !player
            );

            const absoluteIndex =
                roundIndex * settings.teams.length + teamIndex;

            setCurrentInputIndex(absoluteIndex);
            setFocusSignal((current) => current + 1);
        }
    }

    // Return to the setup screen.
    function returnToSetup() {
        setSettings(null);
        setTeamPicks([]);
        setDraftHistory([]);

        setCurrentInputIndex(0);
        setFocusSignal(0);

        setTimerStopSignal(0);
        setTimerStartSignal(0);
    }

    // Show setup screen before the draft begins.
    if (settings === null) {
        return <SetupScreen onStart={startDraft} />;
    }

    return (
        <div
            className="top"
            style={{
                padding: "20px",
                fontFamily: "sans-serif",
                boxSizing: "border-box",
                width: "100%"
            }}
        >
            {/* Header and controls */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    alignItems: "center",
                    marginBottom: "20px",
                    width: "100%"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        justifySelf: "start"
                    }}
                >
                    <Timer
                        initialDurationMs={settings.timerDurationMs}
                        stopSignal={timerStopSignal}
                        startSignal={timerStartSignal}
                        resetSignal={timerResetSignal}
                    />

                    <div
                        className="topButtons"
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap"
                        }}
                    >
                      <label className="timer-setting">
                        <input
                            type="checkbox"
                            checked={autoStartTimer}
                            onChange={(e) => setAutoStartTimer(e.target.checked)}
                        />
                            Auto-start timer
                        </label>
                        <button
                            onClick={undoDraft}
                            disabled={draftHistory.length === 0}
                        >
                            Undo
                        </button>

                        <button onClick={returnToSetup}>
                            Return to Set Up
                        </button>

                        <div id="spotify">
                            <Spotify />
                        </div>
                    </div>
                </div>

                <div
                    id="headerGroup"
                    style={{
                        textAlign: "center",
                        justifySelf: "center"
                    }}
                >
                    <h1 style={{ margin: "0 0 5px 0" }}>
                        DraftBoss!
                    </h1>

                    <h3
                        style={{
                            margin: 0,
                            color: "#666",
                            fontWeight: "normal"
                        }}
                    >
                        Fantasy Basketball Drafter
                    </h3>
                </div>
            </div>

            {/* Excel upload */}
            <div
                className="inputBar"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "40px 0"
                }}
            >
                <ExcelUpload />
            </div>

            {/* Draft table */}
            <div
                className="table"
                id="table"
                style={{
                    marginTop: "20px",
                    overflowX: "auto"
                }}
            >
                <table
                    border="1"
                    cellPadding="10"
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        textAlign: "center"
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: "#eaeaea" }}>
                            <th>Round</th>

                            {settings.teams.map((team, teamIndex) => (
                                <th key={team.id || teamIndex}>
                                    <div>{team.name}</div>

                                    <BudgetDisplay
                                        budget={team.startingBudget}
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {teamPicks.map((round, roundIndex) => (
                            <tr key={roundIndex}>
                                <td>{roundIndex + 1}</td>

                                {round.map((player, teamIndex) => {
                                    const inputIndex =
                                        roundIndex * settings.teams.length +
                                        teamIndex;

                                    const isCurrentInput =
                                        currentInputIndex === inputIndex;

                                    return (
                                        <td
                                            key={settings.teams[teamIndex].id || teamIndex}
                                            className={isCurrentInput ? "active-pick" : ""}
                                        >
                                            <PlayerLookup
                                                player={player}

                                                focusSignal={
                                                    isCurrentInput
                                                        ? focusSignal
                                                        : 0
                                                }

                                                onPlayerSelect={(selectedPlayer) =>
                                                    selectPlayer(
                                                        roundIndex,
                                                        teamIndex,
                                                        selectedPlayer
                                                    )
                                                }
                                            />
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;

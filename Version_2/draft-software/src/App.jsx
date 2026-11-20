
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

    function startDraft(newSettings) {
        setSettings(newSettings);

        const emptyPicks = Array.from(
            { length: newSettings.rounds },
            () => Array(newSettings.teams.length).fill(null)
        );

        setTeamPicks(emptyPicks);
        setDraftHistory([]);
        setTimerStopSignal(0);
    }

    function selectPlayer(roundIndex, teamIndex, player) {
        if (!player) return;

        setDraftHistory((history) => [
            ...history,
            teamPicks.map((round) => [...round])
        ]);

        setTeamPicks((currentPicks) => {
            const updatedPicks = currentPicks.map((round) => [...round]);
            updatedPicks[roundIndex][teamIndex] = player;
            return updatedPicks;
        });

        setTimerStopSignal((current) => current + 1);
    }

    function undoDraft() {
        if (draftHistory.length === 0) return;

        const previousPicks = draftHistory[draftHistory.length - 1];

        setTeamPicks(previousPicks);
        setDraftHistory((history) => history.slice(0, -1));
    }

    function returnToSetup() {
        setSettings(null);
        setTeamPicks([]);
        setDraftHistory([]);
        setTimerStopSignal(0);
    }

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
                    />

                    <div className="topButtons" style={{ display: "flex", gap: "10px" }}>
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

                <div id="headerGroup" style={{ textAlign: "center", justifySelf: "center" }}>
                    <h1 style={{ margin: "0 0 5px 0" }}>New Website!</h1>
                    <h3 style={{ margin: 0, color: "#666", fontWeight: "normal" }}>
                        Temp Layout
                    </h3>
                </div>
            </div>

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

            <div
                className="table"
                id="table"
                style={{ marginTop: "20px", overflowX: "auto" }}
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
                                    <BudgetDisplay budget={team.startingBudget} />
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {teamPicks.map((round, roundIndex) => (
                            <tr key={roundIndex}>
                                <td>{roundIndex + 1}</td>

                                {round.map((player, teamIndex) => (
                                    <td key={settings.teams[teamIndex].id || teamIndex}>
                                        <PlayerLookup
                                            player={player}
                                            onPlayerSelect={(selectedPlayer) =>
                                                selectPlayer(roundIndex, teamIndex, selectedPlayer)
                                            }
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;

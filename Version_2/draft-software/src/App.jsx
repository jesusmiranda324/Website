import React, {useState} from "react";
import Timer from "./Timer";
import Spotify from "./Spotify.jsx";
import ExcelUpload from "./ExcelUpload";
import PlayerLookup from "./PlayerLookup";
import BudgetDisplay from "./BudgetDisplay.jsx";

function App() {
  const [teamPicks, setTeamPicks] = useState([null, null, null, null]);
  const [draftHistory, setDraftHistory] = useState([]);

  function selectPlayer(teamIndex, player) {
    setDraftHistory([...draftHistory, teamPicks]);

    const updatedPicks = [...teamPicks];
    updatedPicks[teamIndex] = player;

    setTeamPicks(updatedPicks);
  }

  function undoDraft() {
    if (draftHistory.length === 0) {
      return;
    }

    const previousPicks = draftHistory[draftHistory.length - 1];

    setTeamPicks(previousPicks);
    setDraftHistory(draftHistory.slice(0, -1));
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
          <Timer />

          <div className="topButtons" style={{ display: "flex", gap: "10px" }}>
            <div id="undo">
              <button
                  onClick={undoDraft}
                  disabled={draftHistory.length === 0}
              >
                Undo
              </button>
            </div>

            <div id="spotify">
              <Spotify />
            </div>
          </div>
        </div>

        <div id="headerGroup" style={{ textAlign: "center", justifySelf: "center" }}>
          <div id="newWebsite">
            <h1 style={{ margin: "0 0 5px 0" }}>New Website!</h1>
          </div>

          <div id="temp">
            <h3 style={{ margin: 0, color: "#666", fontWeight: "normal" }}>
              Temp Layout
            </h3>
          </div>
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

              <th>
                <div>Team 1</div>
                <BudgetDisplay budget={150000000} />
              </th>

              <th>
                <div>Team 2</div>
                <BudgetDisplay budget={150000000} />
              </th>

              <th>
                <div>Team 3</div>
                <BudgetDisplay budget={150000000} />
              </th>

              <th>
                <div>Team 4</div>
                <BudgetDisplay budget={150000000} />
              </th>
            </tr>
          </thead>

          <tbody>
  <tr>
    <td>1</td>

    <td>
      <PlayerLookup
        player={teamPicks[0]}
        onPlayerSelect={(player) => selectPlayer(0, player)}
      />
    </td>

    <td>
      <PlayerLookup
        player={teamPicks[1]}
        onPlayerSelect={(player) => selectPlayer(1, player)}
      />
    </td>

    <td>
      <PlayerLookup
        player={teamPicks[2]}
        onPlayerSelect={(player) => selectPlayer(2, player)}
      />
    </td>

    <td>
      <PlayerLookup
        player={teamPicks[3]}
        onPlayerSelect={(player) => selectPlayer(3, player)}
      />
    </td>
  </tr>
</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
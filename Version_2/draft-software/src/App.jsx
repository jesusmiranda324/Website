import React from "react";
import Timer from "./Timer";
import Spotify from "./Spotify.jsx";
import ExcelUpload from "./ExcelUpload";
import PlayerLookup from "./PlayerLookup";

function App() {
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
              <input type="button" value="Undo (maybe move?)" />
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
              <th>Team 1</th>
              <th>Team 2</th>
              <th>Team 3</th>
              <th>Team 4</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td><PlayerLookup /></td>
              <td><PlayerLookup /></td>
              <td><PlayerLookup /></td>
              <td>Etc...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
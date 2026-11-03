
import React, { useState } from "react";

function PlayerLookup() {
  const [playerId, setPlayerId] = useState("");
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState("");

  async function searchPlayer() {
    if (!playerId.trim()) {
      setPlayer(null);
      setError("");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/players.json?search=${encodeURIComponent(playerId)}`
      );

      if (!response.ok) {
        throw new Error("Unable to search for player.");
      }

      const data = await response.json();

      if (data.length > 0) {
        setPlayer(data[0]);
        setError("");
      } else {
        setPlayer(null);
        setError("Player not found.");
      }
    } catch (err) {
      setPlayer(null);
      setError("Could not connect to Rails.");
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Input ID"
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
        onBlur={searchPlayer}
        onKeyDown={(e) => {
          if (e.key === "Enter") searchPlayer();
        }}
        style={{ width: "80%", padding: "4px" }}
      />

      {player && <p>{player.name}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default PlayerLookup;

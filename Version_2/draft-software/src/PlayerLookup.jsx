import React, { useState } from "react";

function PlayerLookup({player, onPlayerSelect}) {
  const [playerId, setPlayerId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function searchPlayer() {
    if (!playerId.trim()) {
      onPlayerSelect(null);
      setError("");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/players.json?search=${encodeURIComponent(playerId)}`
      );

      if (!response.ok) {
        throw new Error("Unable to search for player.");
      }

      const data = await response.json();

      if (data.length > 0) {
        onPlayerSelect(data[0]);
        setError("");
      } else {
        onPlayerSelect(null);
        setError("Player not found.");
      }
    } catch (err) {
      onPlayerSelect(null);
      setError("Could not connect to Rails.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="player-lookup">
   {!player && (
      <input
        type="text"
        placeholder="Search player ID..."
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
        onBlur={searchPlayer}
        onKeyDown={(e) => {
          if (e.key === "Enter") searchPlayer();
        }}
      />
    )}
      {loading && <p>Searching...</p>}

      {player && (
  <div className="player-result">
    <br/>
    <p><strong>ID:</strong> {player.player_id}</p>
    <p><strong>Name:</strong> {player.name}</p>
    <p>
      <strong>Salary:</strong>{" "}
      {player.salary != null
        ? `$${Number(player.salary).toLocaleString()}`
        : "N/A"}
    </p>
  </div>
)}

      {error && <p className="player-error">{error}</p>}
    </div>
  );
}

export default PlayerLookup;
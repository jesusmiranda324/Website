import { useState } from "react";

export default function SetupScreen({ onStart }) {
  const [teamNames, setTeamNames] = useState(["Team 1", "Team 2"]);
  const [budget, setBudget] = useState("200");
  const [minutes, setMinutes] = useState("2");
  const [seconds, setSeconds] = useState("0");
  const [error, setError] = useState("");
  const [rounds, setRounds] = useState("10");

  function changeTeamCount(event) {
    const count = Number(event.target.value);

    if (!Number.isInteger(count) || count < 1 || count > 20) {
      return;
    }

    setTeamNames((current) =>
      Array.from(
        { length: count },
        (_, index) => current[index] ?? `Team ${index + 1}`
      )
    );
  }

  function changeTeamName(index, name) {
    setTeamNames((current) =>
      current.map((value, i) => (i === index ? name : value))
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const startingBudget = Number(budget);
    const minuteValue = Number(minutes);
    const secondValue = Number(seconds);
    const roundCount = Number(rounds);

    if (teamNames.some((name) => !name.trim())) {
      setError("Please enter a name for every team.");
      return;
    }

    if (
      budget.trim() === "" ||
      !Number.isFinite(startingBudget) ||
      startingBudget < 0
    ) {
      setError("Please enter a valid budget.");
      return;
    }

    if (
      !Number.isInteger(minuteValue) ||
      !Number.isInteger(secondValue) ||
      minuteValue < 0 ||
      secondValue < 0 ||
      secondValue > 59 ||
      minuteValue * 60 + secondValue <= 0
    ) {
      setError("Please enter a timer duration greater than zero.");
      return;
    }

    if (!Number.isInteger(roundCount) || roundCount < 1) {
      setError("Please enter a whole number of rounds greater than zero.");
      return;
    }

    onStart({
      rounds: roundCount,
      timerDurationMs: (minuteValue * 60 + secondValue) * 1000,
      teams: teamNames.map((name, index) => ({
        id: `team-${index + 1}`,
        name: name.trim(),
        startingBudget,
      })),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Set Up Your Draft</h1>

      <p>
        <label>
          Number of teams:{" "}
          <select value={teamNames.length} onChange={changeTeamCount}>
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </label>
      </p>

      {teamNames.map((name, index) => (
        <p key={index}>
          <label>
            Team {index + 1} name:{" "}
            <input
              value={name}
              onChange={(event) =>
                changeTeamName(index, event.target.value)
              }
              required
            />
          </label>
        </p>
      ))}

      <p>
        <label>
          Starting budget per team:{" "}
          <input
            type="number"
            min="0"
            step="100"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            required
          />
        </label>
      </p>
      
      <p>
        <label>
          Number of rounds:{" "}
          <input
            type="number"
            min="1"
            step="1"
            value={rounds}
            onChange={(event) => setRounds(event.target.value)}
            required
          />
        </label>
      </p>

      <fieldset>
        <legend>Timer duration</legend>

        <label>
          Minutes:{" "}
          <input
            type="number"
            min="0"
            step="1"
            value={minutes}
            onChange={(event) => setMinutes(event.target.value)}
            required
          />
        </label>

        <label>
          Seconds:{" "}
          <input
            type="number"
            min="0"
            max="59"
            step="1"
            value={seconds}
            onChange={(event) => setSeconds(event.target.value)}
            required
          />
        </label>
      </fieldset>

      {error && <p role="alert">{error}</p>}

      <button type="submit">Start Draft</button>
    </form>
  );
}
import { useState } from "react";

export default function ExcelUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();

    if (!file) {
      setMessage("Please select an Excel file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:3000/players/import",
        {
          method: "POST",
          body: formData,
        }
      );

      const responseText = await response.text();

let data;

try {
  data = JSON.parse(responseText);
} catch {
  console.error("Rails returned non-JSON:", responseText);
  throw new Error(
    `Rails returned non-JSON (HTTP ${response.status}). Check the Rails terminal.`
  );
}

if (!response.ok) {
  throw new Error(
    data.error || `Upload failed (${response.status})`
  );
}

setMessage(data.message || "Import completed successfully.");

      if (!response.ok) {
        throw new Error(
          data.error || `Upload failed (${response.status})`
        );
      }

      setMessage(data.message || "Import completed successfully.");
      setFile(null);
      e.target.reset();
    } catch (error) {
      setMessage(`Upload failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Importing..." : "Import Excel"}
      </button>

      {message && <p role="status">{message}</p>}
    </form>
  );
}
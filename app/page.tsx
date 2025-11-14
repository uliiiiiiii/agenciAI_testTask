"use client";
import { FormEvent, useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert("Please upload a PDF");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("apiKey", apiKey);

    // wysyłka danych
    setLoading(true);
    const res = await fetch("/api/summarize", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);
    setSummary(data.summary || "Error: no summary returned");
  };

  return (
    //akcja użytkownika
    <main style={{ padding: 40 }}>
      <h1>PDF Summarizer</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload PDF:</label>
          <br />
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <label>Gemini API Key:</label>
          <br />
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API key (optional, there is a default one)"
          />
        </div>

        <button style={{ marginTop: 20 }} type="submit">
          Generate Summary
        </button>
      </form>

      {loading && <p>Generating summary...</p>}

      {summary && (
        <div style={{ marginTop: 40 }}>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </main>
  );
}

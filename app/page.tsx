"use client";
import { FormEvent, useState } from "react";
import "./styles.css";

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
    <main className="cyber-container">
      {/* Background glows */}
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="glow glow-3" />

      <div className="card">
        <h1 className="title">PDF Summarizer</h1>
        <p className="subtitle">
          Upload your PDF and get a clean summary using Gemini.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Upload PDF:</label>

            <label className="file-upload">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              <span>{file ? file.name : "Select PDF"}</span>
            </label>
          </div>

          <div className="form-group">
            <label className="label">Gemini API Key:</label>
            <input
              className="input-text"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key (optional)"
            />
          </div>

          <button className="btn" type="submit">
            {loading ? "Generating..." : "Generate Summary"}
          </button>
        </form>

        {summary && (
          <div className="summary-box">
            <h2 className="summary-title">Summary</h2>
            <p className="summary-text">{summary}</p>
          </div>
        )}
      </div>
    </main>
  );
}

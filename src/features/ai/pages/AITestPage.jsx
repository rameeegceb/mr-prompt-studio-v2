import { useState } from "react";

import useAI from "../hooks/useAI";
import AIService from "../services/AIService";

export default function AITestPage() {
  const { config } = useAI();

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const execute = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const ai = new AIService(config);

      const result = await ai.execute(prompt);

      setResponse(result.message?.content || JSON.stringify(result, null, 2));
    } catch (err) {
      setResponse(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-6xl p-8">

      <h1 className="mb-6 text-3xl font-bold">
        AI Test Console
      </h1>

      <div className="rounded-xl border bg-white p-6 shadow">

        <label className="mb-2 block font-semibold">
          Prompt
        </label>

        <textarea
          rows={10}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full rounded-lg border p-4"
        />

        <button
          onClick={execute}
          disabled={loading}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white"
        >
          {loading ? "Executing..." : "Execute"}
        </button>

      </div>

      <div className="mt-8 rounded-xl border bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-semibold">
          Response
        </h2>

        <pre className="whitespace-pre-wrap text-sm">
          {response}
        </pre>

      </div>

    </div>
  );
}
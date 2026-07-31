import { useEffect, useState } from "react";

import PromptEngine from "../services/PromptEngine";
import PromptRepository from "../repository/PromptRepository";

export default function usePromptStudio() {
  const [prompt, setPrompt] = useState("");

  const [improvedPrompt, setImprovedPrompt] =
    useState("");

  const [evaluation, setEvaluation] =
    useState(null);

  const [history, setHistory] =
    useState([]);

  useEffect(() => {
    const savedPrompt = PromptRepository.load();
    const savedHistory = PromptRepository.getHistory();

    if (savedPrompt) {
      setPrompt(savedPrompt);
    }

    setHistory(savedHistory);
  }, []);

  const updateHistory = () => {
    setHistory(PromptRepository.getHistory());
  };

  /*
   * Live Evaluation
   * Debounced to avoid evaluating
   * on every single keystroke.
   */

  useEffect(() => {
    if (!prompt.trim()) {
      PromptRepository.clear();
      setEvaluation(null);
      return;
    }

    PromptRepository.save(prompt);

    const timer = setTimeout(() => {
      const result =
        PromptEngine.evaluate(prompt);

      setEvaluation(result);
    }, 350);

    return () => clearTimeout(timer);
  }, [prompt]);

  const handleImprove = async () => {
    if (!prompt.trim()) return;

    const result =
      await PromptEngine.improve(prompt);

    setImprovedPrompt(
      result.improvedPrompt
    );

    setEvaluation(result);

    PromptRepository.addToHistory(prompt);
    updateHistory();
  };

  const handleEvaluate = () => {
    if (!prompt.trim()) return;

    const result =
      PromptEngine.evaluate(prompt);

    setEvaluation(result);

    PromptRepository.addToHistory(prompt);
    updateHistory();
  };

  const handleConvert = (
    format = "poml"
  ) => {
    if (!prompt.trim()) return;

    setImprovedPrompt(
      PromptEngine.convert(
        prompt,
        format
      )
    );

    PromptRepository.addToHistory(prompt);
    updateHistory();
  };

  const handleClear = () => {
    setPrompt("");

    setImprovedPrompt("");

    setEvaluation(null);

    PromptRepository.clear();
  };

  const restoreHistoryItem = (id) => {
    const item = PromptRepository.getHistory().find(
      (entry) => entry.id === id
    );

    if (!item) return;

    setPrompt(item.prompt);
  };

  const deleteHistoryItem = (id) => {
    PromptRepository.removeFromHistory(id);
    updateHistory();
  };

  const clearHistory = () => {
    PromptRepository.clearHistory();
    setHistory([]);
  };

  return {
    prompt,

    setPrompt,

    improvedPrompt,

    evaluation,

    history,

    handleImprove,

    handleEvaluate,

    handleConvert,

    handleClear,

    restoreHistoryItem,

    deleteHistoryItem,

    clearHistory,
  };
}
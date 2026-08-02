import { useEffect, useState } from "react";

import PromptEngine from "../services/PromptEngine";
import PromptRepository from "../repository/PromptRepository";

export default function usePromptStudio() {
  const [prompt, setPrompt] = useState(
    () => PromptRepository.load() || ""
  );

  const [improvedPrompt, setImprovedPrompt] =
    useState("");

  const [evaluation, setEvaluation] =
    useState(null);

  const [history, setHistory] =
    useState(() => PromptRepository.getHistory());

  const [versions, setVersions] =
    useState(() => PromptRepository.getVersions());

  const updateHistory = () => {
    setHistory(PromptRepository.getHistory());
  };

  const updateVersions = () => {
    setVersions(PromptRepository.getVersions());
  };

  /*
   * Live Evaluation
   * Debounced to avoid evaluating
   * on every single keystroke.
   */

  useEffect(() => {
    if (!prompt.trim()) {
      PromptRepository.clear();
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
    PromptRepository.addVersion({
      originalPrompt: prompt,
      generatedPrompt: result.improvedPrompt,
      action: "Improve",
    });

    updateHistory();
    updateVersions();
  };

  const handleEvaluate = () => {
    if (!prompt.trim()) return;

    const result =
      PromptEngine.evaluate(prompt);

    setEvaluation(result);

    PromptRepository.addToHistory(prompt);
    PromptRepository.addVersion({
      originalPrompt: prompt,
      generatedPrompt: "",
      action: "Evaluate",
    });

    updateHistory();
    updateVersions();
  };

  const handleConvert = (
    format = "poml"
  ) => {
    if (!prompt.trim()) return;

    const convertedPrompt =
      PromptEngine.convert(
        prompt,
        format
      );

    setImprovedPrompt(convertedPrompt);

    PromptRepository.addToHistory(prompt);
    PromptRepository.addVersion({
      originalPrompt: prompt,
      generatedPrompt: convertedPrompt,
      action: "Convert",
    });

    updateHistory();
    updateVersions();
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

  const restoreVersion = (id) => {
    const item = PromptRepository.getVersions().find(
      (entry) => entry.id === id
    );

    if (!item) return;

    setPrompt(item.originalPrompt);
  };

  const deleteVersion = (id) => {
    PromptRepository.deleteVersion(id);
    updateVersions();
  };

  const clearVersions = () => {
    PromptRepository.clearVersions();
    setVersions([]);
  };

  return {
    prompt,

    setPrompt,

    improvedPrompt,

    evaluation,

    history,

    versions,

    handleImprove,

    handleEvaluate,

    handleConvert,

    handleClear,

    restoreHistoryItem,

    deleteHistoryItem,

    clearHistory,

    restoreVersion,

    deleteVersion,

    clearVersions,
  };
}
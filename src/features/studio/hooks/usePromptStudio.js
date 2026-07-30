import { useEffect, useState } from "react";

import PromptEngine from "../services/PromptEngine";

export default function usePromptStudio() {
  const [prompt, setPrompt] = useState("");

  const [improvedPrompt, setImprovedPrompt] =
    useState("");

  const [evaluation, setEvaluation] =
    useState(null);

  /*
   * Live Evaluation
   * Debounced to avoid evaluating
   * on every single keystroke.
   */

  useEffect(() => {
    if (!prompt.trim()) {
      setEvaluation(null);
      return;
    }

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
  };

  const handleEvaluate = () => {
    if (!prompt.trim()) return;

    const result =
      PromptEngine.evaluate(prompt);

    setEvaluation(result);
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
  };

  const handleClear = () => {
    setPrompt("");

    setImprovedPrompt("");

    setEvaluation(null);
  };

  return {
    prompt,

    setPrompt,

    improvedPrompt,

    evaluation,

    handleImprove,

    handleEvaluate,

    handleConvert,

    handleClear,
  };
}
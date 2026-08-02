import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PromptStatistics from "../domain/PromptStatistics";
import PromptEngine from "../services/PromptEngine";
import PromptRepository from "../repository/PromptRepository";
import VersionHistoryService from "../services/VersionHistoryService";

const STATUS = {
  idle: "Idle",
  evaluating: "Evaluating",
  improving: "Improving",
  converting: "Converting",
  saving: "Saving",
  completed: "Completed",
  error: "Error",
};

const getErrorMessage = (
  error,
  fallbackMessage
) => {
  if (
    typeof error?.message === "string" &&
    error.message.trim()
  ) {
    return error.message.trim();
  }

  return fallbackMessage;
};

export default function usePromptStudio() {
  const [prompt, setPromptState] = useState(
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

  const [status, setStatus] = useState(
    STATUS.idle
  );

  const [error, setError] = useState("");

  const [isBuilderOpen, setIsBuilderOpen] = useState(true);

  const setPrompt = (nextPrompt) => {
    setPromptState(nextPrompt);

    if (!nextPrompt.trim()) {
      setImprovedPrompt("");
      setEvaluation(null);
      setStatus((currentStatus) =>
        currentStatus === STATUS.error
          ? currentStatus
          : STATUS.idle
      );
    }
  };

  const updateHistory = () => {
    const nextHistory =
      PromptRepository.getHistory();

    setHistory(nextHistory);

    return nextHistory;
  };

  const updateVersions = () => {
    const nextVersions =
      PromptRepository.getVersions();

    setVersions(nextVersions);

    return nextVersions;
  };

  const clearError = () => {
    setError("");

    setStatus((currentStatus) =>
      currentStatus === STATUS.error
        ? STATUS.idle
        : currentStatus
    );
  };

  const setRuntimeStatus = (
    nextStatus
  ) => {
    if (nextStatus !== STATUS.error) {
      setError("");
    }

    setStatus(nextStatus);
  };

  const persistPrompt = (
    nextPrompt,
    {
      skipClear = false,
    } = {}
  ) => {
    if (!nextPrompt?.trim()) {
      if (!skipClear) {
        PromptRepository.clear();
      }

      return false;
    }

    return PromptRepository.save(nextPrompt);
  };

  const evaluatePrompt = (
    nextPrompt
  ) => {
    if (!nextPrompt?.trim()) {
      return null;
    }

    return PromptEngine.evaluate(nextPrompt);
  };

  const applyPromptState = ({
    prompt: nextPrompt,
    improved = "",
    evaluationResult = null,
  }) => {
    setPrompt(nextPrompt);
    setImprovedPrompt(improved);
    setEvaluation(evaluationResult);
    persistPrompt(nextPrompt);
  };

  const appendHistory = (
    nextPrompt
  ) => {
    if (!nextPrompt?.trim()) {
      return null;
    }

    const entry =
      PromptRepository.addToHistory(nextPrompt);

    updateHistory();

    return entry;
  };

  const saveVersionEntry = ({
    prompt: versionPrompt,
    generatedPrompt = "",
    action,
    comment = "",
  }) => {
    const storedVersions =
      PromptRepository.getVersions();

    const nextVersion =
      VersionHistoryService.createVersion({
        versions: storedVersions,
        prompt: versionPrompt,
        generatedPrompt,
        action,
        comment,
      });

    if (!nextVersion) {
      return null;
    }

    PromptRepository.addVersion(nextVersion);
    updateVersions();

    return nextVersion;
  };

  const finalizeRuntimeAction = ({
    nextPrompt,
    improved = "",
    evaluationResult = null,
    historyPrompt,
    versionPrompt,
    versionGeneratedPrompt = "",
    versionAction,
    versionComment = "",
    successMessage,
  }) => {
    if (typeof nextPrompt === "string") {
      applyPromptState({
        prompt: nextPrompt,
        improved,
        evaluationResult,
      });
    } else {
      if (typeof improved === "string") {
        setImprovedPrompt(improved);
      }

      if (evaluationResult !== undefined) {
        setEvaluation(evaluationResult);
      }
    }

    if (historyPrompt) {
      appendHistory(historyPrompt);
    }

    let savedVersion = null;

    if (versionAction && versionPrompt) {
      savedVersion = saveVersionEntry({
        prompt: versionPrompt,
        generatedPrompt:
          versionGeneratedPrompt,
        action: versionAction,
        comment: versionComment,
      });
    }

    setRuntimeStatus(STATUS.completed);

    if (successMessage) {
      toast.success(successMessage);
    }

    return savedVersion;
  };

  const handleRuntimeError = (
    runtimeError,
    fallbackMessage
  ) => {
    const message = getErrorMessage(
      runtimeError,
      fallbackMessage
    );

    setError(message);
    setStatus(STATUS.error);
    toast.error(message);

    return null;
  };

  const runRuntimeAction = async ({
    status: runtimeStatus,
    operation,
    onSuccess,
    fallbackError,
  }) => {
    setRuntimeStatus(runtimeStatus);

    try {
      const result = await operation();

      return onSuccess
        ? onSuccess(result)
        : result;
    } catch (runtimeError) {
      return handleRuntimeError(
        runtimeError,
        fallbackError
      );
    }
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

    persistPrompt(prompt);

    const timer = setTimeout(() => {
      try {
        setRuntimeStatus(STATUS.evaluating);

        const result =
          PromptEngine.evaluate(prompt);

        setEvaluation(result);
        setStatus(STATUS.completed);
      } catch (runtimeError) {
        handleRuntimeError(
          runtimeError,
          "Prompt evaluation failed."
        );
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [prompt]);

  const handleImprove = async () => {
    if (!prompt.trim()) return;

    return runRuntimeAction({
      status: STATUS.improving,
      fallbackError:
        "Prompt improvement failed.",
      operation: () =>
        PromptEngine.improve(prompt),
      onSuccess: (result) =>
        finalizeRuntimeAction({
          nextPrompt: prompt,
          improved: result.improvedPrompt,
          evaluationResult: result,
          historyPrompt: prompt,
          versionPrompt: prompt,
          versionGeneratedPrompt:
            result.improvedPrompt,
          versionAction: "Improve",
          successMessage:
            "Prompt Improved",
        }),
    });
  };

  const handleEvaluate = () => {
    if (!prompt.trim()) return;

    return runRuntimeAction({
      status: STATUS.evaluating,
      fallbackError:
        "Prompt evaluation failed.",
      operation: () =>
        Promise.resolve(
          evaluatePrompt(prompt)
        ),
      onSuccess: (result) =>
        finalizeRuntimeAction({
          nextPrompt: prompt,
          improved: improvedPrompt,
          evaluationResult: result,
          historyPrompt: prompt,
          versionPrompt: prompt,
          versionAction: "Evaluate",
          successMessage:
            "Prompt Evaluated",
        }),
    });
  };

  const handleConvert = (
    format = "poml"
  ) => {
    if (!prompt.trim()) return;

    return runRuntimeAction({
      status: STATUS.converting,
      fallbackError:
        "Prompt conversion failed.",
      operation: () =>
        Promise.resolve(
          PromptEngine.convert(
            prompt,
            format
          )
        ),
      onSuccess: (convertedPrompt) =>
        finalizeRuntimeAction({
          nextPrompt: prompt,
          improved: convertedPrompt,
          evaluationResult:
            evaluatePrompt(prompt),
          historyPrompt: prompt,
          versionPrompt: prompt,
          versionGeneratedPrompt:
            convertedPrompt,
          versionAction: "Convert",
          successMessage:
            "Prompt Converted",
        }),
    });
  };

  const saveCurrentVersion = (
    comment = ""
  ) => {
    if (!prompt.trim()) return null;

    return runRuntimeAction({
      status: STATUS.saving,
      fallbackError:
        "Version save failed.",
      operation: () => Promise.resolve(true),
      onSuccess: () =>
        finalizeRuntimeAction({
          nextPrompt: prompt,
          improved: improvedPrompt,
          evaluationResult:
            evaluation ??
            evaluatePrompt(prompt),
          historyPrompt: prompt,
          versionPrompt: prompt,
          versionAction: "Save",
          versionComment: comment,
          successMessage:
            "Version Saved",
        }),
    });
  };

  const handleClear = () => {
    setPrompt("");

    setImprovedPrompt("");

    setEvaluation(null);

    PromptRepository.clear();

    setRuntimeStatus(STATUS.idle);
    clearError();
  };

  const restoreHistoryItem = (id) => {
    const item = PromptRepository.getHistory().find(
      (entry) => entry.id === id
    );

    if (!item) return;

    return runRuntimeAction({
      status: STATUS.saving,
      fallbackError:
        "History restore failed.",
      operation: () =>
        Promise.resolve(item.prompt),
      onSuccess: (restoredPrompt) =>
        finalizeRuntimeAction({
          nextPrompt: restoredPrompt,
          improved: "",
          evaluationResult:
            evaluatePrompt(restoredPrompt),
          historyPrompt: restoredPrompt,
          successMessage:
            "History Restored",
        }),
    });
  };

  const deleteHistoryItem = (id) => {
    PromptRepository.removeFromHistory(id);
    updateHistory();
    toast.success("Delete Completed");
  };

  const clearHistory = () => {
    PromptRepository.clearHistory();
    setHistory([]);
    toast.success("Delete Completed");
  };

  const restoreVersion = (id) => {
    const item =
      PromptRepository.getVersion(id);

    if (!item) return;

    return runRuntimeAction({
      status: STATUS.saving,
      fallbackError:
        "Version restore failed.",
      operation: () => Promise.resolve(item),
      onSuccess: (version) =>
        finalizeRuntimeAction({
          nextPrompt: version.content,
          improved:
            version.generatedPrompt || "",
          evaluationResult:
            evaluatePrompt(version.content),
          historyPrompt: version.content,
          successMessage:
            "Version Restored",
        }),
    });
  };

  const deleteVersion = (id) => {
    PromptRepository.deleteVersion(id);
    updateVersions();
    toast.success("Delete Completed");
  };

  const saveVersionComment = (
    id,
    comment = ""
  ) => {
    const updatedVersion =
      PromptRepository.updateVersion(id, {
        comment,
      });

    if (!updatedVersion) {
      return null;
    }

    updateVersions();
    toast.success("Version Saved");

    return updatedVersion;
  };

  const compareVersions = (
    baseVersionId,
    targetVersionId
  ) => {
    const baseVersion =
      PromptRepository.getVersion(baseVersionId);
    const targetVersion =
      PromptRepository.getVersion(targetVersionId);

    return VersionHistoryService.compareVersions(
      baseVersion,
      targetVersion
    );
  };

  const clearVersions = () => {
    PromptRepository.clearVersions();
    setVersions([]);
    toast.success("Delete Completed");
  };

  const openBuilder = () => {
    setIsBuilderOpen(true);
  };

  const closeBuilder = () => {
    setIsBuilderOpen(false);
  };

  const currentVersion =
    VersionHistoryService.getCurrentVersion(
      versions,
      prompt
    );

  const promptStatistics =
    new PromptStatistics(prompt);

  const metrics = {
    currentVersion:
      currentVersion?.displayNumber ??
      "Unsaved",
    historyCount: history.length,
    versionCount: versions.length,
    wordCount: promptStatistics.words,
    characterCount:
      promptStatistics.characters,
    tokenCount: promptStatistics.tokens,
    readingTime:
      promptStatistics.readingTime,
    promptScore:
      evaluation?.score?.overall ?? 0,
    complexity:
      evaluation?.analysis?.complexity ?? "-",
  };

  const isEvaluating =
    status === STATUS.evaluating;
  const isImproving =
    status === STATUS.improving;
  const isConverting =
    status === STATUS.converting;
  const isSaving =
    status === STATUS.saving;
  const isLoading = [
    STATUS.evaluating,
    STATUS.improving,
    STATUS.converting,
    STATUS.saving,
  ].includes(status);

  return {
    prompt,

    setPrompt,

    improvedPrompt,

    evaluation,

    history,

    versions,

    status,

    error,

    isBuilderOpen,

    metrics,

    isLoading,

    isEvaluating,

    isImproving,

    isConverting,

    isSaving,

    clearError,

    openBuilder,

    closeBuilder,

    saveCurrentVersion,

    handleImprove,

    handleEvaluate,

    handleConvert,

    handleClear,

    restoreHistoryItem,

    deleteHistoryItem,

    clearHistory,

    restoreVersion,

    deleteVersion,

    saveVersionComment,

    compareVersions,

    clearVersions,
  };
}
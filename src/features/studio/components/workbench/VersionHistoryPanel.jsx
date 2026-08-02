import { useState } from "react";

import VersionHistoryService from "../../services/VersionHistoryService";

import VersionTimeline from "./VersionTimeline";
import VersionCompareDialog from "./VersionCompareDialog";
import VersionCommentDialog from "./VersionCommentDialog";

const createClosedDialogState = () => ({
  open: false,
  mode: "comment",
  versionId: null,
  comment: "",
});

export default function VersionHistoryPanel({
  versions,
  currentPrompt,
  onSaveVersion,
  onRestore,
  onDelete,
  onClear,
  onSaveComment,
  onCompareVersions,
}) {
  const [compareSelection, setCompareSelection] =
    useState([]);
  const [comparison, setComparison] =
    useState(null);
  const [commentDialog, setCommentDialog] =
    useState(createClosedDialogState);

  const decoratedVersions =
    VersionHistoryService.decorateVersions(
      versions,
      currentPrompt
    );

  const selectedVersions = compareSelection
    .map((id) =>
      decoratedVersions.find(
        (version) => version.id === id
      )
    )
    .filter(Boolean);

  const closeCommentDialog = () => {
    setCommentDialog(createClosedDialogState());
  };

  const handleToggleCompare = (id) => {
    setCompareSelection((currentSelection) => {
      if (currentSelection.includes(id)) {
        return currentSelection.filter(
          (item) => item !== id
        );
      }

      if (currentSelection.length === 2) {
        return [currentSelection[1], id];
      }

      return [...currentSelection, id];
    });
  };

  const handleOpenCompare = () => {
    if (compareSelection.length !== 2) {
      return;
    }

    const result = onCompareVersions(
      compareSelection[0],
      compareSelection[1]
    );

    if (!result) {
      return;
    }

    setComparison(result);
  };

  const handleOpenCommentDialog = (
    version
  ) => {
    setCommentDialog({
      open: true,
      mode: "comment",
      versionId: version.id,
      comment: version.comment || "",
    });
  };

  const handleOpenSaveDialog = () => {
    setCommentDialog({
      open: true,
      mode: "save",
      versionId: null,
      comment: "",
    });
  };

  const handleDelete = (id) => {
    onDelete(id);

    setCompareSelection((currentSelection) =>
      currentSelection.filter(
        (item) => item !== id
      )
    );
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    if (commentDialog.mode === "save") {
      const savedVersion = await onSaveVersion(
        commentDialog.comment
      );

      if (savedVersion) {
        closeCommentDialog();
      }

      return;
    }

    const updatedVersion = await onSaveComment(
      commentDialog.versionId,
      commentDialog.comment
    );

    if (updatedVersion) {
      closeCommentDialog();
    }
  };

  return (
    <>
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Version History
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Save, annotate, compare, and restore prompt versions without leaving the workbench.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleOpenSaveDialog}
                disabled={!currentPrompt.trim()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Save Version
              </button>

              <button
                onClick={handleOpenCompare}
                disabled={compareSelection.length !== 2}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
              >
                Compare Selected
              </button>

              <button
                onClick={onClear}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Clear Versions
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span>{decoratedVersions.length} stored versions</span>
            <span>{selectedVersions.length}/2 selected for compare</span>
          </div>
        </div>

        {decoratedVersions.length === 0 ? (
          <div className="p-6 text-sm text-slate-500">
            No version history available yet.
          </div>
        ) : (
          <div className="p-4">
            <VersionTimeline
              versions={decoratedVersions}
              compareSelection={compareSelection}
              onRestore={onRestore}
              onDelete={handleDelete}
              onComment={handleOpenCommentDialog}
              onToggleCompare={handleToggleCompare}
            />
          </div>
        )}
      </div>

      <VersionCompareDialog
        comparison={comparison}
        onClose={() => setComparison(null)}
      />

      <VersionCommentDialog
        open={commentDialog.open}
        title={
          commentDialog.mode === "save"
            ? "Save Version"
            : "Version Comment"
        }
        description={
          commentDialog.mode === "save"
            ? "Capture the current prompt as a numbered version and attach optional implementation context."
            : "Add or update contextual notes for this saved version."
        }
        comment={commentDialog.comment}
        submitLabel={
          commentDialog.mode === "save"
            ? "Save Version"
            : "Save Comment"
        }
        onChange={(value) =>
          setCommentDialog((currentDialog) => ({
            ...currentDialog,
            comment: value,
          }))
        }
        onClose={closeCommentDialog}
        onSubmit={handleSubmitComment}
      />
    </>
  );
}
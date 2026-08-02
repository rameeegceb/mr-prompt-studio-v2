# Prompt Studio Implementation

## Entry point

- Feature route is wired in `src/routes/AppRoutes.jsx`.
- Active path: `/studio`.
- Route element: `PromptStudio` from `src/features/studio/pages/PromptStudio.jsx`.

## Page composition

`src/features/studio/pages/PromptStudio.jsx` renders:
- `PromptStudioProvider` from `src/features/studio/state/PromptStudioProvider.jsx`
- `PageHeader` with title `Prompt Studio`
- `PromptWorkbench` from `src/features/studio/layouts/PromptWorkbench.jsx`

The page is wrapped in a context provider that exposes studio state and actions.

## State and context

`PromptStudioProvider` creates a React context using:
- `PromptStudioContext` in `src/features/studio/state/PromptStudioContext.jsx`
- custom hook `usePromptStudio` in `src/features/studio/hooks/usePromptStudio.js`

The hook manages local component state for:
- `prompt`
- `improvedPrompt`
- `evaluation`
- `history`
- `versions`

It exposes actions used by UI components:
- `setPrompt`
- `handleImprove`
- `handleEvaluate`
- `handleConvert`
- `handleClear`
- `restoreHistoryItem`
- `deleteHistoryItem`
- `clearHistory`
- `restoreVersion`
- `deleteVersion`
- `clearVersions`

### Initialization

On first render, `usePromptStudio` loads persisted values from `PromptRepository`:
- saved prompt text
- prompt history
- prompt versions

### Live evaluation

A `useEffect` hook persists the current prompt on change and runs debounced evaluation after 350ms.
- If prompt is empty, it clears persisted prompt and resets evaluation.
- Otherwise, it saves prompt and computes evaluation using `PromptEngine.evaluate(prompt)`.

## Persistence

`PromptRepository` in `src/features/studio/repository/PromptRepository.js` persists studio data in `localStorage` using:
- `mrpromptstudio.prompt`
- `mrpromptstudio.prompt.history`
- `mrpromptstudio.prompt.versions`

Supported operations:
- save / load / clear current prompt
- get / add / remove / clear prompt history
- get / add / delete / clear prompt versions

History storage maintains up to 20 recent prompts.
Versions storage maintains up to 50 saved versions.

## Workbench layout

`src/features/studio/layouts/PromptWorkbench.jsx` arranges three regions:
- left: `BuilderPanel`
- center: `EditorPanel`
- right: `HistoryPanel` and `AnalysisPanel`

### BuilderPanel

- `src/features/studio/panels/BuilderPanel.jsx`
- contains `PromptBuilder` from `src/features/studio/components/builder/PromptBuilder.jsx`
- generates a structured prompt and passes it to `studio.setPrompt`.

### EditorPanel

- `src/features/studio/panels/EditorPanel.jsx`
- displays current prompt editor and actions
- uses:
  - `EditorStatistics`
  - `PromptEditor`
  - `PromptActions`
  - `PromptOutput`

### AnalysisPanel

- `src/features/studio/panels/AnalysisPanel.jsx`
- renders enterprise analysis only when `studio.evaluation` exists
- otherwise shows a placeholder calling for prompt input
- displayed components:
  - `EnterpriseScoreCard`
  - `PromptHealthIndicator`
  - `ConfidenceMeter`
  - `FrameworkReason`
  - `PromptMetadata`
  - `StrengthsPanel`
  - `WeaknessesPanel`
  - `Recommendations`

### HistoryPanel

- `src/features/studio/components/workbench/HistoryPanel.jsx`
- lists persisted prompt history entries
- supports restore, delete, and clear actions
- wired to `studio.history` and provider callbacks

## Prompt builder

`PromptBuilder` provides a step-by-step prompt construction workflow with fields:
- Goal
- Role
- Context
- Audience
- Constraints
- Output
- Review

The builder generates prompt text using a fixed template with section headings:
- `# Role`
- `# Goal`
- `# Context`
- `# Audience`
- `# Constraints`
- `# Output Format`

This generated prompt is supplied to the editor via `onGenerate`.

## Prompt actions

`PromptActions` offers buttons for:
- `Improve`
- `Evaluate`
- `Convert`
- `Clear`

Behavior in `usePromptStudio`:
- `handleImprove`: calls `PromptEngine.improve`, stores result, updates history and versions
- `handleEvaluate`: calls `PromptEngine.evaluate`, stores history and versions
- `handleConvert`: calls `PromptEngine.convert(format)` and stores history and versions
- `handleClear`: clears prompt, improved prompt, evaluation, and persisted prompt

## Prompt output

`PromptOutput` displays `studio.improvedPrompt` or a placeholder when blank.

## Prompt engine and analysis stack

`src/features/studio/services/PromptEngine.js` is the central analysis engine.

### Evaluate

`PromptEngine.evaluate(prompt)` performs:
- prompt analysis via `PromptAnalyzer.analyze(prompt)`
- framework recommendation via `FrameworkEngine.recommend(analysis.intent)`
- scoring via `PromptScorer.score(analysis)`
- populates `EvaluationResult` with:
  - original prompt
  - analysis
  - framework
  - score
  - strengths
  - weaknesses
  - recommendations
  - improvements

### Improve

`PromptEngine.improve(prompt)` performs:
- `ImprovementService.improve(prompt)` to get an improved prompt from AI
- evaluates the improved prompt
- evaluates original prompt
- compares original and improved using `PromptComparer.compare`
- returns evaluation with comparison details and score delta

### Convert

`PromptEngine.convert(prompt, format)` delegates to `PromptConverter.convert`.

### Compare

`PromptEngine.compare(original, improved)` delegates to `PromptComparer.compare`.

## AI improvement pipeline

`src/features/studio/services/ImprovementService.js` performs prompt improvement by:
- loading saved AI configuration from `StorageService.get("ai-config")`
- defaulting to `defaultConfig` from `src/features/ai/config/defaultConfig`
- using `AIService` from `src/features/ai/services/AIService`
- executing an AI request with `improvePromptTemplate`
- returning the trimmed AI response

This confirms the studio feature leverages the shared AI service layer for prompt improvement.

## Analysis and comparison subservices

The Prompt Studio feature depends on the following analysis components:
- `PromptAnalyzer` (`src/features/studio/services/PromptAnalyzer.js`)
- `PromptScorer` (`src/features/studio/services/PromptScorer.js`)
- `PromptComparer` (`src/features/studio/services/PromptComparer.js`)
- `PromptConverter` (`src/features/studio/services/PromptConverter.js`)
- `FrameworkEngine` (`src/features/studio/services/FrameworkEngine.js`)

These services provide structured prompt quality analysis, scoring, framework recommendations, and format conversion.

## Summary

Prompt Studio is implemented as a React page at `/studio` with a provider-backed workbench.
It combines:
- interactive prompt building
- text editing
- AI-powered prompt improvement
- analysis dashboard
- persisted prompt history and version tracking

The runtime is driven by `usePromptStudio`, `PromptRepository`, and `PromptEngine`, with UI panels assembled in `PromptWorkbench`.

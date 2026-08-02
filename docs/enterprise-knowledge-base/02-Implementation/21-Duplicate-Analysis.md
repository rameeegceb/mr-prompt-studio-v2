# Duplicate Analysis

## Purpose

This document catalogs duplicate, legacy, and overlapping implementation artifacts in the current Mr. Prompt Studio codebase. It is based exclusively on the current repository contents and usage evidence, and it distinguishes active runtime paths from redundant or unused source elements.

## Scope

Included in this analysis:
- duplicate feature directory names and parallel feature implementations
- duplicate provider implementations and provider wiring
- duplicate or unused service files and runtime artifacts
- legacy source files that coexist with active implementations
- cross-domain naming collisions that may increase maintenance risk

Excluded from this analysis:
- general feature gaps unrelated to duplicate or redundant artifacts
- runtime behavior not directly tied to duplicate source paths

## Key Duplicate Artifacts

### 1. Duplicate / parallel feature directories

- `src/features/best-practices/` is active and used by `AppRoutes.jsx`.
- `src/features/bestPractices/` exists as an empty duplicate directory.
- `src/features/improvement/` is active and contains a complete improvement page, hooks, and services.
- `src/features/improve/` exists as an empty duplicate directory.
- `src/features/evaluation/` contains an empty `PromptEvaluationEngine.js` artifact.
- `src/features/evaluate/` exists as an empty duplicate directory.
- `src/features/convert/` exists as an empty duplicate directory.
- `src/features/comparison/` contains comparison service files, but current runtime comparison flows are implemented in `src/features/studio/services/PromptComparer.js` and `PromptEngine.compare`.

### 2. Duplicate provider implementation files

- `src/features/ai/providers/OpenAIProvider.js` is empty.
- `src/features/ai/providers/CopilotProvider.js` is empty.
- `src/features/ai/providers/AzureOpenAIProvider.js` is empty.
- `src/features/ai/providers/OllamaProvider.js` is implemented and selected by `ProviderFactory`.
- `src/features/ai/providers/MockProvider.js` is implemented and used as the default fallback.
- `src/providers/AIProvider.js`, `src/providers/OpenAIProvider.js`, `src/providers/CopilotProvider.js`, `src/providers/OllamaProvider.js`, and `src/providers/AzureOpenAIProvider.js` exist at the repository root, but no current source references these root-level provider files.

### 3. Duplicate / unused service modules

- `src/features/studio/services/ComparisonService.js` exists but is empty and unused by the active prompt comparison flow.
- `src/features/studio/services/EvaluationService.js` exists but is empty; prompt evaluation is implemented in `src/features/studio/services/PromptEngine.js`.
- `src/features/improvement/ai/ImprovementService.js` exists as an empty artifact while the active improvement path uses `src/features/improvement/services/PromptImprovementService.ts`.
- `src/features/comparison/services/PromptComparisonEngine.js` exists but is empty and not referenced by any import.
- `src/features/framework/services/FrameworkEngine.js` exists as an empty artifact while `src/features/studio/services/FrameworkEngine.js` is the active implementation used by prompt improvement and prompt engine.
- `src/features/evaluation/services/PromptEvaluationEngine.js` exists as an empty artifact and is not referenced by active routing or service flows.

### 4. Legacy and redundant source files

- `src/features/learning/services/CourseRepository.old.js` remains in the repository alongside the active `src/features/learning/repository/CourseRepository.js`.
- `src/features/ai/providers/ProviderFactory.js` selects only `OllamaProvider` or `MockProvider`, leaving empty provider stubs for Azure, OpenAI, and Copilot in place.
- `src/features/improvement/pages/ImprovePromptPage.tsx` is implemented but not registered in `src/routes/AppRoutes.jsx`.

### 5. Cross-domain naming collisions

- `PromptAnalyzer` exists in multiple feature areas:
  - `src/features/studio/services/PromptAnalyzer.js`
  - `src/features/knowledge/analysis/PromptAnalyzer.ts`
  - `src/features/improvement/analysis/PromptAnalyzer.js`
- `PromptAnalysis` model/interface definitions exist in both:
  - `src/features/intelligence/models/PromptAnalysis.ts`
  - `src/features/knowledge/models/PromptAnalysis.ts`
- `AIProvider` appears both as a React context provider in `src/features/ai/context/AIProvider.jsx` and as a provider implementation base class in `src/features/ai/providers/AIProvider.js`, as well as a TypeScript interface in `src/features/knowledge/ai/AIProvider.ts`.

## Duplicate Inventory Table

| Duplicate Artifact | Active Path | Duplicate / Legacy Path | Evidence | Status |
|---|---|---|---|---|
| Best Practices feature | `src/features/best-practices/` | `src/features/bestPractices/` | `src/routes/AppRoutes.jsx` imports `../features/best-practices/pages/BestPractices`; empty `src/features/bestPractices` | Duplicate directory / unused artifact |
| Improvement feature | `src/features/improvement/` | `src/features/improve/` | `src/features/improvement/pages/ImprovePromptPage.tsx`; empty `src/features/improve` | Duplicate directory / unused artifact |
| Evaluation feature | `src/features/evaluation/` | `src/features/evaluate/` | `src/features/evaluation/services/PromptEvaluationEngine.js` is empty; `src/features/evaluate` empty | Duplicate directory / stub artifact |
| Convert feature | `src/features/studio/services/PromptConverter.js` | `src/features/convert/` | `src/features/convert` empty; convert logic resides in studio service | Duplicate directory / unused artifact |
| Comparison feature | `src/features/studio/services/PromptComparer.js` / `PromptEngine.compare` | `src/features/comparison/` | `src/features/comparison/services/PromptComparisonEngine.js` empty; no imports found | Duplicate feature namespace / unused artifact |
| Framework engine | `src/features/studio/services/FrameworkEngine.js` | `src/features/framework/services/FrameworkEngine.js` | active studio framework recommendation file vs empty framework service file | Duplicate artifact / unused artifact |
| Improvement service | `src/features/improvement/services/PromptImprovementService.ts` | `src/features/improvement/ai/ImprovementService.js` | active hook and service path vs empty legacy artifact | Duplicate service artifact |
| Comparison service | active path in studio `PromptComparer.js` | `src/features/studio/services/ComparisonService.js` | empty file not used by prompt comparison | Unused service stub |
| Evaluation service | active path in studio `PromptEngine.evaluate` | `src/features/studio/services/EvaluationService.js` | empty file not used by current evaluation path | Unused service stub |
| AI provider stubs | `src/features/ai/providers/OllamaProvider.js` | `src/features/ai/providers/OpenAIProvider.js`, `src/features/ai/providers/CopilotProvider.js`, `src/features/ai/providers/AzureOpenAIProvider.js` | provider factory only selects Ollama/Mock | Stub implementation artifacts |
| Root provider files | no current imports found | `src/providers/*.js` | repository-level provider files duplicate feature provider names | Legacy duplicate directory |
| Legacy course loader | `src/features/learning/repository/CourseRepository.js` | `src/features/learning/services/CourseRepository.old.js` | old file remains in source tree | Legacy duplicate artifact |

## Duplicate Classification

| Classification | Description |
|----------------|-------------|
| Active Runtime | Used by the current application runtime |
| Legacy | Historical implementation retained in the repository |
| Placeholder | Directory or feature exists with minimal implementation |
| Stub | File exists with empty or incomplete implementation |
| Parallel | Similar functionality implemented in multiple locations |

## Findings

- The codebase contains multiple parallel feature directories where one path is active and the other path is empty or stale. These artifacts are present in the repository alongside active runtime implementations.
- Provider implementation paths are duplicated between root-level `src/providers` and feature-level `src/features/ai/providers`, increasing uncertainty about the canonical provider location.
- Several service files exist as stubs (`ComparisonService.js`, `EvaluationService.js`, `PromptEvaluationEngine.js`, `Provider` stubs) while active runtime behavior is implemented elsewhere.
- Legacy artifacts such as `CourseRepository.old.js` remain alongside active repository code.
- Cross-domain naming collisions for analyzer and model artifacts create duplicate names across feature boundaries and add ambiguity in feature ownership.

## Current Runtime Impact

- Developers must identify which path is active and which is redundant.
- Duplicate artifacts can be treated as separate feature paths, increasing the risk of divergence in refactoring, testing, and documentation.
- Empty or stubbed files with duplicate names can obscure the actual runtime implementation and slow investigation.
- Legacy files such as `CourseRepository.old.js` and `src/providers/*` remain in the repository alongside active implementation paths.

## Summary

This document records duplicate, legacy, placeholder, stub, and parallel implementations currently present in the repository.
It distinguishes active runtime implementations from unused and historical artifacts.
No architectural decisions or cleanup activities are documented in this document.

The most significant duplicate sources are:
- `src/features/best-practices/` vs `src/features/bestPractices/`
- `src/features/improvement/` vs `src/features/improve/`
- `src/features/evaluation/` vs `src/features/evaluate/`
- `src/features/convert/` vs `src/features/studio/services/PromptConverter.js`
- `src/features/comparison/` vs `src/features/studio/services/PromptComparer.js`
- Root provider files under `src/providers/` vs feature-level `src/features/ai/providers/`
- Legacy `CourseRepository.old.js` alongside `src/features/learning/repository/CourseRepository.js`

## Repository Statistics

- Feature directory duplicates: 4 empty or parallel directories identified (`src/features/bestPractices`, `src/features/improve`, `src/features/evaluate`, `src/features/convert`).
- Legacy artifacts: 2 legacy artifact sets identified (`src/features/learning/services/CourseRepository.old.js`; `src/providers/*.js` root-level duplicates of feature-level AI providers).
- Placeholder directories: 4 directories with minimal or no implementation present.
- Stub services: 9 empty or incomplete implementation files identified in the repository.
- Duplicate providers: 5 root-level provider files coexist with feature-level AI provider names.
- Duplicate repositories: 1 legacy course repository file exists alongside the active course repository implementation.
- Duplicate models: 1 duplicate `PromptAnalysis` model/interface family exists across feature areas.
- Cross-domain naming collisions: 3 naming collision families identified (`PromptAnalyzer`, `PromptAnalysis`, `AIProvider`).

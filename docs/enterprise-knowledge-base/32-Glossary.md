# Glossary

## Purpose

This glossary defines terminology used in the Mr. Prompt Studio Enterprise Knowledge Base and implementation. It standardizes project-specific terms drawn from the current repository and documentation.

## How To Use This Glossary

Use this glossary to understand the meaning of terms used in enterprise documents, implementation references, architecture descriptions, and feature descriptions. Refer to it when reviewing requirements, architecture, or source code to ensure consistent interpretation.

## Business Terms

Business Capability
- A discrete enterprise capability that the platform must deliver, such as learning, prompt management, or AI provider configuration.

Enterprise Platform
- The product concept for Mr. Prompt Studio as a shared enterprise system for prompt engineering, knowledge preservation, and AI execution.

Prompt Engineering
- The discipline of designing, improving, evaluating, and managing prompts for AI systems.

Prompt Framework
- A structured approach or model used by the platform to analyze, score, and improve prompts.

Learning Hub
- The feature within Mr. Prompt Studio that delivers course content, chapters, bookmarks, favorites, and progress tracking.

Prompt Library
- The feature that provides searchable and reusable prompt templates, filtering, preview, favorites, and recent usage tracking.

Prompt Studio
- The prompt engineering workbench feature for building, editing, improving, evaluating, and comparing prompts.

Knowledge Base
- The enterprise documentation and knowledge asset collection for the project, including governance, architecture, implementation, and roadmap documents.

Knowledge System
- The runtime system that loads, caches, indexes, and searches knowledge frameworks to support prompt analysis and recommendations.

AI Provider
- A configured integration target that executes AI requests through the shared AI abstraction layer.

Enterprise AI
- The broader AI capability that Mr. Prompt Studio supports while remaining independent of any single AI vendor.

## Architecture Terms

Feature Module
- A self-contained application area implemented under `src/features/`, with pages, state, hooks, services, and repositories.

Provider
- A runtime abstraction that encapsulates AI execution for a specific backend or service.

Repository Layer
- The set of repository classes that load, save, and manage feature data in the current application structure.

Service Layer
- The set of services that coordinate runtime behavior, calculations, AI execution, or feature workflows.

Knowledge Layer
- The runtime knowledge subsystem that loads frameworks, builds context, indexes data, and serves knowledge-backed responses.

AI Layer
- The runtime AI subsystem that provides configuration, provider selection, execution, and test tooling.

Context
- A React context object used to share state and functions across feature components.

Repository
- A source or persistence layer object that loads, saves, and manages domain data for a feature.

Service
- A domain logic component that performs calculations, API execution, analysis, or other runtime behavior.

Runtime
- The active application execution environment, including the React component tree, providers, and feature flows.

Component
- A reusable UI element or feature-specific module that renders a part of the user interface.

Runtime Lifecycle
- The sequence of application initialization and rendering steps from startup through route activation.

Runtime Flow
- The end-to-end data and event flow through providers, services, and feature components during execution.

State Management
- The handling of runtime state through React context, hooks, providers, and persistence services.

Persistence
- The act of saving and loading data across sessions, typically using `StorageService` and localStorage keys.

Dependency
- A relationship where one module, feature, or service relies on another for data, behavior, or configuration.

Configuration
- Runtime settings that control behavior, such as AI provider selection, endpoint, model, temperature, and timeout.

## AI Terms

AIProvider
- The abstract base class defining the interface for concrete AI provider implementations in `src/features/ai/providers/AIProvider.js`.

ProviderFactory
- The factory class in `src/features/ai/providers/ProviderFactory.js` that creates provider instances based on the active AI config.

MockProvider
- The development provider in `src/features/ai/providers/MockProvider.js` that simulates AI behavior and returns mock responses.

OllamaProvider
- The real provider implementation in `src/features/ai/providers/OllamaProvider.js` that calls a local Ollama endpoint for chat and tags.

OpenAIProvider
- The provider stub file `src/features/ai/providers/OpenAIProvider.js` present in the repository but currently empty.

AzureOpenAIProvider
- The provider stub file `src/features/ai/providers/AzureOpenAIProvider.js` present in the repository but currently empty.

CopilotProvider
- The provider stub file `src/features/ai/providers/CopilotProvider.js` present in the repository but currently empty.

AIService
- The shared service in `src/features/ai/services/AIService.js` that delegates AI operations to the selected provider.

StorageService
- The core localStorage wrapper in `src/core/services/StorageService.js` used for persisting configuration and feature data.

## Knowledge Terms

KnowledgeEngine
- The runtime engine in `src/features/knowledge/engine/KnowledgeEngine.ts` that coordinates analysis, recommendations, and knowledge context building.

KnowledgeRepository
- The startup repository in `src/features/knowledge/repository/KnowledgeRepository.ts` that loads frameworks, caches them, and builds the search index.

KnowledgeAnalyzer
- The analysis component in `src/features/knowledge/analysis/KnowledgeAnalyzer.ts` that uses search results to generate prompt analysis and framework recommendations.

KnowledgeSearchService
- The search facade in `src/features/knowledge/search/KnowledgeSearchService.ts` that delegates prompt search requests to `SearchEngine`.

KnowledgeIndexer
- The indexing component in `src/features/knowledge/indexing/KnowledgeIndexer.ts` that extracts metadata and populates the search index.

RecommendationEngine
- The engine in `src/features/knowledge/recommendation/RecommendationEngine.ts` that builds recommendation context from analysis output.

ContextBuilder
- The builder in `src/features/knowledge/context/ContextBuilder.ts` that assembles knowledge execution context and system prompts.

RuntimeEngine
- The runtime execution component in `src/features/knowledge/runtime/RuntimeEngine.ts` that dispatches feature requests through the knowledge pipeline.

RequestPipeline
- The pipeline in `src/features/knowledge/pipeline/RequestPipeline.ts` that routes prompt requests and returns knowledge-backed improvement responses.

## Prompt Studio Terms

PromptEngine
- The studio service in `src/features/studio/services/PromptEngine.js` that performs prompt analysis, scoring, improvement, conversion, and comparison.

PromptAnalyzer
- The studio service in `src/features/studio/services/PromptAnalyzer.js` that inspects prompt content and extracts analysis metadata.

PromptScorer
- The studio service in `src/features/studio/services/PromptScorer.js` that scores prompt quality.

PromptConverter
- The studio service in `src/features/studio/services/PromptConverter.js` that converts prompts into alternate formats.

PromptComparer
- The studio service in `src/features/studio/services/PromptComparer.js` that compares original and improved prompt outputs.

ImprovementService
- The studio service in `src/features/studio/services/ImprovementService.js` that invokes the AI runtime to rewrite and improve prompts.

PromptRepository
- The persistence repository in `src/features/studio/repository/PromptRepository.js` that stores prompt text, history, and versions in localStorage.

Version History
- The saved prompt versions stored by `PromptRepository` for later restoration.

Favorites
- A feature concept for marking prompt templates or learning items as preferred; implemented in prompt library and learning contexts.

History
- The stored sequence of previous prompts or user actions maintained by prompt studio or feature repositories.

## UI Terms

Dashboard
- The application landing section rendered at `/`, displayed through `DashboardLayout` with sidebar and header chrome.

Layout
- The page shell or composition structure used by features, such as `DashboardLayout` or `PromptLibraryLayout`.

Sidebar
- The left-hand navigation component used in the dashboard shell and settings.

Panel
- A grouped UI region inside a feature screen, such as a filter panel, gallery panel, or analysis panel.

Workbench
- The Prompt Studio screen layout for prompt building, editing, analysis, and history.

Editor
- The UI component area for writing or editing prompt text.

Preview
- The UI component used to display prompt template details or generated output.

Gallery
- The UI view that presents multiple prompt templates or cards for browsing.

Builder
- The structured prompt creation workflow within Prompt Studio, typically implemented by `PromptBuilder`.

Filter
- The UI control set used in the prompt library to narrow prompt templates by search, category, or other criteria.

## Development Terms

Feature
- A discrete functional area implemented under `src/features/`.

Hook
- A React hook function used to access context or encapsulate feature state logic.

Provider
- A React component or service wrapper that supplies context, configuration, or runtime behavior to descendants.

Context
- A React context object used to share feature state or configuration across a component subtree.

Model
- A domain object or data structure used to represent business entities such as courses, prompts, frameworks, or AI requests.

Utility
- A helper function or standalone module used across multiple features.

Repository
- A persistence abstraction for loading and saving domain data.

Service
- A class or module that implements domain behavior, analysis, or runtime operations.

Configuration
- Settings that control behavior, such as feature settings, AI provider parameters, or runtime flags.

## Acronyms

AI — Artificial Intelligence

MVP — Minimum Viable Product

SPA — Single-Page Application

UI — User Interface

ADR — Architecture Decision Record

PRD — Product Requirements Document

UX — User Experience

API — Application Programming Interface

LLM — Large Language Model

JSON — JavaScript Object Notation

CSS — Cascading Style Sheets

HTML — HyperText Markup Language

HTTP — HyperText Transfer Protocol

## Executive Summary

This glossary captures the current Mr. Prompt Studio terminology as used in repository documents and source code. It is intentionally project-specific and implementation-focused, reflecting the active concepts, features, and architecture of the current MVP.

Terms documented: 59

Architecture terms: 13

AI terms: 10

Knowledge terms: 9

Prompt Studio terms: 11

Evidence verification completed: yes
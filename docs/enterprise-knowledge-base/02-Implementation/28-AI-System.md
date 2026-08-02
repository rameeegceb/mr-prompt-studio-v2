# AI System Implementation

## Purpose

The AI System provides a shared enterprise AI integration layer for the application. It centralizes provider configuration, runtime provider selection, request execution, and local persistence of AI settings.

## Core runtime files

- `src/main.jsx`
  - Wraps the React tree with `AIProvider` so AI configuration is available throughout the app.
- `src/features/ai/context/AIProvider.jsx`
  - Loads AI configuration from `StorageService` under the key `ai-config`.
  - Exposes `config` and `updateConfig()` via React context.
- `src/features/ai/hooks/useAI.js`
  - Provides access to the `AIContext` from feature components.
- `src/features/ai/config/defaultConfig.js`
  - Defines the default provider configuration:
    - `provider: "ollama"`
    - `endpoint: "http://localhost:11434"`
    - `model: "qwen2.5:7b"`
    - `temperature: 0.2`
    - `timeout: 60000`

## Provider abstraction

- `src/features/ai/providers/AIProvider.js`
  - Defines the abstract provider interface.
  - Declares methods: `initialize()`, `execute()`, `testConnection()`, `getModels()`, `dispose()`.
- `src/features/ai/providers/ProviderFactory.js`
  - Creates provider instances from the active config.
  - Currently only `"ollama"` maps to a real provider implementation.
  - All other provider values fall back to `MockProvider`.

## Implemented providers

### `OllamaProvider`

- File: `src/features/ai/providers/OllamaProvider.js`
- Uses the configured `endpoint` to call:
  - `${endpoint}/api/tags` for connection tests and model listing
  - `${endpoint}/api/chat` for chat completion
- Supports both request shapes:
  - `execute(prompt)` for a plain user prompt
  - `execute(systemPrompt, userPrompt)` for a system/user prompt pair
- Returns only the trimmed generated text from the Ollama response.
- Logs errors to the browser console when requests fail.

### `MockProvider`

- File: `src/features/ai/providers/MockProvider.js`
- Simulates AI provider behavior for development.
- Always returns a `true` connection test and a single mock model.
- `execute(prompt)` returns a fake response containing the prompt text.

### Placeholder providers

- Files exist but are empty:
  - `src/features/ai/providers/OpenAIProvider.js`
  - `src/features/ai/providers/AzureOpenAIProvider.js`
  - `src/features/ai/providers/CopilotProvider.js`
- These are currently stubs and not implemented in the current runtime.

## AI service layer

- `src/features/ai/services/AIService.js`
  - Wraps provider creation and delegates AI operations.
  - Uses `ProviderFactory.create(config)` to instantiate the configured provider.
  - Supports:
    - `execute(systemPrompt, userPrompt)`
    - `getModels()`
    - `testConnection()`
- `AIService.execute(...)` preserves the two-call shape and forwards calls directly to the selected provider.

## Settings integration

- `src/features/settings/components/AIProviderSettings.jsx`
  - Renders the AI provider configuration UI inside the Settings page.
- `src/features/settings/components/ProviderSelector.jsx`
  - Allows the user to choose a provider from:
    - `mock`
    - `ollama`
    - `azure`
    - `openai`
    - `copilot`
  - Updates `ai-config` through the shared AI context.
- `src/features/settings/components/ProviderConfiguration.jsx`
  - Renders a provider-specific configuration component based on the selected provider.
  - The provider-specific components are currently informational placeholders.

## AI test console

- Temporary route: `/ai-test`
- Page: `src/features/ai/pages/AITestPage.jsx`
- Uses `useAI()` to read the current config and constructs an `AIService` instance.
- Executes `ai.execute(prompt)` and displays the response.
- The console exists primarily for validation and debugging.

## Prompt Studio integration

- `src/features/studio/services/ImprovementService.js`
  - Loads the saved AI configuration from `StorageService.get("ai-config")`.
  - Falls back to `defaultConfig` when no persisted config exists.
  - Uses `AIService` with `improvePromptTemplate` from `src/features/ai/prompts/ImprovePrompt.js`.
  - Sends a system prompt plus the user prompt to the AI provider.
  - Returns the trimmed AI response.

## Persistence

- AI settings are persisted in local storage using `core/services/StorageService.js`.
- `AIProvider` writes every update to the `ai-config` key.
- This means provider selection and endpoint/model values survive page reloads.

## Current runtime status

- The AI System is active and wired into the app through `AIProvider` in `src/main.jsx`.
- The shared AI service is consumed by:
  - `Prompt Studio` improvement workflows
  - the temporary `AI Test Console`
- The only real provider implementation present is `OllamaProvider`.
- Additional provider modules exist as placeholders and are not currently functional.

## Limitations and gaps

- Provider selection UI includes `azure`, `openai`, and `copilot`, but those providers are not implemented.
- Provider configuration pages are informational only; they do not persist provider-specific credentials or settings beyond the selected provider value.
- There is no current runtime wiring for model list retrieval or connection testing in the user-facing UI.
- `AIService` supports these operations, but the UI does not currently invoke them.

## Summary

The AI System is a centralized provider abstraction backed by a persisted `ai-config` context. It is designed to support multiple providers, but the current implementation is effectively a shared Ollama integration plus a mock fallback. The system is used by Prompt Studio for AI-powered prompt improvement and exposes an internal test console and settings UI for provider management.
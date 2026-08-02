# Settings

## Purpose

The Settings feature exposes the application configuration UI for AI provider selection and provider-specific settings. It is implemented as a dedicated settings page that renders a sidebar and a single AI provider settings panel.

## Scope

This documentation covers the current implementation of `src/features/settings/`, including pages, layouts, components, provider-specific configuration placeholders, and integration with the AI context, StorageService, routing, and dashboard navigation.

## Runtime Entry

- Route: `/settings`, wired in `src/routes/AppRoutes.jsx`.
- Navigation: the app navigation module `src/config/modules.js` includes a `settings` entry with `path: "/settings"`.
- Page: `src/features/settings/pages/SettingsPage.jsx`.
- Layout: `src/features/settings/components/SettingsLayout.jsx`.
- Components: `SettingsSidebar`, `AIProviderSettings`, `ProviderSelector`, `ProviderConfiguration`, plus provider-specific config components.

## Directory Structure

`src/features/settings/`
- `pages/`
  - `SettingsPage.jsx` - page entry component for the `/settings` route.
- `components/`
  - `SettingsLayout.jsx` - top-level settings layout with sidebar and main content.
  - `SettingsSidebar.jsx` - left-hand navigation panel within Settings.
  - `AIProviderSettings.jsx` - AI provider settings screen.
  - `ProviderSelector.jsx` - dropdown for selecting the active AI provider.
  - `ProviderConfiguration.jsx` - renders provider-specific configuration content.
  - `providers/`
    - `MockProviderConfig.jsx`
    - `OllamaProviderConfig.jsx`
    - `AzureProviderConfig.jsx`
    - `OpenAIProviderConfig.jsx`
    - `CopilotProviderConfig.jsx`
- `context/` - empty directory; no settings-specific React context is implemented.
- `hooks/` - empty directory; no settings-specific hooks are implemented.
- `services/` - empty directory; no settings-specific services are implemented.
- `settings/` - directory exists but is currently empty and unused.

## Feature Architecture

### Pages

`src/features/settings/pages/SettingsPage.jsx`
- Renders the `SettingsLayout` component.
- This page is the only active route under `src/features/settings`.

### Layouts

`src/features/settings/components/SettingsLayout.jsx`
- Composes the settings UI with `SettingsSidebar` and `AIProviderSettings`.
- Uses a two-column layout:
  - left: sidebar navigation
  - right: main settings content area

### Panels and Components

`src/features/settings/components/SettingsSidebar.jsx`
- Displays a static list of settings categories:
  - AI Provider
  - General
  - Appearance
  - About
- Uses Lucide icons for each item.
- The sidebar items are rendered as buttons, but they do not change the rendered page content.

`src/features/settings/components/AIProviderSettings.jsx`
- Main settings panel shown in the content area.
- Contains the page heading and description.
- Renders `ProviderSelector` and `ProviderConfiguration`.

`src/features/settings/components/ProviderSelector.jsx`
- Reads `config` and `updateConfig` from `useAI()`.
- Presents a `<select>` dropdown with provider options:
  - `mock`
  - `ollama`
  - `azure`
  - `openai`
  - `copilot`
- On change, calls `updateConfig({ provider: e.target.value })`.

`src/features/settings/components/ProviderConfiguration.jsx`
- Reads `config` from `useAI()`.
- Switches on `config.provider` to render one of the provider configuration components.
- Fallback: renders `MockProviderConfig` when the provider is not recognized.

`src/features/settings/components/providers/*`
- Each provider config component renders static informational content.
- `OllamaProviderConfig.jsx` and `MockProviderConfig.jsx` describe the selected provider.
- `OpenAIProviderConfig.jsx`, `AzureProviderConfig.jsx`, and `CopilotProviderConfig.jsx` are informational placeholders; they do not implement provider-specific settings or credential forms.

### Provider configuration

- The provider selector is the only settings control that actively changes application state.
- `ProviderConfiguration` displays UI based on the selected provider, but only `MockProviderConfig` and `OllamaProviderConfig` content is meaningful in the current implementation.
- No provider-specific inputs are persisted or wired for OpenAI, Azure OpenAI, or Copilot.

### AI settings

- The Settings feature depends on the shared AI context from `src/features/ai/context/AIProvider.jsx`.
- `useAI()` in `src/features/ai/hooks/useAI.js` is used by Settings components to access `config` and `updateConfig`.

### Shared UI usage

- Settings uses shared layout and typography classes from the application design system.
- It also uses the shared AI context rather than implementing its own settings state.

## Runtime Lifecycle

1. Application startup loads `src/main.jsx`.
2. `AIProvider` from `src/features/ai/context/AIProvider.jsx` wraps the entire app, establishing AI settings context.
3. The router in `src/routes/AppRoutes.jsx` registers `/settings` and maps it to `SettingsPage`.
4. The dashboard navigation configuration in `src/config/modules.js` exposes the `/settings` path.
5. When the user navigates to `/settings`, React renders `SettingsPage`.
6. `SettingsPage` renders `SettingsLayout`.
7. `SettingsLayout` renders `SettingsSidebar` and `AIProviderSettings`.
8. `AIProviderSettings` renders `ProviderSelector` and `ProviderConfiguration`.
9. `ProviderSelector` reads current AI config and updates provider selection through `updateConfig()`.
10. `ProviderConfiguration` renders provider-specific content for the active provider value.
11. The AI context persists configuration changes into `StorageService`.

## Runtime Flow

When a user changes AI provider settings:

- `ProviderSelector` captures the selected provider value.
- It calls `updateConfig({ provider: selectedProvider })` from `useAI()`.
- `AIProvider.updateConfig()` merges the update into the current config and writes the new object to local storage under `ai-config`.
- The updated `config` value propagates through the AI context.
- `ProviderConfiguration` immediately switches to the configuration component corresponding to the newly selected provider.
- The change is persisted and remains available to all consumers of the shared AI context.

## Component Inventory

- `src/features/settings/pages/SettingsPage.jsx`
  - Purpose: settings page entry component for `/settings`.
  - Runtime status: active.
  - Evidence: page is imported and routed in `src/routes/AppRoutes.jsx`.

- `src/features/settings/components/SettingsLayout.jsx`
  - Purpose: layout container for settings UI.
  - Runtime status: active.
  - Evidence: rendered by `SettingsPage.jsx`.

- `src/features/settings/components/SettingsSidebar.jsx`
  - Purpose: left-side navigation panel inside settings.
  - Runtime status: active.
  - Evidence: rendered by `SettingsLayout.jsx`.

- `src/features/settings/components/AIProviderSettings.jsx`
  - Purpose: settings panel for AI provider configuration.
  - Runtime status: active.
  - Evidence: rendered by `SettingsLayout.jsx`.

- `src/features/settings/components/ProviderSelector.jsx`
  - Purpose: provider selection dropdown.
  - Runtime status: active.
  - Evidence: imported and rendered by `AIProviderSettings.jsx`.

- `src/features/settings/components/ProviderConfiguration.jsx`
  - Purpose: renders provider-specific configuration panels.
  - Runtime status: active.
  - Evidence: imported and rendered by `AIProviderSettings.jsx`.

- `src/features/settings/components/providers/MockProviderConfig.jsx`
  - Purpose: informational panel for the Mock provider.
  - Runtime status: active when `config.provider === "mock"`.
  - Evidence: returned by `ProviderConfiguration.jsx` default case.

- `src/features/settings/components/providers/OllamaProviderConfig.jsx`
  - Purpose: informational panel for the Ollama provider.
  - Runtime status: active when `config.provider === "ollama"`.
  - Evidence: returned by `ProviderConfiguration.jsx`.

- `src/features/settings/components/providers/OpenAIProviderConfig.jsx`
  - Purpose: informational placeholder for OpenAI provider.
  - Runtime status: active when `config.provider === "openai"`.
  - Evidence: returned by `ProviderConfiguration.jsx`.

- `src/features/settings/components/providers/AzureProviderConfig.jsx`
  - Purpose: informational placeholder for Azure OpenAI provider.
  - Runtime status: active when `config.provider === "azure"`.
  - Evidence: returned by `ProviderConfiguration.jsx`.

- `src/features/settings/components/providers/CopilotProviderConfig.jsx`
  - Purpose: informational placeholder for Microsoft Copilot provider.
  - Runtime status: active when `config.provider === "copilot"`.
  - Evidence: returned by `ProviderConfiguration.jsx`.

## State Management

- AI settings state is managed in shared AI context, not within `src/features/settings/`.
- `useAI()` from `src/features/ai/hooks/useAI.js` is the only hook used in the Settings feature.
- `ProviderSelector` reads `config` and writes updates with `updateConfig()`.
- `AIProvider` merges updates and persists them via `StorageService.set("ai-config", newConfig)`.
- `ProviderConfiguration` only reads `config` and does not modify state.

## Provider Configuration

- `ProviderSelector` is the only interactive configuration control in the current implementation.
- `ProviderConfiguration` routes rendering to provider-specific panels.
- Implemented configuration content:
  - `MockProviderConfig.jsx`: development mock provider description.
  - `OllamaProviderConfig.jsx`: local Ollama instance description.
- Informational placeholders:
  - `OpenAIProviderConfig.jsx`
  - `AzureProviderConfig.jsx`
  - `CopilotProviderConfig.jsx`
- No provider-specific form fields or persisted credentials are implemented for OpenAI, Azure, or Copilot.

## Storage Integration

- Settings uses the shared AI context, which persists configuration into `StorageService`.
- `StorageService` stores application values in localStorage with prefix `mrpromptstudio`.
- The Settings UI indirectly persists provider selection using the key `ai-config`.
- `StorageService.get("ai-config", defaultConfig)` is used elsewhere in the app (for example, `src/features/studio/services/ImprovementService.js`) to load the current AI configuration.

## Dependencies

- AI System
  - Settings depends on the shared AI context from `src/features/ai/context/AIProvider.jsx`.
  - `ProviderSelector` and `ProviderConfiguration` use `useAI()`.
- Shared UI
  - Settings reuses shared layout styles and icon components.
- Dashboard
  - Navigation entry is defined in `src/config/modules.js`.
- App routing
  - `/settings` route is registered in `src/routes/AppRoutes.jsx`.

## Runtime Behavior

- The Settings feature is rendered when the user navigates to `/settings`.
- It always displays the AI provider settings panel and sidebar.
- Changing the provider updates the shared AI configuration and persists it.
- The rendered provider-specific configuration panel switches immediately based on the selected provider.
- No additional settings categories are currently implemented beyond the displayed sidebar items.

## Runtime Limitations

- Settings does not implement its own context, hooks, or services.
- Sidebar buttons are static and do not change the content area state.
- Only provider selection is functional; provider-specific configuration panels are informational placeholders.
- OpenAI, Azure OpenAI, and Copilot provider content is not backed by actual configuration behavior.
- There is no feature-specific persistence or storage logic inside `src/features/settings/`.

## Implementation Evidence

Reviewed files:
- `src/routes/AppRoutes.jsx`
- `src/config/modules.js`
- `src/features/settings/pages/SettingsPage.jsx`
- `src/features/settings/components/SettingsLayout.jsx`
- `src/features/settings/components/SettingsSidebar.jsx`
- `src/features/settings/components/AIProviderSettings.jsx`
- `src/features/settings/components/ProviderSelector.jsx`
- `src/features/settings/components/ProviderConfiguration.jsx`
- `src/features/settings/components/providers/MockProviderConfig.jsx`
- `src/features/settings/components/providers/OllamaProviderConfig.jsx`
- `src/features/settings/components/providers/OpenAIProviderConfig.jsx`
- `src/features/settings/components/providers/AzureProviderConfig.jsx`
- `src/features/settings/components/providers/CopilotProviderConfig.jsx`
- `src/features/ai/context/AIProvider.jsx`
- `src/features/ai/hooks/useAI.js`
- `src/core/services/StorageService.js`
- `src/features/studio/services/ImprovementService.js`

## Executive Summary

The Settings feature is a dedicated `/settings` page implemented with a sidebar and a single AI provider settings panel. It is structurally simple: `SettingsPage` renders `SettingsLayout`, which renders `SettingsSidebar` and `AIProviderSettings`.

AI provider selection is the only active configuration behavior. `ProviderSelector` updates the shared AI context using `useAI()`, and changes are persisted to localStorage under `ai-config` by `AIProvider`. `ProviderConfiguration` renders provider-specific informational panels, but only mock and Ollama descriptions are meaningfully implemented.

The feature depends on the app routing defined in `src/routes/AppRoutes.jsx`, navigation metadata in `src/config/modules.js`, and the shared AI context defined in `src/features/ai/context/AIProvider.jsx`. It has no settings-specific services, contexts, or hooks in the current repository state.

Runtime behavior is limited to selecting an AI provider and switching the configuration panel. Other sidebar categories are present visually but not wired to content changes or additional settings.

### Output summary
- Files reviewed: 16
- Components reviewed: 11
- Services reviewed: 2
- Contexts reviewed: 2
- Evidence verification completed: yes
import useAI from "../../ai/hooks/useAI";

import MockProviderConfig from "./providers/MockProviderConfig";
import OllamaProviderConfig from "./providers/OllamaProviderConfig";
import AzureProviderConfig from "./providers/AzureProviderConfig";
import OpenAIProviderConfig from "./providers/OpenAIProviderConfig";
import CopilotProviderConfig from "./providers/CopilotProviderConfig";

export default function ProviderConfiguration() {
  const { config } = useAI();

  switch (config.provider) {
    case "ollama":
      return <OllamaProviderConfig />;

    case "azure":
      return <AzureProviderConfig />;

    case "openai":
      return <OpenAIProviderConfig />;

    case "copilot":
      return <CopilotProviderConfig />;

    default:
      return <MockProviderConfig />;
  }
}
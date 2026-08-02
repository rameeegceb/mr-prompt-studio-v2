import useAI from "../../ai/hooks/useAI";

export default function ProviderSelector() {

    const { config, updateConfig } = useAI();

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <label className="mb-3 block font-medium">
                Provider
            </label>

            <select

                value={config.provider}

                onChange={(e)=>
                    updateConfig({
                        provider:e.target.value
                    })
                }

                className="w-full rounded-lg border px-4 py-3"
            >

                <option value="mock">
                    Mock Provider
                </option>

                <option value="ollama">
                    Ollama
                </option>

                <option value="azure">
                    Azure OpenAI
                </option>

                <option value="openai">
                    OpenAI
                </option>

                <option value="copilot">
                    Microsoft Copilot
                </option>

            </select>

        </div>

    );

}
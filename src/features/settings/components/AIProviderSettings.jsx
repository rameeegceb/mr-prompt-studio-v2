import ProviderSelector from "./ProviderSelector";
import ProviderConfiguration from "./ProviderConfiguration";

export default function AIProviderSettings() {
    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold">
                    AI Provider
                </h1>

                <p className="mt-2 text-slate-500">
                    Configure the AI provider used by Prompt Studio.
                </p>
            </div>

            <ProviderSelector />

            <ProviderConfiguration />

        </div>
    );
}
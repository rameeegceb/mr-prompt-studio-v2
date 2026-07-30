import { useState } from "react";
import AIContext from "./AIContext";
import defaultConfig from "../config/defaultConfig";
import StorageService from "../../../core/services/StorageService";

export default function AIProvider({ children }) {
    const [config, setConfig] = useState(() =>
        StorageService.get(
            "ai-config",
            defaultConfig
        )
    );

    const updateConfig = (updates) => {
        const newConfig = {
            ...config,
            ...updates,
        };

        setConfig(newConfig);

        StorageService.set(
            "ai-config",
            newConfig
        );
    };

    return (
        <AIContext.Provider
            value={{
                config,
                updateConfig,
            }}
        >
            {children}
        </AIContext.Provider>
    );
}
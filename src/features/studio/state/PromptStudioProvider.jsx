import PromptStudioContext from "./PromptStudioContext";
import usePromptStudio from "../hooks/usePromptStudio";

export default function PromptStudioProvider({
    children,
}) {

    const studio =
        usePromptStudio();

    return (

        <PromptStudioContext.Provider
            value={studio}
        >

            {children}

        </PromptStudioContext.Provider>

    );

}
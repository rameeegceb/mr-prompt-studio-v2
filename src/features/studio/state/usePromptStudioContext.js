import {
    useContext,
} from "react";

import PromptStudioContext
from "./PromptStudioContext";

export default function usePromptStudioContext() {

    return useContext(
        PromptStudioContext
    );

}
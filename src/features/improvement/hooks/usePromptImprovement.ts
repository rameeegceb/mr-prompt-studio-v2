import { useState } from "react";
import PromptImprovementService from "../services/PromptImprovementService";
import { ImprovementResult } from "../models/ImprovementResult";

export default function usePromptImprovement() {

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [result, setResult] =
        useState<ImprovementResult | null>(null);

    const improve = async (prompt: string) => {

        if (!prompt.trim()) return;

        setLoading(true);

        setResult(null);

        setError("");

        try {

            const response =
                await PromptImprovementService.improve(prompt);

            setResult(response);

        }

        catch (e: any) {

            setError(e.message);

        }

        finally {

            setLoading(false);

        }

    };

    const reset = () => {

        setResult(null);

        setError("");

    };

    return {

        improve,

        reset,

        loading,

        error,

        result

    };

}
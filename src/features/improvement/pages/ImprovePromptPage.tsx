import { useState } from "react";

import PromptEditor from "../components/PromptEditor";
import ImproveButton from "../components/ImproveButton";
import ScoreCard from "../components/ScoreCard";
import FrameworkCard from "../components/FrameworkCard";
import ImprovementPanel from "../components/ImprovementPanel";
import TechniqueList from "../components/TechniqueList";
import RecommendationList from "../components/RecommendationList";

import usePromptImprovement from "../hooks/usePromptImprovement";

export default function ImprovePromptPage() {

    const [prompt, setPrompt] = useState("");

    const {

        improve,

        loading,

        result

    } = usePromptImprovement();

    return (

        <div className="max-w-7xl mx-auto p-8 space-y-8">

            <h1 className="text-3xl font-bold">

                Improve Prompt

            </h1>

            <PromptEditor

                value={prompt}

                onChange={setPrompt}

            />

            <ImproveButton

                loading={loading}

                onClick={() => improve(prompt)}

            />

            {

                result && (

                    <>

                        <div className="grid grid-cols-2 gap-6">

                            <ScoreCard

                                score={result.score}

                            />

                            <FrameworkCard

                                framework={result.framework}

                                confidence={result.confidence}

                            />

                        </div>

                        <ImprovementPanel

                            prompt={result.improvedPrompt}

                        />

                        <div className="grid grid-cols-2 gap-6">

                            <TechniqueList

                                items={result.techniques}

                            />

                            <RecommendationList

                                items={result.recommendations}

                            />

                        </div>

                    </>

                )

            }

        </div>

    );

}
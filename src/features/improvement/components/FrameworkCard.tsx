interface Props {

    framework: string;

    confidence: number;

}

export default function FrameworkCard({

    framework,

    confidence

}: Props) {

    return (

        <div className="rounded-xl border bg-white p-6">

            <h3 className="font-semibold">

                Recommended Framework

            </h3>

            <div className="mt-4 text-xl font-bold">

                {framework}

            </div>

            <div className="mt-2 text-blue-600">

                Confidence {confidence}%

            </div>

        </div>

    );

}
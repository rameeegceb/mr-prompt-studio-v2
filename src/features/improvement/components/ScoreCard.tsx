interface Props {

    score: number;

}

export default function ScoreCard({

    score

}: Props) {

    return (

        <div className="rounded-xl border bg-white p-6">

            <h3 className="font-semibold text-lg">

                Prompt Score

            </h3>

            <div className="text-5xl font-bold mt-3 text-blue-600">

                {score}

            </div>

            <div className="text-gray-500">

                /100

            </div>

        </div>

    );

}
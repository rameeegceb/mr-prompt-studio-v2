interface Props {

    prompt: string;

}

export default function ImprovementPanel({

    prompt

}: Props) {

    return (

        <div className="rounded-xl border bg-white p-6">

            <h3 className="font-semibold mb-4">

                Improved Prompt

            </h3>

            <textarea

                readOnly

                value={prompt}

                className="w-full h-72 resize-none rounded-lg border p-4 bg-slate-50"

            />

        </div>

    );

}
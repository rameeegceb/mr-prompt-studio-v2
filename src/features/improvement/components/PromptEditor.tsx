interface Props {

    value: string;

    onChange(value: string): void;

}

export default function PromptEditor({

    value,

    onChange

}: Props) {

    return (

        <textarea

            value={value}

            onChange={(e) => onChange(e.target.value)}

            placeholder="Paste your prompt here..."

            className="w-full h-64 rounded-xl border border-slate-300 bg-white p-4 resize-none focus:ring-2 focus:ring-blue-500"

        />

    );

}
interface Props {

    loading: boolean;

    onClick(): void;

}

export default function ImproveButton({

    loading,

    onClick

}: Props) {

    return (

        <button

            onClick={onClick}

            disabled={loading}

            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50"

        >

            {

                loading

                    ? "Improving..."

                    : "Improve Prompt"

            }

        </button>

    );

}
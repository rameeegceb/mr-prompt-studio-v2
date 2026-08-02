interface Props {

    items: string[];

}

export default function TechniqueList({

    items

}: Props) {

    return (

        <div className="rounded-xl border bg-white p-6">

            <h3 className="font-semibold mb-4">

                Techniques Applied

            </h3>

            <ul className="space-y-2">

                {

                    items.map(item => (

                        <li key={item}>

                            • {item}

                        </li>

                    ))

                }

            </ul>

        </div>

    );

}
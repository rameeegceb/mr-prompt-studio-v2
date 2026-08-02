import {
    Bot,
    Settings,
    Palette,
    Info
} from "lucide-react";

const items = [
    {
        id: "ai",
        label: "AI Provider",
        icon: Bot
    },
    {
        id: "general",
        label: "General",
        icon: Settings
    },
    {
        id: "appearance",
        label: "Appearance",
        icon: Palette
    },
    {
        id: "about",
        label: "About",
        icon: Info
    }
];

export default function SettingsSidebar() {
    return (
        <aside className="w-72 border-r bg-white">
            <div className="border-b p-6">
                <h2 className="text-xl font-semibold">
                    Settings
                </h2>
            </div>

            <nav className="p-3">
                {items.map(item => {
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            className="mb-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition hover:bg-slate-100"
                        >
                            <Icon size={18} />

                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}
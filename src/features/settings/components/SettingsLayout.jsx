import SettingsSidebar from "./SettingsSidebar";
import AIProviderSettings from "./AIProviderSettings";

export default function SettingsLayout() {
    return (
        <div className="flex h-full">
            <SettingsSidebar />

            <main className="flex-1 overflow-auto bg-slate-50 p-8">
                <AIProviderSettings />
            </main>
        </div>
    );
}
class PromptRepository {

    STORAGE_KEY =
        "mrpromptstudio.prompt";

    HISTORY_KEY =
        "mrpromptstudio.prompt.history";

    VERSIONS_KEY =
        "mrpromptstudio.prompt.versions";

    save(prompt) {
        localStorage.setItem(
            this.STORAGE_KEY,
            JSON.stringify(prompt)
        );
    }

    load() {
        const value =
            localStorage.getItem(
                this.STORAGE_KEY
            );

        if (!value) return null;

        return JSON.parse(value);
    }

    clear() {
        localStorage.removeItem(
            this.STORAGE_KEY
        );
    }

    getHistory() {
        const value =
            localStorage.getItem(
                this.HISTORY_KEY
            );

        if (!value) return [];

        try {
            return JSON.parse(value);
        } catch {
            return [];
        }
    }

    addToHistory(prompt) {
        const text = prompt?.trim();

        if (!text) return;

        const history = this.getHistory();

        const existingIndex = history.findIndex(
            (item) => item.prompt === text
        );

        if (existingIndex !== -1) {
            history.splice(existingIndex, 1);
        }

        history.unshift({
            id: `${Date.now()}-${Math.random()}`,
            prompt: text,
            timestamp: new Date().toISOString(),
        });

        const nextHistory = history.slice(0, 20);

        localStorage.setItem(
            this.HISTORY_KEY,
            JSON.stringify(nextHistory)
        );
    }

    removeFromHistory(id) {
        const history = this.getHistory();

        const nextHistory = history.filter(
            (item) => item.id !== id
        );

        localStorage.setItem(
            this.HISTORY_KEY,
            JSON.stringify(nextHistory)
        );
    }

    clearHistory() {
        localStorage.removeItem(
            this.HISTORY_KEY
        );
    }

    getVersions() {
        const value =
            localStorage.getItem(
                this.VERSIONS_KEY
            );

        if (!value) return [];

        try {
            return JSON.parse(value);
        } catch {
            return [];
        }
    }

    addVersion(version) {
        if (!version) return;

        const originalPrompt = version.originalPrompt?.trim();
        const generatedPrompt = version.generatedPrompt?.trim();
        const action = version.action?.trim();

        if (!originalPrompt || !action) return;

        const storedVersions = this.getVersions();

        const nextVersion = {
            id: version.id || `${Date.now()}-${Math.random()}`,
            timestamp:
                version.timestamp ||
                new Date().toISOString(),
            originalPrompt,
            generatedPrompt: generatedPrompt ?? "",
            action,
        };

        const nextVersions = [
            nextVersion,
            ...storedVersions,
        ].slice(0, 50);

        localStorage.setItem(
            this.VERSIONS_KEY,
            JSON.stringify(nextVersions)
        );
    }

    deleteVersion(id) {
        const versions = this.getVersions();

        const nextVersions = versions.filter(
            (item) => item.id !== id
        );

        localStorage.setItem(
            this.VERSIONS_KEY,
            JSON.stringify(nextVersions)
        );
    }

    clearVersions() {
        localStorage.removeItem(
            this.VERSIONS_KEY
        );
    }

}

export default new PromptRepository();

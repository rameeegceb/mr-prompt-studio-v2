import StorageService from "../../../core/services/StorageService";
import VersionRepository from "./VersionRepository";

class PromptRepository {

    STORAGE_KEY =
        "prompt";

    HISTORY_KEY =
        "prompt.history";

    save(prompt) {
        const nextPrompt =
            prompt ?? "";
        const currentPrompt =
            this.load() ?? "";

        if (currentPrompt === nextPrompt) {
            return false;
        }

        StorageService.set(
            this.STORAGE_KEY,
            nextPrompt
        );

        return true;
    }

    load() {
        return StorageService.get(
            this.STORAGE_KEY,
            null
        );
    }

    clear() {
        StorageService.remove(
            this.STORAGE_KEY
        );
    }

    getHistory() {
        const history =
            StorageService.get(
                this.HISTORY_KEY,
                []
            );

        return Array.isArray(history)
            ? history
            : [];
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

        StorageService.set(
            this.HISTORY_KEY,
            nextHistory
        );

        return nextHistory[0] ?? null;
    }

    removeFromHistory(id) {
        const history = this.getHistory();

        const nextHistory = history.filter(
            (item) => item.id !== id
        );

        StorageService.set(
            this.HISTORY_KEY,
            nextHistory
        );

        return nextHistory;
    }

    clearHistory() {
        StorageService.remove(
            this.HISTORY_KEY
        );
    }

    getVersions() {
        return VersionRepository.getAll();
    }

    getVersion(id) {
        return VersionRepository.findById(id);
    }

    addVersion(version) {
        if (!version) return null;

        return VersionRepository.save(version);
    }

    updateVersion(id, changes) {
        return VersionRepository.update(
            id,
            changes
        );
    }

    deleteVersion(id) {
        VersionRepository.delete(id);
    }

    clearVersions() {
        VersionRepository.clear();
    }

}

export default new PromptRepository();

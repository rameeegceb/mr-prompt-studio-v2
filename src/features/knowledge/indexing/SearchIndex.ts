import { Framework } from "../models/Framework";

class SearchIndex {
    private frameworks = new Map<string, Framework>();

    add(framework: Framework) {
        this.frameworks.set(framework.id, framework);
    }

    addMany(frameworks: Framework[]) {
        frameworks.forEach(f => this.add(f));
    }

    get(id: string) {
        return this.frameworks.get(id);
    }

    getAll() {
        return Array.from(this.frameworks.values());
    }

    clear() {
        this.frameworks.clear();
    }

    size() {
        return this.frameworks.size;
    }
}

export default new SearchIndex();
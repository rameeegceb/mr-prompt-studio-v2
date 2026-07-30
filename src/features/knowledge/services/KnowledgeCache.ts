import { Framework } from "../models/Framework";

class KnowledgeCache {
  private frameworks = new Map<string, Framework>();

  setFrameworks(items: Framework[]) {
    this.frameworks.clear();

    items.forEach((f) => {
      this.frameworks.set(f.id, f);
    });
  }

  getFramework(id: string) {
    return this.frameworks.get(id);
  }

  getFrameworks() {
    return Array.from(this.frameworks.values());
  }

  clear() {
    this.frameworks.clear();
  }

  size() {
    return this.frameworks.size;
  }
}

export default new KnowledgeCache();
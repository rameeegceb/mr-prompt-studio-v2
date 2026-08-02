import KnowledgeLoader from "../services/KnowledgeLoader";
import KnowledgeCache from "../services/KnowledgeCache";
import KnowledgeIndexer from "../indexing/KnowledgeIndexer";

import { Framework } from "../models/Framework";

class KnowledgeRepository {
  private initialized = false;

  initialize(): void {
    if (this.initialized) {
      return;
    }

    const frameworks = KnowledgeLoader.loadFrameworks();

    KnowledgeCache.setFrameworks(frameworks);

    KnowledgeIndexer.build();

    this.initialized = true;
  }

  getFrameworks(): Framework[] {
    return KnowledgeCache.getFrameworks();
  }

  getFramework(id: string): Framework | undefined {
    return KnowledgeCache.getFramework(id);
  }

  hasFramework(id: string): boolean {
    return this.getFramework(id) !== undefined;
  }

  count(): number {
    return KnowledgeCache.size();
  }

  reload(): void {
    KnowledgeCache.clear();

    this.initialized = false;

    this.initialize();
  }
}

export default new KnowledgeRepository();
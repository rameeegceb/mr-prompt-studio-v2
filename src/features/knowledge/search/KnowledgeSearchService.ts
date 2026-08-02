import SearchEngine from "./SearchEngine";

class KnowledgeSearchService {

  search(prompt: string) {
    return SearchEngine.search(prompt);
  }

  bestMatch(prompt: string) {

    const results = this.search(prompt);

    return results.length
      ? results[0]
      : null;

  }

}

export default new KnowledgeSearchService();
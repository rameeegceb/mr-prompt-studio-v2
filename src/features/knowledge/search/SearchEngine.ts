import SearchIndex from "../indexing/SearchIndex";
import { Framework } from "../models/Framework";
import { SearchResult } from "../models/SearchResult";
import ConfidenceCalculator from "../ranking/ConfidenceCalculator";

class SearchEngine {
  search(query: string): SearchResult<Framework>[] {
    if (!query.trim()) return [];

    const terms = query
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean);

    const results: SearchResult<Framework>[] = [];

    SearchIndex.getAll().forEach((framework) => {
      const score = this.calculateScore(framework, terms);

      if (score > 0) {
        results.push({
          item: framework,
          score,
          confidence: ConfidenceCalculator.calculate(score)
        });
      }
    });

    return results.sort((a, b) => b.score - a.score);
  }

  private calculateScore(
    framework: Framework,
    terms: string[]
  ): number {
    let score = 0;

    terms.forEach((term) => {
      if (framework.title.toLowerCase().includes(term))
        score += 40;

      if (framework.description.toLowerCase().includes(term))
        score += 25;

      if (framework.content.toLowerCase().includes(term))
        score += 10;

      if (framework.keywords.includes(term))
        score += 15;

      if (framework.tags.includes(term))
        score += 20;

      if (framework.roles.includes(term))
        score += 25;

      if (framework.domains.includes(term))
        score += 15;

      if (framework.lifecycle.includes(term))
        score += 10;
    });

    return score;
  }
}

export default new SearchEngine();
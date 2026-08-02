import { SearchResult } from "../models/SearchResult";
import { Framework } from "../models/Framework";

class FrameworkRanker {

  rank(
    results: SearchResult<Framework>[]
  ) {

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

  }

}

export default new FrameworkRanker();
export interface SearchResult<T> {
  item: T;

  score: number;

  confidence: number;
}
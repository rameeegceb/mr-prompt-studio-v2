const FAVORITES_KEY = "mrpromptstudio.library.favorites";
const RECENT_KEY = "mrpromptstudio.library.recent";

class TemplateRepository {
  // -----------------------------
  // Favorites
  // -----------------------------

  getFavorites() {
    return JSON.parse(
      localStorage.getItem(FAVORITES_KEY) ?? "[]"
    );
  }

  saveFavorites(ids) {
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(ids)
    );
  }

  addFavorite(id) {
    const favorites = this.getFavorites();

    if (!favorites.includes(id)) {
      favorites.push(id);
      this.saveFavorites(favorites);
    }
  }

  removeFavorite(id) {
    const favorites = this.getFavorites().filter(
      (item) => item !== id
    );

    this.saveFavorites(favorites);
  }

  isFavorite(id) {
    return this.getFavorites().includes(id);
  }

  // -----------------------------
  // Recently Used
  // -----------------------------

  getRecent() {
    return JSON.parse(
      localStorage.getItem(RECENT_KEY) ?? "[]"
    );
  }

  saveRecent(ids) {
    localStorage.setItem(
      RECENT_KEY,
      JSON.stringify(ids)
    );
  }

  addRecent(id) {
    const recent = this.getRecent().filter(
      (item) => item !== id
    );

    recent.unshift(id);

    this.saveRecent(recent.slice(0, 20));
  }

  isRecent(id) {
    return this.getRecent().includes(id);
  }

  clearRecent() {
    localStorage.removeItem(RECENT_KEY);
  }

  clearFavorites() {
    localStorage.removeItem(FAVORITES_KEY);
  }

  clearAll() {
    this.clearFavorites();
    this.clearRecent();
  }
}

export default new TemplateRepository();